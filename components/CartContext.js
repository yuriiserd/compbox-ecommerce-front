import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {

  const lStorage = typeof window !== 'undefined' ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (lStorage && lStorage.getItem('cart')) {
      setCartProducts(JSON.parse(lStorage?.getItem('cart')))
    }
  }, [])

  useEffect(() => {
    if (cartProducts?.length > 0) {
      lStorage?.setItem('cart', JSON.stringify(cartProducts));
    } else {
      console.log('remove')
      lStorage?.removeItem('cart');
    }
  }, [cartProducts]);

  

  function addToCart(id) {
    setCartProducts(prev => [...prev, id])
  }
  function removeItemFromCart(id) {
    setCartProducts(prev => {
      const position = prev.indexOf(id);
      if (position !== -1) {
        return prev.filter((value, index) => index !== position);
      }
    })
  }
  function removeProduct(id) {
    setCartProducts(prev => {
      const position = prev.indexOf(id);
      if (position !== -1) {
        return prev.filter(value => value !== id);
      }
    })
  }
  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider value={{cartProducts, addToCart, removeItemFromCart, removeProduct, clearCart}}>
      {children}
    </CartContext.Provider>
  )
}