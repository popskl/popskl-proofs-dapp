import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import StyledButton from "./shared/Button";
import { initContract, login, logout } from "../services/initContract";
import { useRouter } from "next/router";
import { LeftBubleComponent, RightBubleComponent } from "./shared/Bubles";

const UserMenuPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  width: 100%;
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
const BtnBox = styled.div`
  z-index: 2;
`;
const UserNameLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin-bottom: 20px;
  width: 100%;
  background: white;
  border-radius: 100px;
  height: 60px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  padding: 10px 10px;
  color: #276ee7;
`;

const UserMenu = () => {
  const router = useRouter();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    try {
      initContract().then(() => {
        window.walletConnection.isSignedIn()
          ? setSignedIn(true)
          : setSignedIn(false);
      });
    } catch (error) {
      console.log("initContract error: ", error);
    }
  }, []);
  return (
    <>
      <UserMenuPageLayout>
        <LeftBubleComponent isLoddegIn={false} />
        <BtnBox>
          {signedIn && (
            <UserNameLabel>{window.currentUser.accountId}</UserNameLabel>
          )}
          {signedIn ? (
            <StyledButton
              btnText="Sign out"
              onClick={async () => {
                await router.push("/");
                await logout();
              }}
            />
          ) : (
            <StyledButton btnText="Login with wallet" onClick={login} />
          )}
        </BtnBox>

        <RightBubleComponent />
      </UserMenuPageLayout>
    </>
  );
};
export default UserMenu;
