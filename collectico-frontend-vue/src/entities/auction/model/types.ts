// FSD entities/auction model: bid types. There is no separate auction entity on the backend, an
// auction is a Product with auction.isAuction = true (see entities/product). This slice owns the Bid
// shape and bid-read queries. The amount is stored as a string on the backend.

export interface BidUser {
  firstName?: string
  lastName?: string
  [key: string]: unknown
}

export interface Bid {
  _id: string
  product: string
  // Populated with the bidder's first/last name by the backend read service.
  user?: BidUser
  amount: string
  createdAt?: string
  [key: string]: unknown
}
