import { Bid } from "../models/Bid.js";

function createResponse(status, body) {
  return { status, body };
}

export async function listBidsByProduct(productId) {
  const bids = await Bid.find({ product: productId })
    .sort({ createdAt: -1 })
    .populate("user", "firstName lastName");

  return createResponse(200, bids);
}
