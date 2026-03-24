import { Elysia } from "elysia";

import type { DatabaseConnection } from "../config/database";
import { listBidsByProduct } from "../../services/bidReadService.js";
import { getDatabaseReadResponse } from "./databaseAvailability";

type BidsRouteOptions = {
  database: DatabaseConnection;
};

function createServerErrorBody(error: unknown) {
  const detail = error instanceof Error ? error.message : String(error);

  return {
    error: "Failed to get bids",
    detail,
  };
}

export function createBidsRoutes(options: BidsRouteOptions) {
  return new Elysia({ name: "bids-routes", prefix: "/api/bids" }).get(
    "/:productId",
    async ({ params, status }) => {
      const databaseResponse = getDatabaseReadResponse(
        options.database,
        "bid reads",
      );

      if (databaseResponse) {
        return status(databaseResponse.status, databaseResponse.body);
      }

      try {
        const result = await listBidsByProduct(params.productId);

        return status(result.status, result.body);
      } catch (error) {
        return status(500, createServerErrorBody(error));
      }
    },
  );
}
