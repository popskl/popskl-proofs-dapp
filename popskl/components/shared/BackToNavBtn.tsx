import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import arrowLeft from "../../assets/ArrowLeft.svg";

const LinkLayuot = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: flex-start;
  align-items center;
  padding: 40px 10px;
`;
const BtnText = styled.span`
  margin-left: 10px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #276ee7;
`;
const LinkTxt = styled.span`
display: flex;
justify-content: flex-start;
align-items center;
cursor: pointer;
:hover {
  text-decoration: underline;
}
`;

const GoHomeBtn = () => {
  return (
    <LinkLayuot>
      <Link href="/" passHref>
        <LinkTxt>
          <Image width={20} height={20} src={arrowLeft} />
          <BtnText>Home</BtnText>
        </LinkTxt>
      </Link>
    </LinkLayuot>
  );
};
export default GoHomeBtn;
