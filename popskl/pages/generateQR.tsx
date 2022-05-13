import Head from "next/head";
import React, { useEffect } from "react";
import { NextPage } from "next";
import { useQRCode } from "next-qrcode";
import styled from "@emotion/styled";
import {
  LeftBubleComponent,
  RightBubleComponent,
} from "../components/shared/Bubles";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import GoHomeBtn from "../components/shared/BackToNavBtn";

const BackgroundBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    #79abff;
  min-height: calc(100vh - 100px);
  @media (max-width: 700px) {
    min-height: calc(100vh - 80px);
  }
`;
const QrGenerateLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  min-height: calc(100vh - 202px);
  @media (max-width: 700px) {
    min-height: calc(100vh - 182px);
  }
`;
const QRCodeBox = styled.div`
  z-index: 2;
`;
const HintBox = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(103, 149, 218, 0.25);
  border-radius: 10px;
  max-width: 750px;
  margin: 30px 20px;
  padding: 20px 30px;
  font-weight: 400;
  font-size: 18px;
  line-height: 140%;
  color: #4c6b99;
`;

const GenerateQR: NextPage = () => {
  const [loadingState, setLoadingState] = React.useState("not-loaded");
  const [qrCode, setQrCode] = React.useState("");
  const { Image } = useQRCode();

  useEffect(() => {
    try {
      (async () => {
        await getCodeFromContract();
        setLoadingState("loaded");
      })();
    } catch (e: any) {
      toast.error(e.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }, []);

  async function getCodeFromContract() {
    try {
      const qrCode = await window.contract.get_code();
      if (qrCode) {
        setQrCode(qrCode);
      }
    } catch (e: any) {
      toast.error(e.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  return (
    <>
      <Head>
        <title>popskl</title>
        <meta name="description" content="popskl - Near" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <BackgroundBox>
        <GoHomeBtn />

        <QrGenerateLayout>
          <LeftBubleComponent isLoddegIn={false} />
          <QRCodeBox>
            {loadingState === "loaded" && qrCode != "" && (
              <Image
                text={qrCode}
                options={{
                  type: "image/jpeg",
                  quality: 0.3,
                  level: "M",
                  scale: 4,
                  width: 370,
                  color: {
                    dark: "#000000",
                    light: "#ffffff",
                  },
                }}
              />
            )}
          </QRCodeBox>
          {loadingState === "not-loaded" && <Spinner />}
          <HintBox>This is a one-time code that expires in 60 seconds.</HintBox>
          <RightBubleComponent />
        </QrGenerateLayout>
      </BackgroundBox>
    </>
  );
};

export default GenerateQR;
