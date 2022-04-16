import React from "react";
import styled from "styled-components";

const Arrow = ({ color }) => {
  return (
    <Wrapper>
      <ArrowContainer colors={color} />
    </Wrapper>
  );
};

export default Arrow;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;
const ArrowContainer = styled.div`
  background-color: ${(props) => props.colors && props.color};
  width: 20px;
  height: 8px;
  border-top: solid 15px ${(props) => props.colors};
  border-left: solid 15px transparent;
  border-right: solid 15px transparent;
  animation-name: breath-animation;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  position: absolute;
  @keyframes breath-animation {
    0% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;
