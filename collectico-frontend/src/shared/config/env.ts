const envBaseUrl = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL
  : import.meta.env.VITE_PUBLIC_API_URL;

export const API_BASE_URL = envBaseUrl || "";
