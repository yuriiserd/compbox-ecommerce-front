import { createContext, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {

  const [cartProducts, setCartProducts] = useState([]);

  function addToCart(id) {
    setCartProducts(prev => [...prev, id])
  }

  return (
    <CartContext.Provider value={{cartProducts, addToCart}}>
      {children}
    </CartContext.Provider>
  )
}