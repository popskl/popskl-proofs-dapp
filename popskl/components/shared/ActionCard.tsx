import styled from "@emotion/styled";
import StyledButton from "./Button";

interface IProps {
  isGenerateQr: boolean;
  isLoggedIn: boolean;
  handleButton: () => void;
}

const CardLayout = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  margin: 10px;
  width: calc(25% - 20px);
  max-width: 550px;
  min-width: 335px;
  max-height: 230px;
  min-height: 250px;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 6px;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    #ffffff;
  box-shadow: 0px 4px 10px rgba(103, 149, 218, 0.25);
  border-radius: 20px;
  button {
    max-width: 80%;
  }
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100px;
`;
const Title = styled.div`
  color: #2265d7;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  text-align: center;
`;
const Description = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 140%;
  text-align: center;
  color: #002c6d;
  opacity: 0.6;
  margin-top: 24px;
`;

const ActionCard: React.FC<IProps> = ({
  isGenerateQr,
  isLoggedIn,
  handleButton,
}) => {
  return (
    <CardLayout>
      <TextBox>
        <Title>{isGenerateQr ? "Create QR" : "POP! QR"}</Title>
        <Description>
          {isGenerateQr
            ? "Generate a QR where the time, date and location hashed on chain"
            : "Scan the QR and prove to the whole world that you've met!"}
        </Description>
      </TextBox>
      {isLoggedIn && <StyledButton onClick={handleButton} btnText="Try it!" />}
    </CardLayout>
  );
};
export default ActionCard;
