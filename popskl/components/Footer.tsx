import styled from "@emotion/styled";

const FooterLayuot = styled.footer<{ signedIn: boolean }>`
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10%;
  font-weight: 400;
  font-size: 16px;
  color: #276ee7;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    #79abff;
  min-height: 80px;
  @media (max-width: 620px) {
    flex-wrap: wrap;
    justify-content: center;
  }
  span {
    padding: 5px;
    text-align: center;
  }
  margin-top: auto;
  margin-bottom: 0;
  @media (max-width: 1311px) {
    align-items: flex-end;
    min-height: ${({ signedIn }) => (!signedIn ? "80px" : "142px")};
  }
`;
export const Footer: React.FC<{ signedIn: boolean }> = ({ signedIn }) => {
  return (
    <FooterLayuot signedIn={signedIn}>
      <span>
        For any queries please contact{" "}
        <a href="mailto:info@popskl.io">info@popskl.io</a>
      </span>
      <span>© 2022 by POPSKL</span>
    </FooterLayuot>
  );
};
