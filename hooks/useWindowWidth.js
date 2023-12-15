import { useState, useEffect } from 'react';

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        if (isMounted) {
          setWindowWidth(window.innerWidth);
        }
      };
      window.addEventListener('resize', handleResize);
      return () => {
        isMounted = false;
        window.removeEventListener('resize', handleResize)
      }
    }
  }, []);

  return windowWidth;
}