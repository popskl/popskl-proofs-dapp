import Link from "next/link";
import styled from "@emotion/styled";
import Image from "next/image";
import logoSmall from "../assets/PopsklSmall.svg";
import logoLabel from "../assets/PopsklLabel.svg";
import menuIcon from "../assets/MenuIcon.svg";
import closeIcon from "../assets/CloseIcon.svg";
import StyledButton from "./shared/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { initContract, login } from "../services/initContract";
import CustomUserDropdown from "./shared/CustomDropDown";

const HeaderNav = styled.header`
  z-index: 100;
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #ffffff;
  height: 100px;
  padding: 20px 5%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  @media (max-width: 700px) {
    height: 80px;
    padding: 10px 20px;
  }
`;

const LogoBlock = styled.div`
  display: flex;
  width: 235px;
  height: 100%;
  justify-content: space-between;
  cursor: pointer;
`;
const RightPan = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
`;
const BurgerBtn = styled.button`
  background: none;
  border: none;
  margin-left: 35px;
  @media (min-width: 700px) {
    display: none;
  }
`;

const Header: React.FC<{
  handleOpenMenu: Dispatch<SetStateAction<boolean>>;
}> = ({ handleOpenMenu }) => {
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);
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
    <HeaderNav>
      <Link href="/" passHref>
        <LogoBlock onClick={() => handleOpenMenu(false)}>
          <Image width={60} height={60} src={logoSmall} alt="Popskl logo" />
          <Image width={150} height={40} src={logoLabel} alt="Popskl logo" />
        </LogoBlock>
      </Link>

      <RightPan>
        {!signedIn ? (
          <StyledButton onClick={login} btnText="Login with wallet" />
        ) : (
          <CustomUserDropdown userName={window.currentUser.accountId} />
        )}
      </RightPan>
      <BurgerBtn onClick={() => setIsOpenedMenu(!isOpenedMenu)}>
        {isOpenedMenu ? (
          <Image
            onClick={() => handleOpenMenu(false)}
            width={25}
            height={25}
            src={closeIcon}
          />
        ) : (
          <Image
            onClick={() => handleOpenMenu(true)}
            width={25}
            height={25}
            src={menuIcon}
          />
        )}
      </BurgerBtn>
    </HeaderNav>
  );
};
export default Header;
