import { createContext, useEffect, useState } from "react";

export const LikedContext = createContext({});

export function LikedContextProvider({children}) {

  const lStorage = typeof window !== 'undefined' ? window.localStorage : null;

  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    if (lStorage && lStorage.getItem('liked')) {
      setLikedProducts(JSON.parse(lStorage?.getItem('liked')))
    }
  }, []);

  useEffect(() => {
    if (likedProducts?.length > 0) {
      lStorage?.setItem('liked', JSON.stringify(likedProducts));
    }
  }, [likedProducts]);

  

  function addToLiked(id) {
    if (likedProducts.find((itemId) => itemId === id)) {
      setLikedProducts(prev => prev.filter(itemId => itemId !== id ));
    } else {
      setLikedProducts(prev => [...prev, id]);
    }
  }

  return (
    <LikedContext.Provider value={{likedProducts, addToLiked}}>
      {children}
    </LikedContext.Provider>
  )
}