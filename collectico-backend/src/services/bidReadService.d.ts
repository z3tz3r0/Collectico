export function listBidsByProduct(productId: string): Promise<{
  status: number;
  body: unknown[];
}>;
