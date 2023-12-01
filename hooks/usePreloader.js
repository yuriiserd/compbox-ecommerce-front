import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function usePreloader() {

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  

  // useEffect(() => {
  //   router.isReady && setLoading(false);
  // }, [])
  useEffect(() => {
    const handleStart = () => {
      setLoading(true)
    };
    const handleComplete = () => {
      setLoading(false)
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    }

  }, [router])

  return loading;
}