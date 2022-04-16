import React from "react";
import styled from "styled-components";

const StatusCircle = ({ warning, success, danger, ...rest }) => {
  return (
    <Status isWarning={warning} isSuccess={success} isDanger={danger}>
      <div className="circle" />
    </Status>
  );
};

export default StatusCircle;

const Status = styled.div`
  .circle {
    background: ${({ isWarning, isSuccess, isDanger }) =>
      isWarning
        ? "rgb(135,206,235)"
        : isSuccess
        ? "green"
        : isDanger
        ? "red"
        : "#000"};
    border-radius: 100%;
    width: 14px;
    height: 14px;
    -webkit-animation: pulsing 2s infinite;
    animation: pulsing 2s infinite;
  }

  @-webkit-keyframes pulsing {
    0% {
      -webkit-transform: scale(0.5, 0.5);
      transform: scale(0.5, 0.5);
    }
    50% {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
    100% {
      -webkit-transform: scale(0.5, 0.5);
      transform: scale(0.5, 0.5);
    }
  }

  @keyframes pulsing {
    0% {
      -webkit-transform: scale(0.5, 0.5);
      transform: scale(0.5, 0.5);
    }
    50% {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
    100% {
      -webkit-transform: scale(0.5, 0.5);
      transform: scale(0.5, 0.5);
    }
  }
`;
