import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { Bid } from '../models/Bid.js';
import { Product } from '../models/Product.js';
import { getCorsOrigins } from './cors.js';

let io;

// Parse the auth token from the raw Cookie header sent on the socket handshake.
function getTokenFromHandshake(socket) {
  const cookieHeader = socket.handshake.headers.cookie || '';
  for (const part of cookieHeader.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === 'token') return decodeURIComponent(rest.join('='));
  }
  return null;
}

// Generic client-facing error: never forward raw err.message (leaks model/schema internals).
function emitBidError(socket, message) {
  socket.emit('bidError', { message });
}

// The minimum a new bid must exceed: the highest existing bid, or the starting (min) bid.
async function resolveBidFloor(product) {
  const bids = await Bid.find({ product: product._id });
  const highest = bids.reduce((max, bid) => {
    const n = Number(bid.amount);
    return Number.isFinite(n) && n > max ? n : max;
  }, 0);
  const min = Number(product.minBidPrice) || 0;
  return Math.max(highest, min);
}

async function handlePlaceBid(socket, { productId, amount } = {}) {
  // userId is taken from the authenticated handshake, NEVER the client payload (anti-impersonation).
  const userId = socket.data.userId;
  if (!userId) {
    emitBidError(socket, 'You must be signed in to bid');
    return;
  }

  const numericAmount = Number(amount);
  if (!productId || !Number.isFinite(numericAmount) || numericAmount <= 0) {
    emitBidError(socket, 'Invalid bid');
    return;
  }

  try {
    const product = await Product.findById(productId);
    if (!product || !product.auction?.isAuction) {
      emitBidError(socket, 'Auction not found');
      return;
    }
    if (product.status !== 'onGoing') {
      emitBidError(socket, 'This auction is not active');
      return;
    }
    const endDate = product.auction?.endDate;
    if (endDate && new Date(endDate).getTime() <= Date.now()) {
      emitBidError(socket, 'This auction has ended');
      return;
    }
    if (product.userId?.toString() === userId) {
      emitBidError(socket, 'You cannot bid on your own auction');
      return;
    }
    const floor = await resolveBidFloor(product);
    if (numericAmount <= floor) {
      emitBidError(socket, 'Your bid must be higher than the current bid');
      return;
    }

    const newBid = await Bid.create({ product: productId, user: userId, amount: String(numericAmount) });
    await Product.findByIdAndUpdate(productId, { currentBid: newBid._id });

    // Room-scoped + slim payload: only clients viewing this auction are notified, and no bidder PII
    // crosses the wire. They refetch the authoritative bid history (GET /api/bids/:id).
    io.to(String(productId)).emit('newBid', { productId: String(productId) });
  } catch (err) {
    console.error('Bid creation error:', err);
    emitBidError(socket, 'Bid creation failed');
  }
}

function initializeSocket(server) {
  io = new Server(server, {
    // credentials:true so the cookie-auth handshake works with an explicit origin allowlist.
    cors: { origin: getCorsOrigins(), credentials: true },
  });

  // Authenticate the handshake cookie if present and attach userId. Connections without a valid
  // token are still allowed (anonymous viewers get live updates) but cannot place bids.
  io.use((socket, next) => {
    try {
      const token = getTokenFromHandshake(socket);
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.data.userId = decoded.userId;
      }
    } catch {
      // Invalid/expired token: treat as anonymous, do not reject the connection.
    }
    next();
  });

  io.on('connection', (socket) => {
    socket.on('joinAuction', (productId) => {
      if (productId) socket.join(String(productId));
    });
    socket.on('leaveAuction', (productId) => {
      if (productId) socket.leave(String(productId));
    });
    socket.on('placeBid', (data) => handlePlaceBid(socket, data));
    socket.on('disconnect', () => {});
  });

  return io;
}

export { initializeSocket, io };
