import axios from "axios";
import { API_BASE_URL } from "@/shared/config/env";

export { API_BASE_URL };

export const apiPaths = {
  auth: {
    login: "/api/users/login",
    logout: "/api/users/auth/logout",
    register: "/api/users/register",
    resetPassword: "/api/users/resetpassword",
    verifyToken: "/api/users/auth/verify-token",
  },
  bids: {
    detail: (productId: string | number) => `/api/bids/${productId}`,
  },
  cart: {
    add: "/api/cart/cart-add",
    clearAfterOrder: (cartId: string | number) => `/api/cart/cart-delete-update/${cartId}`,
    list: "/api/cart/cart-get",
    remove: (productId: string | number) => `/api/cart/cart-delete/${productId}`,
  },
  orders: {
    create: "/api/orders",
    list: "/api/orders",
  },
  products: {
    auctionList: "/api/products/auction",
    byGenre: (genre: string) => `/api/products/genre?genre=${encodeURIComponent(genre)}`,
    create: "/api/products",
    detail: (productId: string | number) => `/api/products/${productId}`,
    edit: (productId: string | number) => `/api/products/auth/${productId}`,
    list: "/api/products",
    myProducts: "/api/products/auth/my-products",
  },
};

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;
