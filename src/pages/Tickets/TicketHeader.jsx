import React from "react";
import { useMediaQuery, Typography, Button, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AddBtn, TicketBoxHeaders } from "./Tickets.styled";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EmptyTicket = ({ showForm, showFlag }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();

  return (
    <TicketBoxHeaders
      style={
        theme.palette.mode === "dark"
          ? { background: "#2E3139" }
          : { background: "#dac1f3" }
      }
    >
      <Typography variant="h4" component="h4">
        {t("Tickets")}
      </Typography>
      {showFlag ? (
        <AddBtn>
          <Button
            sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}
            variant="text"
            onClick={() => showForm(false)}
          >
            {!matches && (
              <Typography sx={{ marginTop: "5px" }}>{t("back")}</Typography>
            )}
            <ArrowBackIcon sx={{ marginRight: !matches && "24px" }} />
          </Button>
        </AddBtn>
      ) : (
        <AddBtn>
          <Button variant="text" onClick={() => showForm(true)}>
            <AddBoxOutlinedIcon sx={{ marginLeft: !matches && "24px" }} />
            {!matches && <span>{t("Add_New_Ticket")}</span>}
          </Button>
        </AddBtn>
      )}
    </TicketBoxHeaders>
  );
};

export default EmptyTicket;
