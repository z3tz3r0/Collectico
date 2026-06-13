import crypto from "node:crypto";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";
import { sendPasswordResetEmail } from "./emailService.js";

const DEFAULT_RESET_TOKEN_TTL_MS = 3600000;

function hashResetToken(rawToken) {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

const authCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: 30 * 24 * 60 * 60,
};

function createResponse(status, body) {
  return { status, body };
}

export function getAuthCookieOptions() {
  return { ...authCookieOptions };
}

export function sanitizeAuthenticatedUser(user) {
  const userObject = user.toObject ? user.toObject() : user;
  const { password, __v, ...safeUser } = userObject;

  return safeUser;
}

export function extractBearerToken(authorizationHeader) {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
}

export function signAuthToken(userId, jwtSecret = process.env.JWT_SECRET) {
  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: "30d",
  });
}

export function verifyAuthToken(token, jwtSecret = process.env.JWT_SECRET) {
  return jwt.verify(token, jwtSecret);
}

export async function registerUserAccount(payload = {}) {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    isArtist,
    artistName,
    artistDescription,
  } = payload;

  if (!firstName || !lastName || !email || !password) {
    return createResponse(400, {
      error: true,
      message: "All fields are required",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return createResponse(409, {
      error: true,
      message: "Email already in use",
    });
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    phone,
    isArtist: isArtist || false,
    artistName: isArtist ? artistName : undefined,
    artistDescription: isArtist ? artistDescription : undefined,
  });

  await user.save();

  return createResponse(201, {
    error: false,
    user: sanitizeAuthenticatedUser(user),
    message: "User registered successfully",
  });
}

export async function loginUserAccount(payload = {}) {
  const { email, password } = payload;

  if (!email || !password) {
    return createResponse(400, {
      error: true,
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return createResponse(401, {
      error: true,
      message: "Invalid credentials",
    });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return createResponse(401, {
      error: true,
      message: "Invalid credentials",
    });
  }

  return createResponse(200, {
    error: false,
    message: "Login successful!",
    _id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    authUserId: user._id.toString(),
  });
}

export async function requestPasswordReset(payload = {}) {
  const { email } = payload;

  // Anti-enumeration: always return the same 200 response regardless of
  // whether the email is registered, so callers cannot probe for accounts.
  const genericResponse = createResponse(200, {
    error: false,
    message: "If that email is registered, a reset link has been sent.",
  });

  if (!email) {
    return genericResponse;
  }

  const user = await User.findOne({ email });

  if (!user) {
    return genericResponse;
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const ttlMs =
    Number(process.env.RESET_TOKEN_TTL_MS) || DEFAULT_RESET_TOKEN_TTL_MS;

  user.resetTokenHash = hashResetToken(rawToken);
  user.resetTokenExpires = new Date(Date.now() + ttlMs);
  await user.save();

  const appUrl = process.env.APP_URL || "http://localhost:3000";
  const link = `${appUrl}/resetpassword?token=${rawToken}&email=${encodeURIComponent(
    email,
  )}`;

  await sendPasswordResetEmail(email, link);

  return genericResponse;
}

export async function resetUserPassword(payload = {}) {
  const { email, password, token } = payload;

  if (!email || !password || !token) {
    return createResponse(400, {
      error: true,
      message: "Email, password, and token are required",
    });
  }

  const user = await User.findOne({ email }).select(
    "+resetTokenHash +resetTokenExpires +password",
  );

  // Constant failure message for every token check: do not reveal which
  // condition failed (missing user, missing token, mismatch, or expiry).
  const invalidTokenResponse = createResponse(400, {
    error: true,
    message: "Invalid or expired reset token",
  });

  if (!user || !user.resetTokenHash || !user.resetTokenExpires) {
    return invalidTokenResponse;
  }

  const providedHash = hashResetToken(token);

  if (providedHash !== user.resetTokenHash) {
    return invalidTokenResponse;
  }

  if (user.resetTokenExpires.getTime() <= Date.now()) {
    return invalidTokenResponse;
  }

  user.password = password;
  // Single-use: clear the token so the same link cannot be replayed.
  user.resetTokenHash = undefined;
  user.resetTokenExpires = undefined;
  await user.save();

  return createResponse(200, {
    error: false,
    message: "Password is changed already",
  });
}

export async function findAuthenticatedUserById(userId) {
  const user = await User.findById(userId);

  if (!user) {
    return createResponse(404, {
      error: true,
      message: "User not found",
    });
  }

  return createResponse(200, {
    error: false,
    user: sanitizeAuthenticatedUser(user),
  });
}
