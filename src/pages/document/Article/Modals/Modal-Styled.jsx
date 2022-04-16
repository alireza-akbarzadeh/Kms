import styled, {css} from "styled-components";
import {Button} from "@mui/material";

const CommentText = styled.div`
  position: relative;
  margin-top: 6px;

  input {
    width: 100%;
    border: 1px solid #c0c0c0;
    outline: navajowhite;
    height: auto;
    padding: 18px 0;
    ${({isRtl}) => isRtl ? css`
      text-align: right;
      padding-right: 15px;
    ` : css`
      text-align: left;
      padding-left: 15px;
    `};
    font-size: 16px;
  }

`;

const SendBtn = styled(Button)`
  position: absolute;
  color: #333;
  height: 100%;
  background: skyblue;
  ${({isRtl}) => isRtl ? css`
    left: 0;
  ` : css`
    right: 0;
  `};
`;

const CardContainer = styled.div`
  width: 90%;
  max-width: 100%;
  height: auto;
  margin: 5px 0;
  transform: skew(2deg);
  padding: 25px 15px;
  background: #faf8f9;
  box-shadow: 0 2px 3px 2px rgba(0, 0, 0, .14);
`
const CardBody = styled.div`
  transform: skew(0);
  .Card__Avatar {
    display: flex;
    align-items: center;
    gap: 7px;
  }
`


export {CommentText, SendBtn, CardContainer, CardBody}