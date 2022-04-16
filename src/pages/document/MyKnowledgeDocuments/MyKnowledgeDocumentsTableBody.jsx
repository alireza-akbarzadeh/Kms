import React from "react";
import { TableRow, TableCell, useTheme, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Visibility } from "@mui/icons-material";
import { Avatar } from "components";
import { getDocStatus } from "helper";
import { useHistory } from "react-router-dom";

const MyKnowledgeDocumentsTableBody = ({ data }) => {
  const { t } = useTranslation();
  let dir = t("direction") === "rtl";
  const theme = useTheme();

  const history = useHistory();

  const goToDoc = (id, type) => {
    history.push(`/document/${type}/${id}`);
  };

  const border =
    theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";

  return (
    <>
      {data?.map((row, i) => (
        <TableRow
          key={i}
          sx={{
            "&:last-child td, &:last-child th": {
              border: 0,
              borderColor: border,
            },
          }}
        >
          <TableCell align={dir ? "right" : "left"}>
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
              <img
                style={{ height: 40 }}
                src={`/assets/images/${row?.type}.png`}
                alt={row?.type}
              />

              {row.title}
            </Box>
          </TableCell>
          <TableCell align={dir ? "right" : "left"}>
            {row?.description?.substring(0, 30)} ...
          </TableCell>
          <TableCell align={dir ? "right" : "left"}>{row.visibility}</TableCell>
          <TableCell align={dir ? "right" : "left"}>
            {getDocStatus(row.status_type, row.status)}
          </TableCell>
          <TableCell
            align={dir ? "right" : "left"}
            sx={{ cursor: "pointer" }}
            onClick={() => goToDoc(row?.id, row?.type)}
          >
            <Visibility color={"primary"} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default MyKnowledgeDocumentsTableBody;
