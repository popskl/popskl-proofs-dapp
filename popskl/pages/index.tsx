import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { initContract, login } from "../services/initContract";
import { toast } from "react-toastify";
import BigLogo from "../components/shared/BigLogo";
import styled from "@emotion/styled";
import ActionCard from "../components/shared/ActionCard";
import StyledButton from "../components/shared/Button";
import InfoCard from "../components/shared/InfoCard";

import {
  LeftBubleComponent,
  RightBubleComponent,
} from "../components/shared/Bubles";
import { Footer } from "../components/Footer";

const HomeLayout = styled.div<{ signedIn: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ signedIn }) => (!signedIn ? "60px 0px 0px 0px" : "none")};
  min-height: 100%;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    #79abff;
  height: auto;
  min-height: calc(100vh - 202px);
  @media (max-width: 1311px) {
    min-height: calc(100vh - 182px);
  }
  @media (max-width: 700px) {
    min-height: calc(100vh - 182px);
  }
`;
const TopBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const HomeTopBlock = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 20px;
  max-width: 800px;
  min-height: 370px;
  align-items: center;
  margin-top: 30px;
`;
const DescriptionBlock = styled.div`
  color: #002c6d;
  font-size: 24px;
  font-weight: 400, Regular;
  max-width: 550px;
  text-align: center;
`;
const DescriptionInfoBlock = styled.div`
  color: #2265d7;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  max-width: 550px;
  text-align: center;
`;
const CardBlock = styled.div<{ signedIn: boolean }>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  @media (max-width: 709px) {
    padding: ${({ signedIn }) => (!signedIn ? "40px 0" : "0 0 20px 0")};
  }
`;
const InfoBlock = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding: 100px 0px 80px 0px;
  align-items: center;
  width: 100%;
  @media (max-width: 709px) {
    padding: 40px 10px 20px 10px;
  }
`;
const InfoCardsBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  padding: 40px 0px 0px 0px;
  height: auto;
  width: 100%;
  @media (max-width: 1310px) {
    padding: 40px 0px 0px 0px;
  }
`;
const InfoCardsWrapper = styled.div`
  z-index: 2;
  display: flex;
  justify-content: start;
  -webkit-box-align: stretch;
  flex-wrap: wrap;
  height: auto;
  max-width: 1250px;
  word-wrap: break-word;
  padding: 20px 0;
  @media (max-width: 1250px) {
    justify-content: flex-start;
    flex-wrap: nowrap;
    max-width: 1310px;
    overflow-x: scroll;
    -webkit-overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }
`;

const Home: NextPage = () => {
  const router = useRouter();

  const [signedIn, setSignedIn] = React.useState(false);
  const [loadingState, setLoadingState] = React.useState(true);

  useEffect(() => {
    try {
      initContract()
        .then(() => {
          window.walletConnection.isSignedIn()
            ? setSignedIn(true)
            : setSignedIn(false);
        })
        .then(() => {
          initUserLocation();
        })
        .then(() => {
          setLoadingState(false);
        });
    } catch (error) {
      console.log("initContract error: ", error);
    }
  }, []);

  const generateQR = () => {
    router.push("/generateQR");
  };

  const readQR = () => {
    router.push("/readQR");
  };

  const initUserLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("Your system does not support Geolocation", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      locationResolveSuccessfully,
      locationResolveError
    );
  };

  const locationResolveError = (error: any) => {
    let errorType = "";
    if (error.code === 1) {
      errorType = "Permission Denied";
    } else if (error.code === 2) {
      errorType = "Position Unavailable";
    } else if (error.cde === 3) {
      errorType = "Timeout";
    }
    toast.error(errorType + " " + error.message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const locationResolveSuccessfully = async (data: any) => {
    toast.success("Location fetched successfully!", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  return (
    <>
      <Head>
        <title>popskl</title>
        <meta name="description" content="popskl - Near" />
        <link rel="icon" href="/favicon.svg" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/iamdustan-smoothscroll/0.4.0/smoothscroll.min.js"></script>
      </Head>
      {!loadingState && (
        <HomeLayout signedIn={signedIn}>
          <TopBlock>
            <LeftBubleComponent isLoddegIn={signedIn} />
            {!signedIn && (
              <HomeTopBlock>
                <BigLogo />
                <DescriptionBlock>
                  Generate a unique, blockchain verified QR code. Scan and view
                  the transaction on explorer...enjoy being present!
                </DescriptionBlock>
                <StyledButton onClick={login} btnText="Login with wallet" />
              </HomeTopBlock>
            )}
            <CardBlock signedIn={signedIn}>
              <ActionCard
                handleButton={generateQR}
                isGenerateQr={true}
                isLoggedIn={signedIn}
              />
              <ActionCard
                handleButton={readQR}
                isGenerateQr={false}
                isLoggedIn={signedIn}
              />
            </CardBlock>
            <RightBubleComponent />
          </TopBlock>

          <InfoBlock>
            <DescriptionInfoBlock>Use for...</DescriptionInfoBlock>
            <InfoCardsBlock>
              <InfoCardsWrapper id="cardsWrapper">
                <InfoCard
                  cardType="remote"
                  cardText="Universal check-ins provide ability to verify presence for unsupervised work, 
                example: HVAC service on rooftops of hospital buildings can 
                include a presence claim with an invoice."
                />
                <InfoCard
                  cardType="oracles"
                  cardText="Create more trustless environments with IoT. 
                example: Verify who pulled data from an IoT device monitoring a 
                tree's oxygen output for carbon offset credits."
                />
                <InfoCard
                  cardType="point"
                  cardText="Validate and authenticate trusted reviews. 
                Example: A consumer POPs! a restaurant QR and proves their presence in a YELP review."
                />
                <InfoCard
                  cardType="nft"
                  cardText="Use real life events to unlock NFT stores of value. example: POP! 
                a QR code at a sports venue and receive an NFT ticket 
                to an invite-only after party."
                />
              </InfoCardsWrapper>
            </InfoCardsBlock>
          </InfoBlock>
          <Footer signedIn={signedIn} />
        </HomeLayout>
      )}
    </>
  );
};
export default Home;
