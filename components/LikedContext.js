import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const LikedContext = createContext({});

export function LikedContextProvider({children}) {

  const lStorage = typeof window !== 'undefined' ? window.localStorage : null;
  const [likedProducts, setLikedProducts] = useState([]);
  const {data: session} = useSession();

  useEffect(() => {
    if (lStorage && lStorage.getItem('liked')) {
      setLikedProducts(JSON.parse(lStorage?.getItem('liked')))
    }
  }, []);

  useEffect(() => {
    if (likedProducts?.length > 0) {
      lStorage?.setItem('liked', JSON.stringify(likedProducts));
    }
    if (session?.user) {
      axios.post('/api/account', {
        email: session?.user?.email,
        likedProducts
      })
    }
  }, [likedProducts]);

  function updateLikedProducts(ids) {
    setLikedProducts(prev => {
      const set = new Set([...prev, ...ids]);
      return [...set];
    })
  }

  function addToLiked(id) {
    if (likedProducts.find((itemId) => itemId === id)) {
      setLikedProducts(prev => prev.filter(itemId => itemId !== id ));
      if (likedProducts.length === 1) {
        setLikedProducts([])
        lStorage?.removeItem('liked');
      }
    } else {
      setLikedProducts(prev => [...prev, id]);
    }
  }

  return (
    <LikedContext.Provider value={{likedProducts, addToLiked, updateLikedProducts}}>
      {children}
    </LikedContext.Provider>
  )
}