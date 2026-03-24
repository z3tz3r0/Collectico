import { createBrowserRouter } from "react-router-dom";
import Layout from "@/Layout";
import {
  adminLayoutRoute,
  storefrontRoutes,
} from "@/app/router/route-definitions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: storefrontRoutes,
  },
  adminLayoutRoute,
]);
