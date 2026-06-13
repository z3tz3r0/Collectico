import { Server } from 'socket.io';
import { Bid } from '../models/Bid.js';
import { Product } from '../models/Product.js';
import { getCorsOrigins } from './cors.js';

let io;

function isValidBid({ productId, userId, amount }) {
  return Boolean(productId && userId && amount);
}

function emitBidError(socket, message, detail = '') {
  socket.emit('bidError', { message, detail });
}

async function handlePlaceBid(socket, { productId, userId, amount }) {
  if (!isValidBid({ productId, userId, amount })) {
    emitBidError(socket, 'Missing productId, userId, or amount');
    return;
  }

  try {
    const newBid = await Bid.create({ product: productId, user: userId, amount });

    await Product.findByIdAndUpdate(productId, { currentBid: newBid._id });
    const populatedBid = await Bid.findById(newBid._id).populate('user', 'firstName lastName');
    const { firstName = '', lastName = '' } = populatedBid.user || {};

    io.emit('newBid', {
      productId,
      amount,
      userId,
      createdAt: newBid.createdAt,
      firstName,
      lastName
    });
  } catch (err) {
    console.error('Bid creation error:', err);
    emitBidError(socket, 'Bid creation failed', err.message);
  }
}

function initializeSocket(server) {
  io = new Server(server, {
    // credentials:true so the cookie-auth handshake works with an explicit origin allowlist.
    cors: { origin: getCorsOrigins(), credentials: true },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('placeBid', (data) => handlePlaceBid(socket, data));
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
}

export { initializeSocket, io }; 