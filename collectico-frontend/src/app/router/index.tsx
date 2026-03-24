import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router/router";

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
