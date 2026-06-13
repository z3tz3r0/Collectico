import { ofetch } from 'ofetch'

// Centralized backend route map, ported verbatim from the legacy React app.
export const apiPaths = {
  auth: {
    login: '/api/users/login',
    logout: '/api/users/auth/logout',
    register: '/api/users/register',
    resetPassword: '/api/users/resetpassword',
    verifyToken: '/api/users/auth/verify-token',
  },
  bids: {
    detail: (productId: string | number) => `/api/bids/${productId}`,
  },
  cart: {
    add: '/api/cart/cart-add',
    clearAfterOrder: (cartId: string | number) => `/api/cart/cart-delete-update/${cartId}`,
    list: '/api/cart/cart-get',
    remove: (productId: string | number) => `/api/cart/cart-delete/${productId}`,
  },
  orders: {
    create: '/api/orders',
    list: '/api/orders',
  },
  products: {
    auctionList: '/api/products/auction',
    byGenre: (genre: string) => `/api/products/genre?genre=${encodeURIComponent(genre)}`,
    create: '/api/products',
    detail: (productId: string | number) => `/api/products/${productId}`,
    edit: (productId: string | number) => `/api/products/auth/${productId}`,
    list: '/api/products',
    myProducts: '/api/products/auth/my-products',
  },
} as const

// FSD shared/api HTTP client. Replaces the legacy axios instance (axios.create + withCredentials).
// ofetch deltas vs axios: response is the parsed body directly (no res.data), errors are FetchError
// (err.data / err.response.status), credentials must be set explicitly for cookie auth.
// SSR-safe: forwards the incoming request cookies on the server, sends credentials on the client.
export function useApi() {
  const apiBase = useRuntimeConfig().public.apiBase as string
  const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined
  // 401s are handled contextually, not globally here: the `auth` route guard redirects
  // protected routes and feature actions handle their own errors. A blanket redirect would
  // loop on expected 401s (e.g. verifyToken for an anonymous visitor), and clearing the auth
  // store from this shared layer would be an upward FSD dependency.
  return ofetch.create({
    baseURL: apiBase,
    credentials: 'include',
    headers,
  })
}
