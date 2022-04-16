import styled from "styled-components";
import {Button} from "@mui/material";

const AuthBtn = styled(Button)`
  && {
    border-radius: 50px;
    width: 105px;
    height: 43px;
    @media (max-width: 425px) {
      width: 80px;
    }
    @media (max-width: 348px) {
      width: 60px;
      height: 33px;

    }
  }
`;
const BGHeader = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: none;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.9px);
  -webkit-backdrop-filter: blur(6.9px);

  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
/* From https://css.glass */

const List = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  li.border-y {
    & > span {
      border: solid 1px #cec9c9;
      transform: rotate(180deg);
      height: 50px;
    }

    & > span.mr {
      margin-right: 5px;
    }
  }

  li {
    display: flex;
    color: #181a20;
    cursor: pointer;
    align-items: center;
  }

  li.Menu {
    margin: 0 25px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  row-gap: 2rem;
  height: 80px;
  justify-content: space-between;
`;
export {AuthBtn, BGHeader, List, Wrapper};
