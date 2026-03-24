import { User } from "../models/User.js";
import {
  getAuthCookieOptions,
  loginUserAccount,
  registerUserAccount,
  resetUserPassword as resetUserPasswordAccount,
  signAuthToken,
} from "../services/authService.js";

//-----Get User By UserId-----//

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Can't find userId",
      });
    }

    res.status(200).json({
      error: false,
      user,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Fail to fetch",
      detail: err.message,
    });
  }
};

//-----Get User------//
export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json({ error: false, user });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Fail to fetch",
      detail: err.message,
    });
  }
};

//-----Register-----//

export const registerUser = async (req, res) => {
  try {
    const result = await registerUserAccount(req.body);

    res.status(result.status).json(result.body);
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message || "Server error",
      detail: err.message,
    });
  }
};

//-----Login-----//

export const loginUser = async (req, res) => {
  try {
    const result = await loginUserAccount(req.body);

    if (result.status !== 200) {
      return res.status(result.status).json(result.body);
    }

    const cookieOptions = getAuthCookieOptions();
    const token = signAuthToken(result.body.authUserId);

    res.cookie("token", token, {
      ...cookieOptions,
      maxAge: cookieOptions.maxAge * 1000,
    });

    const { authUserId, ...responseBody } = result.body;

    res.json({
      ...responseBody,
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Server error",
      detail: err.message,
    });
  }
};

//-----ResetPassword-----//

export const resetPassword = async (req, res) => {
  try {
    const result = await resetUserPasswordAccount(req.body);

    res.status(result.status).json(result.body);
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Server error",
      detail: err.message,
    });
  }
};

//-----Logout-----//
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", getAuthCookieOptions());
    res.json({
      error: false,
      message: "Logout success",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Server error",
      detail: err.message,
    });
  }
};
//-----Verify token-----//
export const verifyToken = (req, res) => {
  res.json({
    error: false,
    message: "Authenticated",
    user: req.user,
  });
};
