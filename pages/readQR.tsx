import Head from "next/head";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import {
  LeftBubleComponent,
  RightBubleComponent,
} from "../components/shared/Bubles";
import GoHomeBtn from "../components/shared/BackToNavBtn";
const QrDecoder = dynamic(() => import("../components/QrDecoder"), {
  ssr: false,
});

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

const QRReaderLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  min-height: calc(100vh - 202px);
  @media (max-width: 700px) {
    min-height: calc(100vh - 182px);
  }
`;

const HintBox = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(103, 149, 218, 0.25);
  border-radius: 10px;
  max-width: 750px;
  max-height: 390px;
  margin: 50px 0px 30px 0px;
  padding: 20px 30px;
  font-weight: 400;
  font-size: 18px;
  line-height: 140%;
  color: #4c6b99;
  p {
    color: #276ee7;
    font-weight: 600;
  }
`;

const ReadQR: NextPage = () => {
  const [loadingState, setLoadingState] = React.useState("not-loaded");

  useEffect(() => {
    (async () => {
      await initGetUserMedia();
      setLoadingState("loaded");
    })();
  }, []);

  async function initGetUserMedia() {
    if (!navigator.mediaDevices) {
      toast.error("Your system does not support mediaDevices", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }
    const constraints = {
      video: true,
    };

    // Attach the video stream to the video element and autoplay.
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        console.dir(stream);
      })
      .catch(function (err) {
        /* handle the error */
        toast.error("Your system does not support mediaDevices", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
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
        {loadingState === "loaded" && (
          <>
            <QRReaderLayout>
              <LeftBubleComponent isLoddegIn={false} />
              <QrDecoder />
              <HintBox>
                By scanning the QR code, you validate that you've met with the
                person holding it. This fact (Proof of Presence) will be stored
                on a public distributed ledger forever!
                <br />
                <br />
                Some rules to obtain a valid transaction:
                <p>- don't scan the same QR code twice</p>
                <p>- please wait one minute between scans</p>
              </HintBox>
              <RightBubleComponent />
            </QRReaderLayout>
          </>
        )}
      </BackgroundBox>
    </>
  );
};
export default ReadQR;
