// contexts/CartContext.js
import { createContext, useContext, useEffect, useState } from "react";
import api from "../../service/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  //Get cart items from Cart Database
  const fetchCartItem = async () => {
    try {
      const res = await api.get(`/api/cart-get`);
      setCartItems(res.data?.cart?.items || []);
    } catch (error) {
      console.error("Error Fetching Product From Cart: ", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, []);

  // const toggleCartItem = (product) => {
  //   setCartItems((currentCarts) => {
  //     const exists = currentCarts.find((item) => item.title === product.title);
  //     if (exists) {
  //       return currentCarts.filter((item) => item.title !== product.title);
  //     } else {
  //       return [...currentCarts, product];
  //     }
  //   });
  // };

  // const isInCart = (productTitle) => {
  //   return cartItems.find((item) => item.title === productTitle);
  // };

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
