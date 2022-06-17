import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import arrowIcon from "../../assets/ArrowIcon.svg";
import { logout } from "../../services/initContract";

interface IProps {
  userName: string;
  onClick?: () => void;
}

const DropdownButton = styled.div`
  display: flex;
  justify-content: space-between;
  border: none;
  align-items: center;
  min-width: 240px;
  background: #dce9fe;
  border-radius: 100px;
  height: 60px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  padding: 10px 10px 10px 20px;
  color: #276ee7;
`;
const IconWrapper = styled.button<{ isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  height: 42px;
  width: 42px;
  background: #276ee7;
  border-radius: 100px;
  transform: scaleY(${({ isOpen }) => (isOpen ? "-1" : "1")});
`;
const DropdownContentItem = styled.button`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  border: none;
  align-items: center;
  background: #276ee7;
  border-radius: 100px;
  height: 60px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  padding: 20px 80px;
  color: #ffffff;
  min-width: 240px;
`;

const CustomUserDropdown: React.FC<IProps> = ({ userName, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {userName}
        <IconWrapper isOpen={isOpen}>
          <Image width={20} height={10} src={arrowIcon} alt="Popskl logo" />
        </IconWrapper>
      </DropdownButton>
      {isOpen && (
        <DropdownContentItem onClick={logout}>Sign out</DropdownContentItem>
      )}
    </>
  );
};
export default CustomUserDropdown;
