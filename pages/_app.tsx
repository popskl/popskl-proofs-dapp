import styled from "@emotion/styled";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { css, Global } from "@emotion/react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import UserMenu from "../components/UserMenu";
import smoothscrollAnchorPolyfill from "smoothscroll-anchor-polyfill";
import { WalletConnection } from "near-api-js";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;
const Main = styled.main`
  margin-top: 100px;
  min-height: calc(100vh - 202px);
  @media (max-width: 700px) {
    margin-top: 80px;
    min-height: calc(100vh - 182px);
  }
`;

declare global {
  interface Window {
    walletConnection: WalletConnection;
    currentUser: any;
    contract: any;
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

  useEffect(() => {
    smoothscrollAnchorPolyfill.polyfill();
  }, []);

  return (
    <Layout>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            font-family: "Inter", sans-serif;
            --scroll-behavior: smooth;
            scroll-behavior: smooth;
          }
          html {
            @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100&display=swap");
            --scroll-behavior: smooth;
            scroll-behavior: smooth;
          }
          body {
            margin: 0;
            padding: 0;
            line-height: normal;
          }
          button,
          input,
          a {
            cursor: pointer;
          }
        `}
      />

      <Header handleOpenMenu={setIsOpenUserMenu} />
      {isOpenUserMenu ? (
        <Main>
          <UserMenu />
        </Main>
      ) : (
        <Main>
          <Component {...pageProps} />
        </Main>
      )}
      <ToastContainer />
    </Layout>
  );
};
export default MyApp;
