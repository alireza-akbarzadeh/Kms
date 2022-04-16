import React from "react";
import {
  Grid,
  useMediaQuery,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { TicketBoxHeaders } from "./Tickets.styled";

const AttentionBox = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  
  return (
    <Grid
      xs={matches ? 12 : 6}
      md={matches ? 5 : 4}
      sx={{ flexDirection: "column" }}
    >
      <TicketBoxHeaders
        style={
          theme.palette.mode === "dark"
            ? { background: "#2E3139" }
            : { background: "#dac1f3" }
        }
      >
        <Typography variant="h4" component="h4">
          {t("Attention")}
        </Typography>
      </TicketBoxHeaders>
      <Box sx={{ padding: " 10px 16px" }}>
        <Typography variant="p" component="p" marginBottom="20px">
          1.{t('Be_Sure_To_Read_The_FAQ_Carefully_Before_Sending_The_Ticket')}
        </Typography>
        <Typography variant="p" component="p" marginBottom="20px">
          2.{t('Please_Refrain_From_Sending_Irrelevant_Tickets')}
        </Typography>
        <Typography variant="p" component="p" marginBottom="20px">
          3.{t('Avoid_Sending_Duplicate_Tickets_In_A_Row')}
        </Typography>
      </Box>
    </Grid>
  );
};

export default AttentionBox;
