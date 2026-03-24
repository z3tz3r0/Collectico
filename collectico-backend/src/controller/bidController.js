import { listBidsByProduct } from "../services/bidReadService.js";

export const getBidsByProduct = async (req, res) => {
  try {
    const result = await listBidsByProduct(req.params.productId);

    res.status(result.status).json(result.body);
  } catch (err) {
    res.status(500).json({ error: "Failed to get bids" });
  }
};
