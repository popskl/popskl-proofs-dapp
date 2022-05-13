import styled from "@emotion/styled";

const RightBuble = styled.div`
  position: absolute;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 50%;
  overflow: hidden;
  right: 0%;
  top: 20%;
  opacity: 0.5;
  width: 640px;
  height: 640px;
  @media (max-width: 1200px) {
    right: 0%;
    top: 20%;
    width: 500px;
    height: 500px;
  }
  @media (max-width: 700px) {
    right: 0%;
    top: 20%;
    width: 200px;
    height: 200px;
  }
`;
const LeftBuble = styled.div<{ isLoddegIn: boolean }>`
  position: absolute;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 50%;
  overflow: hidden;
  right: 80%;
  top: ${({ isLoddegIn }) => (isLoddegIn ? "20%" : "60%")};
  opacity: 0.5;
  width: 310px;
  height: 310px;
  @media (max-width: 1200px) {
    right: 70%;
    top: 60%;
    width: 250px;
    height: 250px;
  }
  @media (max-width: 700px) {
    right: 60%;
    top: 50%;
    width: 150px;
    height: 150px;
  }
`;

export const RightBubleComponent = () => {
  return <RightBuble />;
};
export const LeftBubleComponent: React.FC<{ isLoddegIn: boolean }> = ({
  isLoddegIn,
}) => {
  return <LeftBuble isLoddegIn={isLoddegIn} />;
};
