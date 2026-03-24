import { Product } from "../models/Product.js";

const publicFixedPriceQuery = {
  "auction.isAuction": false,
  approve: "approved",
  status: "onGoing",
};

const publicAuctionQuery = {
  "auction.isAuction": true,
  approve: "approved",
  status: "onGoing",
};

function createResponse(status, body) {
  return { status, body };
}

export async function listFixedPriceProducts() {
  const allProduct = await Product.find(publicFixedPriceQuery);

  return createResponse(200, {
    err: false,
    allProduct,
  });
}

export async function listAuctionProducts() {
  const allAuctionProduct = await Product.find(publicAuctionQuery);

  return createResponse(200, {
    err: false,
    allAuctionProduct,
  });
}

export async function getPublicProductById(productId) {
  const product = await Product.findById(productId);

  if (!product) {
    return createResponse(404, {
      err: true,
      message: "Can't find productId",
    });
  }

  return createResponse(200, {
    error: false,
    product,
  });
}

export async function listProductsByGenre(genre) {
  const query = { ...publicFixedPriceQuery };

  if (genre) {
    query["tags.title"] = genre;
  }

  const products = await Product.find(query);

  return createResponse(200, {
    error: false,
    products,
  });
}
