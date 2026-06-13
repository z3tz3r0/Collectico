// FSD entities/product public API. Cross-slice imports must go through this barrel.
export {
  productListQuery,
  auctionListQuery,
  productsByGenreQuery,
  shopProductsQuery,
  productDetailQuery,
} from './api/products'
export type { Product, ProductTag, ProductAuctionInfo } from './model/types'
export { default as ProductCard } from './ui/ProductCard.vue'
