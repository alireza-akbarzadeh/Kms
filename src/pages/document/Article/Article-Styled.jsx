import styled, {css} from "styled-components";
import {IconButton} from "@mui/material";

const Header = styled.div`
  display: flex;
  margin-top: ${({mt}) => mt ? `${mt}px` : 0};
  align-items: center;
  width: 100%;
  flex-direction: row;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: 15px;
  }
  justify-content: space-between;
`;
const Body = styled.div`
  transition: all 0.3s ease-in-out;

  .body__Html {
    text-align: justify;
    font-weight: 500;
    word-wrap: break-word;
    font-size: 1.0625rem;
    letter-spacing: .05em;
    line-height: 1.8em;
    word-break: break-word;
    
    img {
      width: 100%;
      height: 100%;
    }
  }

  .Star_rate {
    display: flex;
    align-content: end;
    justify-content: flex-end;
    margin-top: 20px;
    margin-bottom: 10px;
    @media (max-width: 576px) {
      justify-content: center;

    }
  }
`;
const Paragraph = styled.div`
  font-size: 15px;
  font-weight: 400;
  line-height: 1.9;
  margin-top: 20px;
`;

const Rate = styled.div`
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  @media (max-width: 576px) {
    flex-direction: column;
    display: block;
    justify-content: flex-start;
  }

  .btn__Like {
    @media (max-width: 576px) {
      margin: 20px 0;
      justify-content: center;
      text-align: center;

    }
  }
`
const LikeBtn = styled(IconButton)`
  border-radius: 100%;
  transition: all 0.8s ease-in-out;

  ${({Active}) => Active === true && css`
    pointer-events: none;
    opacity: 0.7;
  `} ;
  ${({DisActive}) => DisActive === true && css`
    pointer-events: none;
    opacity: 0.7;
  `};

  ${({btn}) => btn === "like" ? css`
    border: 1px solid #1ce087;
    transform: rotateY(0);

    &:hover {
      background: #1ce087;
      color: #fff;
      transform: rotateY(1grad);

      & > svg {
        color: #fff;
      }
    }

    & > svg {
      color: #1ce087;
    }
  ` : btn === "disLike" ? css`
    border: 1px solid #ce1440;

    &:hover {
      background: #ce1440;
      transform: (1grad);

      & > svg {
        color: #fff;
      }
    }

    & > svg {
      color: #ce1440;
    }
  ` : null}

`;

const AlignItems = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  
  span {
    display: block;
    margin-top: 5px;
  }
`;
const AlignItemsClick = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  span {
    display: block;
    margin-top: 5px;
  }
`;

const SpaceItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
`;

const ArrowControl = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 50%;
  border: 1px solid #e8e8e8;
  width: 30px;
  height: 30px;
  text-align: center;
  cursor: pointer;
  transform: translateX(-35px);
  transition: all 0.3s ease-in-out;
  z-index: 10;

  &:hover {
    border-radius: 3px;
    width: 35px;
    background-color: #8005d8;
    color: #fff;
    border: 1px solid #8005d8;
  }
`;


const SideAction = styled.div`
  position: fixed;
  height: 100%;
  top: 120px;
  left: 0;
  ${({isRtl}) => isRtl ? css`
    left: 0;
  ` : css`
    right: 0;
  `};

  ${({isActive}) => isActive ? css`
  ` : css`
    position: fixed;
    top: 0;
    min-width: 300px;
    z-index: 10;
  `}
`;

const SideArticle = styled.div`
  transition: all 0.6s ease-in-out;
  @media (max-width: 900px) {
    position: absolute;
    top: 0;
    padding: 15px;
    min-width: 300px;
    height: 100%;
    left: 0;
    background-color: #fff;
    z-index: 10;
  }
`;

export {Header, Body, Paragraph, Rate, LikeBtn, AlignItems, AlignItemsClick, SpaceItems, ArrowControl, SideAction, SideArticle}