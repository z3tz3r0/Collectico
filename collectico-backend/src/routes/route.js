import express from "express";
import user from "../middlewares/user.js";
import product from "../middlewares/product.js";
import order from "../middlewares/order.js";
import cart from "../middlewares/cart.js";
import bid from "../middlewares/bid.js";

const router = express.Router();

router.use("/users", user);
router.use("/products", product);
router.use("/orders", order);
router.use("/cart", cart);
router.use("/bids", bid);

export default router;
