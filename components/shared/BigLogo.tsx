import styled from "@emotion/styled";
import Image from "next/image";
import logoBig from "../../assets/PopsklBig.svg";
import logoNear from "../../assets/NearIcon.svg";

const LogoLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LogoBox = styled.div`
  width: 220px;
  height: 220px;
  position: absolute;
  background: none;
`;
const PopsklLogo = styled(Image)`
  position: absolute;
  left: 50%;
  top: 50%;
`;
const NearLogoBox = styled.div`
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    #ffffff;
  box-shadow: 0px 2px 4px rgba(80, 118, 175, 0.25);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 74px;
  height: 74px;
  border-radius: 50%;
  position: absolute;
  left: 60%;
  top: 35%;
  background-color: #fff;
`;

const BigLogo: React.FC = () => {
  return (
    <LogoLayout>
      <LogoBox>
        <PopsklLogo width={320} height={200} src={logoBig} alt="Popskl logo" />
        <NearLogoBox>
          <Image width={50} height={50} src={logoNear} alt="Popskl logo" />
        </NearLogoBox>
      </LogoBox>
    </LogoLayout>
  );
};
export default BigLogo;
