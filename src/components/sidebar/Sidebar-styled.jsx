import styled, { css, keyframes } from "styled-components";
import { IconButton, Paper } from "@mui/material";
import { slideInRight, slideInLeft } from "react-animations";
const RightAnimate = keyframes`${slideInRight}`;
const LeftAnimate = keyframes`${slideInLeft}`;

const SidebarContainer = styled.aside`
  flex-direction: column;
  ${({ border }) =>
    border
      ? css`
          border-left: 1px solid rgba(211, 211, 211, 0.2);
        `
      : border === false
      ? css`
          border-right: 1px solid rgba(211, 211, 211, 0.2);
        `
      : null};
  position: sticky;
  top: 0;
  height: 100vh;
  flex-shrink: 0;
  z-index: 20;
  ${({ size }) =>
    size
      ? css`
          width: 340px;
          max-width: 340px;
          min-height: 320px;
          flex: 1 1 auto;
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        `
      : css`
          /* width: 40px; */
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        `};
  transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
`;
// animation: ${({isRight}) => isRight ? css`0.3s ${RightAnimate}` : css`0.3s ${LeftAnimate}`};
// animation: ${({isRight}) => isRight ? css`0.3s ${RightAnimate}` : css`0.3s ${LeftAnimate}`};
// animation: ${({isRight}) => isRight ? css`0.3s ${RightAnimate}` : css`0.3s ${LeftAnimate}`};
const SidebarWrapper = styled(Paper)`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

const SidebarHeader = styled.div`
  margin-top: 30px;
`;
const SidebarTabs = styled.div`
  background-color: #8005d8;
  min-width: 60px;
  max-width: 60px;
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
`;

const SidebarBody = styled.div``;
const WrapperIcon = styled(IconButton)`
  & > a {
    color: #faf8f9;
  }

  & > svg {
    color: #faf8f9;
    font-weight: 600;
  }

  & img {
    color: #fff;
    width: 25px;
    height: 25px;
    font-weight: bold;
  }
`;

const CircleImage = styled.div`
  border: 5px solid #322740;
  border-radius: 100%;
  width: 135px;
  height: 135px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
  }
`;
const Condition = styled.div`
  margin: 20px 0px;
  padding: 7px 0;
  cursor: pointer;
  border-radius: 15px;
  text-align: center;
  width: 100%;
  ${(props) =>
    props.isActive
      ? css`
          background: #4cd964;
          color: #fff;
        `
      : css`
          background-color: #a0a3a5;

          color: #ce1440;
        `}
`;
export {
  SidebarBody,
  SidebarContainer,
  SidebarHeader,
  SidebarWrapper,
  SidebarTabs,
  WrapperIcon,
  CircleImage,
  Condition,
};
