import {Button} from "@mui/material";
import styled from "styled-components";

const DrivesBox = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  font-weight: normal;
  border-radius: 24px 24px 0 0;
`;

const DrivesHeaders = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 21px;
  border-radius: 24px 24px 0 0;
  width: 100%;
  @media (max-width: 768px) {
    padding: 13px;
  }

  .Table_Headers {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 768px) {
      display: block;
    }
  }
  .SearchBar {
    display: inline-flex;
    @media(max-width: 768px){
      display: block;
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

const DrivesHeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 50px;
  color: #fff;
`;

const DrivesHeaderItems = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 5px 18px;
  flex: 1;
  flex-basis: 30%;
  margin: 10px;
  border-radius: 50px;
  text-align: center;
`;

const HeaderItemsDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
`;

const ListItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  /* flex: 1;
  flex-basis: 10%; */
  margin: 40px 10px;
  text-align: center;
  color: #2e3139;
`;

const FormControl = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    margin: 5px 0;
  }


  .search-input {
    border-radius: 37px 0 37px 37px;
    font-size: 17px;
    border: solid 3px;
    width: 100%;

    .MuiOutlinedInput-root {
      flex-direction: row-reverse;

      input {
        text-align: center;
        padding: 8px;
      }
    }

    fieldset {
      border: unset;
    }
  }
`;
const UploadCircle = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background-color: #322740;
  cursor: pointer;
`;

export {
    DrivesHeaders,
    DrivesBox,
    AddBtn,
    DrivesHeaderBox,
    DrivesHeaderItems,
    HeaderItemsDetails,
    ListItems,
    FormControl,
    UploadCircle,
};
