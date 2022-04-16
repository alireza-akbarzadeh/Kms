import {Button, TextareaAutosize, TextField} from "@mui/material";
import styled, {css} from "styled-components";

const AddBtn = styled(Button)`
  svg {
    margin: 0 5px;
  }
`;

const Input = styled(TextField)`
  border-radius: ${({dir}) =>
          dir ? "20px  0 20px 20px" : "20px  20px 0 20px"};

  input {
    text-align: ${({dir}) => (dir ? "right" : "left")};
  }
`;

const TextBox = styled(TextareaAutosize)`
  width: 100%;
  margin: 15px 0;
  outline: none;
  padding: 5px;
  resize: none;
  border-radius: ${({dir}) =>
          dir ? "20px  0 20px 20px" : "0  20px 20px 20px"};
  text-align: ${({dir}) => (dir ? "right" : "left")};

  &:focus {
    border: 2px solid #8005d8;
  }
`;

const FolderAction = styled(Button)`
  background-color: transparent;
  border: none;

  ${({isMobile}) => isMobile ? css`
    align-items: start;
    justify-content: flex-start;
  ` : css`
    justify-content: center;
    align-items: center;
  `}
  & > img {
    width: 50px;
    object-fit: contain;
    height: 50px;
  }
`;

export {AddBtn, TextBox, Input, FolderAction};
