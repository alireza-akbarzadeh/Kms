import React from "react";
import {Backdrop, CircularProgress} from "@mui/material";
import styled from "styled-components";

const FirstLoadingCore = ({loading}) => {
  return (
      <Backdrop
          sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
          open={loading}
      >
        <Parent>
          <svg className="pl" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                <stop offset="0%" stopColor="hsl(313,90%,55%)"/>
                <stop offset="100%" stopColor="hsl(223,90%,55%)"/>
              </linearGradient>
              <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(313,90%,55%)"/>
                <stop offset="100%" stopColor="hsl(223,90%,55%)"/>
              </linearGradient>
            </defs>
            <circle className="pl__ring" cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)"
                    strokeWidth="36"
                    strokeDasharray="0 257 1 257" strokeDashoffset="0.01" strokeLinecap="round"
                    transform="rotate(-90,100,100)"/>
            <line className="pl__ball" stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182"
                  strokeWidth="36"
                  strokeDasharray="1 165" strokeLinecap="round"/>
          </svg>
        </Parent>
      </Backdrop>
  );
};

export default FirstLoadingCore;


const Parent = styled.div`
  .pl {
    display: block;
    width: 6.25em;
    height: 6.25em;
  }

  .pl__ring, .pl__ball {
    animation: ring 2s ease-out infinite;
  }

  .pl__ball {
    animation-name: ball;
  }

  /* Dark theme  */
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: hsl(var(--hue), 10%, 10%);
      --fg: hsl(var(--hue), 10%, 90%);
    }
  }

  /* Animation */
  @keyframes ring {
    from {
      stroke-dasharray: 0 257 0 0 1 0 0 258;
    }
    25% {
      stroke-dasharray: 0 0 0 0 257 0 258 0;
    }
    50%, to {
      stroke-dasharray: 0 0 0 0 0 515 0 0;
    }
  }
  @keyframes ball {
    from, 50% {
      animation-timing-function: ease-in;
      stroke-dashoffset: 1;
    }
    64% {
      animation-timing-function: ease-in;
      stroke-dashoffset: -109;
    }
    78% {
      animation-timing-function: ease-in;
      stroke-dashoffset: -145;
    }
    92% {
      animation-timing-function: ease-in;
      stroke-dashoffset: -157;
    }
    57%, 71%, 85%, 99%, to {
      animation-timing-function: ease-out;
      stroke-dashoffset: -163;
    }
  }



`;