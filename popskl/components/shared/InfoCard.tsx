import styled from "@emotion/styled";
import Image from "next/image";

import remoteWorkIcon from "../../assets/RemoteWorkIcon.svg";
import oraclesIcon from "../../assets/OracleIcon.svg";
import nftIcon from "../../assets/NFTIcon.svg";
import pointIcon from "../../assets/PointOfSaleIcon.svg";

interface IProps {
  cardText: string;
  cardType: string;
}
enum ECardType {
  REMOTE = "remote",
  ORACLES = "oracles",
  POINT = "point",
  NFT = "nft",
}
const infoCardBackground: { [key: string]: string } = {
  [ECardType.REMOTE]: "rgba(34, 101, 215, 0.8)",
  [ECardType.ORACLES]: "#f98e19",
  [ECardType.POINT]: "rgba(255, 196, 79, 0.94)",
  [ECardType.NFT]: "rgba(236, 75, 36, 0.8)",
};
const iconCardBackground: { [key: string]: string } = {
  [ECardType.REMOTE]: "#e2edff",
  [ECardType.ORACLES]: "#fef3e6",
  [ECardType.POINT]: "#fff7e6",
  [ECardType.NFT]: "#fdece8",
};
const iconSrc: { [key: string]: string } = {
  [ECardType.REMOTE]: remoteWorkIcon,
  [ECardType.ORACLES]: oraclesIcon,
  [ECardType.POINT]: pointIcon,
  [ECardType.NFT]: nftIcon,
};
const iconTitle: { [key: string]: string } = {
  [ECardType.REMOTE]: "Remote work",
  [ECardType.ORACLES]: "Oracles",
  [ECardType.POINT]: "Points",
  [ECardType.NFT]: "NFT's",
};

const CardLayout = styled.div<{ cardType: string }>`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 555px;
  max-height: 400px;
  min-height: 244px;
  min-width: 300px;
  padding: 20px 40px;
  margin: 35px;
  overflow-wrap: break-word;
  background: ${({ cardType }) => infoCardBackground[cardType]};
  box-shadow: 0px 4px 10px rgba(103, 149, 218, 0.25);
  border-radius: 20px;
  @media (max-width: 695px) {
    width: calc(100% - 90px);
    margin: 35px 10px;
  }
`;

const Title = styled.div`
  margin-top: 16px;
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  color: #ffffff;
`;
const Description = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  color: #ffffff;
`;
const Icon = styled.div<{ iconType: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
  width: 90px;
  background: ${({ iconType }) => iconCardBackground[iconType]};
  border-radius: 100px;
`;
const IconBox = styled.div`
  margin-top: -65px;
  margin-bottom: 20px;
`;
const ImageWrapper = styled.div`
  opacity: 1;
`;

const InfoCard: React.FC<IProps> = ({ cardText, cardType }) => {
  return (
    <CardLayout id={cardType} cardType={cardType}>
      <IconBox>
        <Icon iconType={cardType}>
          <ImageWrapper>
            <Image
              width={50}
              height={50}
              src={iconSrc[cardType]}
              alt="Popskl icon"
            />
          </ImageWrapper>
        </Icon>
        <Title>{iconTitle[cardType]}</Title>
      </IconBox>
      <Description>{cardText}</Description>
    </CardLayout>
  );
};
export default InfoCard;
