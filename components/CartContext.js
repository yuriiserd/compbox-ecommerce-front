import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {

  const lStorage = typeof window !== 'undefined' ? window.localStorage : null;

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      lStorage?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (lStorage && lStorage.getItem('cart')) {
      setCartProducts(JSON.parse(lStorage?.getItem('cart')))
    }
  }, [])

  function addToCart(id) {
    setCartProducts(prev => [...prev, id])
  }

  return (
    <CartContext.Provider value={{cartProducts, addToCart}}>
      {children}
    </CartContext.Provider>
  )
}