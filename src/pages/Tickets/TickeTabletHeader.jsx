import React from "react";
import { Typography, Button, useTheme, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TicketTableHeaders } from "./Tickets.styled";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl } from "../Drives/Drives-styled";

const TicketTableHeader = ({ setSearchTerm, setShowForm, matches }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <TicketTableHeaders
      style={
        theme.palette.mode === "dark"
          ? { background: "#2E3139" }
          : { background: "#dac1f3" }
      }
    >
      <Typography variant="h4" component="h4">
        {t("MyTickets")}
      </Typography>
      <div className={"Table_header"}>
        <FormControl>
          <TextField
            placeholder={t("Search")}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            style={
              theme.palette.mode === "dark"
                ? { borderColor: "#f9f9f9", borderWidth: "1px" }
                : { borderColor: "#322740", borderWidth: "1px" }
            }
            InputProps={{
              endAdornment: (
                <SearchIcon sx={{ cursor: "pointer", margin: "0 17px" }} />
              ),
            }}
          />
        </FormControl>
        <Button
          sx={{
            padding: "4px 33px",
            margin: "0 15px",
            borderRadius: "20px",
            display: "inline-flex",
            alignItems: "center",
          }}
          variant="contained"
          color={"primary"}
          onClick={() => setShowForm(true)}
        >
          <AddBoxOutlinedIcon sx={{ margin: "0 5px" }} />
          <span>{t("Add_New_Ticket")}</span>
        </Button>
      </div>
    </TicketTableHeaders>
  );
};

export default TicketTableHeader;
