import { Elysia } from "elysia";

import type { DatabaseConnection } from "../config/database";
import { listAuctionProducts, listFixedPriceProducts, listProductsByGenre, getPublicProductById } from "../../services/productReadService.js";
import { getDatabaseReadResponse } from "./databaseAvailability";

type ProductsRouteOptions = {
  database: DatabaseConnection;
};

function createServerErrorBody(message: string, error: unknown) {
  const detail = error instanceof Error ? error.message : String(error);

  return {
    error: true,
    message,
    detail,
  };
}

export function createProductsRoutes(options: ProductsRouteOptions) {
  return new Elysia({ name: "products-routes", prefix: "/api/products" })
    .get("/", async ({ status }) => {
      const databaseResponse = getDatabaseReadResponse(
        options.database,
        "product reads",
      );

      if (databaseResponse) {
        return status(databaseResponse.status, databaseResponse.body);
      }

      try {
        const result = await listFixedPriceProducts();

        return status(result.status, result.body);
      } catch (error) {
        return status(
          500,
          createServerErrorBody("Fail to fetch fixed price product", error),
        );
      }
    })
    .get("/auction", async ({ status }) => {
      const databaseResponse = getDatabaseReadResponse(
        options.database,
        "auction reads",
      );

      if (databaseResponse) {
        return status(databaseResponse.status, databaseResponse.body);
      }

      try {
        const result = await listAuctionProducts();

        return status(result.status, result.body);
      } catch (error) {
        return status(
          500,
          createServerErrorBody("Fail to fetch auction product", error),
        );
      }
    })
    .get("/genre", async ({ query, status }) => {
      const databaseResponse = getDatabaseReadResponse(
        options.database,
        "product reads",
      );

      if (databaseResponse) {
        return status(databaseResponse.status, databaseResponse.body);
      }

      try {
        const genre =
          typeof query.genre === "string" ? query.genre : undefined;
        const result = await listProductsByGenre(genre);

        return status(result.status, result.body);
      } catch (error) {
        return status(
          500,
          createServerErrorBody("Failed to fetch products", error),
        );
      }
    })
    .get("/:id", async ({ params, status }) => {
      const databaseResponse = getDatabaseReadResponse(
        options.database,
        "product reads",
      );

      if (databaseResponse) {
        return status(databaseResponse.status, databaseResponse.body);
      }

      try {
        const result = await getPublicProductById(params.id);

        return status(result.status, result.body);
      } catch (error) {
        return status(
          500,
          createServerErrorBody("Failed to fetch product", error),
        );
      }
    });
}
