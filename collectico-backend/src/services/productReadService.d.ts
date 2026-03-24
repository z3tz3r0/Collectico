export function listFixedPriceProducts(): Promise<{
  status: number;
  body: {
    err: boolean;
    allProduct: unknown[];
  };
}>;

export function listAuctionProducts(): Promise<{
  status: number;
  body: {
    err: boolean;
    allAuctionProduct: unknown[];
  };
}>;

export function getPublicProductById(productId: string): Promise<{
  status: number;
  body: {
    err?: boolean;
    error?: boolean;
    message?: string;
    product?: Record<string, unknown>;
  };
}>;

export function listProductsByGenre(genre?: string): Promise<{
  status: number;
  body: {
    error: boolean;
    products: unknown[];
  };
}>;
