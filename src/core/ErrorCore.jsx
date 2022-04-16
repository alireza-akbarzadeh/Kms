import React from "react";
import styled, { css } from "styled-components";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material"
import { useTranslation } from "react-i18next";
const ErrorCore = ({ children }) => {
  const { t } = useTranslation();

  const dir = t("direction") === "rtl"
  return (
    <Text dir={dir}>
      <ErrorOutlineOutlined sx={{ color: "#ce1440" }} />
      <Typography component={"span"}>{children}</Typography>
    </Text>
  );
};
export default ErrorCore;

const Text = styled.div`
  display: "block";
  margin:4px 5px;
  display: inline-flex;
  align-items: center;
  ${({ dir }) => dir ? css`
  justify-content: flex-end;
  ` : css`
  justify-content: flex-start;
  `}  
svg{
  margin: 2px 2px;
}
  span{
    color:#ce1440;
    display:block;
    font-weight:400;
    font-size:0.9rem;
    padding: 6px 0 0 0;
    }
`;
