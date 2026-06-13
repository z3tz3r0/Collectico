import type { Bid } from '../model/types'

// The current highest bid amount across a bid list. Amounts are strings on the backend; non-numeric
// entries are ignored. Returns 0 when there are no valid bids.
export function highestBidAmount(bids: Bid[]): number {
  return bids.reduce((max, bid) => {
    const n = Number(bid.amount)
    return Number.isFinite(n) && n > max ? n : max
  }, 0)
}
