import {Button} from "@mui/material";
import styled from "styled-components";

const TicketBoxHeaders = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 21px;
  border-radius: 24px 24px 0 0;
  height: 70px;
  width: 100%;
`;

const TicketTableHeaders = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 21px;
  flex-wrap: wrap;
  border-radius: 24px 24px 0 0;
  width: 100%;

  .Table_header {
    display: flex;
    flex-direction: row;
    gap: 10px;
    @media (max-width: 480px) {
      flex-direction: column;
    }
  }
`;


const AddBtn = styled.div`
  background-color: #8005d8;
  border-radius: 50px;
  width: 195px;
  height: 39px;
  line-height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 100%;
    height: 100%;
    font-size: 17px;
    border-radius: 50px;
    color: #fff;

    &:hover {
      background-color: unset;
    }
  }
`;
const FormBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  form {
    width: 80%;
    display: flex;
    align-items: center;
    flex-direction: column;

    .MuiInputBase-input {
      width: 100%;
    }
  }
`;
const UploadBtn = styled(Button)`
  && {
    width: 100%;
    margin: 20px 0;
    background-color: unset;
    color: #707070;
    box-shadow: none;
    border: 2px dashed #707070;

    &:hover {
      background-color: unset;
      box-shadow: none;
    }
  }
`;
export {TicketBoxHeaders, TicketTableHeaders, AddBtn, UploadBtn, FormBox};
