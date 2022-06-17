import styled from "@emotion/styled";

interface IProps {
  btnText: string;
  onClick?: () => void;
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  border: none;
  align-items: center;
  width: 100%;
  background: #276ee7;
  border-radius: 100px;
  height: 60px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  padding: 20px 80px;
  color: #ffffff;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  :focus {
    outline: none;
  }
`;

const StyledButton: React.FC<IProps> = ({ btnText, onClick }) => {
  return <Button onClick={onClick}>{btnText}</Button>;
};
export default StyledButton;
