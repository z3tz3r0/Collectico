import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { isAxiosError } from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api, { apiPaths } from "../../service/api";

type CartItem = Record<string, unknown>;

type CartContextValue = {
  cartId: string | null;
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  cartCount: number;
  refreshCart: () => Promise<void>;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const refreshCart = useCallback(async () => {
    try {
      const res = await api.get<{
        cart?: {
          _id?: string;
          items?: CartItem[];
        };
      }>(apiPaths.cart.list);

      setCartId(res.data?.cart?._id ?? null);
      setCartItems(res.data?.cart?.items ?? []);
    } catch (error) {
      const status = isAxiosError(error) ? error.response?.status : undefined;

      if (status !== 401 && status !== 404) {
        console.error("Error Fetching Product From Cart: ", error);
      }

      setCartId(null);
      setCartItems([]);
    }
  }, []);

  const clearCart = () => {
    setCartId(null);
    setCartItems([]);
  };

  useEffect(() => {
    queueMicrotask(() => {
      void refreshCart();
    });
  }, [refreshCart]);

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartId,
        cartItems,
        setCartItems,
        cartCount,
        refreshCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
