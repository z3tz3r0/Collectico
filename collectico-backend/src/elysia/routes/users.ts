import { Elysia } from "elysia";

import {
  extractBearerToken,
  findAuthenticatedUserById,
  getAuthCookieOptions,
  loginUserAccount,
  registerUserAccount,
  resetUserPassword,
  signAuthToken,
  verifyAuthToken,
} from "../../services/authService.js";

type UsersRouteOptions = {
  jwtSecret: string | null;
};

function getAuthorizationHeader(
  authorizationHeader: unknown,
): string | undefined {
  return typeof authorizationHeader === "string"
    ? authorizationHeader
    : undefined;
}

function getCookieTokenValue(cookieToken: unknown): string | undefined {
  return typeof cookieToken === "string" ? cookieToken : undefined;
}

function createServerErrorBody(message: string, error: unknown) {
  const detail = error instanceof Error ? error.message : String(error);

  return {
    error: true,
    message,
    detail,
  };
}

function createMissingJwtSecretBody() {
  return {
    error: true,
    message: "Server error",
    detail: "JWT secret is not configured",
  };
}

async function authenticateRequest(
  authorizationHeader: string | undefined,
  cookieToken: string | undefined,
  jwtSecret: string,
) {
  const token = cookieToken || extractBearerToken(authorizationHeader);

  if (!token) {
    return {
      status: 401,
      body: {
        error: true,
        message: "No token found",
      },
    };
  }

  try {
    const payload = verifyAuthToken(token, jwtSecret);
    const userId =
      payload && typeof payload === "object" && "userId" in payload
        ? String(payload.userId)
        : null;

    if (!userId) {
      return {
        status: 401,
        body: {
          error: true,
          code: "Invalid token",
          message: "Invalid token",
        },
      };
    }

    const result = await findAuthenticatedUserById(userId);

    return result.status === 200
      ? { status: 200, user: result.body.user }
      : { status: result.status, body: result.body };
  } catch (error) {
    const isExpired =
      error instanceof Error && error.name === "TokenExpiredError";

    return {
      status: 401,
      body: {
        error: true,
        code: isExpired ? "Token expired" : "Invalid token",
        message: isExpired
          ? "Token has expired , please try again later"
          : "Invalid token",
      },
    };
  }
}

export function createUsersRoutes(options: UsersRouteOptions) {
  return new Elysia({ name: "users-routes", prefix: "/api/users" })
    .post("/register", async ({ body, status }) => {
      try {
        const result = await registerUserAccount(
          (body as Record<string, unknown>) ?? {},
        );

        return status(result.status, result.body);
      } catch (error) {
        return status(
          500,
          createServerErrorBody("Server error", error),
        );
      }
    })
    .post("/login", async ({ body, cookie: { token }, status }) => {
      if (!options.jwtSecret) {
        return status(500, createMissingJwtSecretBody());
      }

      try {
        const result = await loginUserAccount(
          (body as Record<string, unknown>) ?? {},
        );

        if (result.status !== 200) {
          return status(result.status, result.body);
        }

        if (!result.body.authUserId) {
          return status(500, createMissingJwtSecretBody());
        }

        const signedToken = signAuthToken(
          result.body.authUserId,
          options.jwtSecret,
        );

        token.set({
          ...getAuthCookieOptions(),
          value: signedToken,
        });

        const { authUserId, ...responseBody } = result.body;

        return {
          ...responseBody,
          token: signedToken,
        };
      } catch (error) {
        return status(
          500,
          createServerErrorBody("Server error", error),
        );
      }
    })
    .patch("/resetpassword", async ({ body, status }) => {
      try {
        const result = await resetUserPassword(
          (body as Record<string, unknown>) ?? {},
        );

        return status(result.status, result.body);
      } catch (error) {
        return status(
          500,
          createServerErrorBody("Server error", error),
        );
      }
    })
    .get("/auth/verify-token", async ({ cookie: { token }, headers, status }) => {
      if (!options.jwtSecret) {
        return status(500, createMissingJwtSecretBody());
      }

      try {
        const authentication = await authenticateRequest(
          getAuthorizationHeader(headers.authorization),
          getCookieTokenValue(token.value),
          options.jwtSecret,
        );

        if (authentication.status !== 200) {
          return status(authentication.status, authentication.body);
        }

        return {
          error: false,
          message: "Authenticated",
          user: authentication.user,
        };
      } catch (error) {
        return status(
          500,
          createServerErrorBody("Server error", error),
        );
      }
    })
    .post("/auth/logout", async ({ cookie: { token }, headers, status }) => {
      if (!options.jwtSecret) {
        return status(500, createMissingJwtSecretBody());
      }

      const authentication = await authenticateRequest(
        getAuthorizationHeader(headers.authorization),
        getCookieTokenValue(token.value),
        options.jwtSecret,
      );

      if (authentication.status !== 200) {
        return status(authentication.status, authentication.body);
      }

      token.remove();

      return {
        error: false,
        message: "Logout success",
      };
    });
}
