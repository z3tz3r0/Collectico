// FSD entities/auction public API. Cross-slice imports must go through this barrel.
export { bidsByProductQuery } from './api/bids'
export { highestBidAmount, highestBid } from './lib/highest-bid'
export type { Bid, BidUser } from './model/types'
export { default as AuctionCountdown } from './ui/AuctionCountdown.vue'
export { default as CurrentBidDisplay } from './ui/CurrentBidDisplay.vue'
