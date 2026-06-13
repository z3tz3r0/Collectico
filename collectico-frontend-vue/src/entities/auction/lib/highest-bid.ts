import type { Bid } from '../model/types'

// The current highest bid amount across a bid list. Amounts are strings on the backend; non-numeric
// entries are ignored. Returns 0 when there are no valid bids.
export function highestBidAmount(bids: Bid[]): number {
  return bids.reduce((max, bid) => {
    const n = Number(bid.amount)
    return Number.isFinite(n) && n > max ? n : max
  }, 0)
}

// The single highest bid (for the winner display), or undefined when there are no valid bids.
export function highestBid(bids: Bid[]): Bid | undefined {
  return bids.reduce<Bid | undefined>((best, bid) => {
    const n = Number(bid.amount)
    if (!Number.isFinite(n)) return best
    const bestN = best ? Number(best.amount) : Number.NEGATIVE_INFINITY
    return n > bestN ? bid : best
  }, undefined)
}
