// FSD entities/product model: the product domain type, mirrored from the backend Mongoose schema.
// Numeric-looking fields (price, minBidPrice) are stored as strings on the backend, so they stay
// strings here and the UI casts at render time. Dates arrive as ISO strings over JSON.

export interface ProductTag {
  title: string
  [key: string]: unknown
}

export interface ProductAuctionInfo {
  isAuction: boolean
  startDate?: string
  endDate?: string
  days?: number
  hours?: number
}

export interface Product {
  _id: string
  title: string
  description?: string
  image?: string
  artist: string
  sellerName?: string
  yearCreated?: string
  dimensions?: string
  material?: string
  tags?: ProductTag[]
  price?: string
  minBidPrice?: string
  // Backend stores a Bid ref (id) or a populated bid; kept loose for now.
  currentBid?: unknown
  auction?: ProductAuctionInfo
  status?: 'onGoing' | 'completed'
  approve?: 'approved' | 'rejected' | 'pending'
  userId?: string
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown
}
