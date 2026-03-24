import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";

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

export async function resetUserPassword(payload = {}) {
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

  user.password = password;
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
