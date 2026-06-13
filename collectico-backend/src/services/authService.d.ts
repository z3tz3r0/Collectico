export function getAuthCookieOptions(): {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "none";
  path: string;
  maxAge: number;
};

export function sanitizeAuthenticatedUser(user: unknown): Record<string, unknown>;

export function extractBearerToken(
  authorizationHeader: string | undefined,
): string | null;

export function signAuthToken(
  userId: string,
  jwtSecret?: string,
): string;

export function verifyAuthToken(
  token: string,
  jwtSecret?: string,
): string | { userId?: string };

export function registerUserAccount(payload?: Record<string, unknown>): Promise<{
  status: number;
  body: Record<string, unknown>;
}>;

export function loginUserAccount(payload?: Record<string, unknown>): Promise<{
  status: number;
  body: {
    error: boolean;
    message: string;
    _id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    authUserId?: string;
  };
}>;

export function requestPasswordReset(payload?: Record<string, unknown>): Promise<{
  status: number;
  body: Record<string, unknown>;
}>;

export function resetUserPassword(payload?: Record<string, unknown>): Promise<{
  status: number;
  body: Record<string, unknown>;
}>;

export function findAuthenticatedUserById(userId: string): Promise<{
  status: number;
  body: {
    error: boolean;
    user?: Record<string, unknown>;
    message?: string;
  };
}>;
