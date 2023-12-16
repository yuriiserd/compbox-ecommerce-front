import Container from "./Container";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Spinner from "@/components/Spinner";
import usePreloader from "@/hooks/usePreloader";
import PageLoading from "./PageLoading";



export default function Layout({children, noPreloader}) {

  const loading = usePreloader();

  return (
    <>
      <Header />
        <Container>
          {noPreloader ? (
            <>
              {children}
            </>
          ) : (
            <>
              {loading ? <PageLoading/> : children}
            </>
          )}
        </Container>
      <Footer />
    </>
  )
}