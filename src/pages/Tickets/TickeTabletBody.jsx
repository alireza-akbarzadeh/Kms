import React from "react";
import { TableCell, TableRow, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";

const TicketsTableBody = ({ data }) => {
  const { t } = useTranslation();
  let dir = t("direction") === "rtl";
  const theme = useTheme();
  const border =
    theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";
  const history = useHistory();

  return (
    <>
      {data?.map((row) => (
        <TableRow
          key={row?.id}
          sx={{
            "&:last-child td, &:last-child th": {
              border: 0,
              borderColor: border,
            },
          }}
        >
          <TableCell scope={"row"} align={dir ? "right" : "left"}>
            <Box
              sx={{
                marginTop: 1,
                fontSize: 12,
                color: "#666",
              }}
            >
              <Typography component={"span"}>{row?.subject}</Typography>
            </Box>
          </TableCell>
          <TableCell scope={"row"} align={dir ? "right" : "left"}>
            <Box
              sx={{
                marginTop: 1,
                fontSize: 12,
                color: "#666",
              }}
            >
              <Typography component={"span"}>{row?.unique_number}</Typography>
            </Box>
          </TableCell>
          <TableCell scope={"row"} align={dir ? "right" : "left"}>
            <Box
              sx={{
                marginTop: 1,
                fontSize: 12,
                color: "#666",
              }}
            >
              {row?.priority === "بالا" ? (
                <Typography color={"error"} component={"span"}>
                  {row?.priority}
                </Typography>
              ) : row?.priority === "متوسط" ? (
                <Typography component={"span"}>{row?.priority}</Typography>
              ) : (
                <Typography component={"span"}>{row?.priority}</Typography>
              )}
            </Box>
          </TableCell>
          <TableCell align={dir ? "right" : "left"}>
            <Typography
              sx={{
                marginTop: 1,
                fontSize: 14,
                color: "#444",
                display: "block",
              }}
              component={"span"}
            >
              {row?.date}
            </Typography>
          </TableCell>
          <TableCell align={dir ? "right" : "left"}>
            <Typography
              sx={{
                marginTop: 1,
                fontSize: 14,
                color: "#444",
                display: "block",
              }}
              component={"span"}
            >
              {row?.department}
            </Typography>
          </TableCell>
          <TableCell align={dir ? "right" : "left"}>
            <Typography
              color={row?.status_type === "user_close" ? "error" : "#444"}
              sx={{
                marginTop: 1,
                fontSize: 14,
                display: "block",
              }}
              component={"span"}
            >
              {row?.status}
            </Typography>
          </TableCell>
          <TableCell align={dir ? "right" : "left"}>
            <Typography
              sx={{
                marginTop: 1,
                fontSize: 14,
                color: "#444",
                display: "block",
              }}
              component={"span"}
            >
              <VisibilityIcon
                sx={{
                  color: "rgba(128, 5, 216, 0.9)",
                  cursor: "pointer",
                }}
                onClick={() => history.push("/ticket/" + row?.id)}
              />
            </Typography>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TicketsTableBody;
