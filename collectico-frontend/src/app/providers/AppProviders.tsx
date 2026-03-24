import type { PropsWithChildren } from "react";
import { ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import theme from "@/app/providers/theme";
import { queryClient } from "@/shared/lib/react-query/query-client";

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
