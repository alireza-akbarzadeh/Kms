import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { PaginateCore } from "../../core";
import Pagination from "@mui/lab/Pagination";
import TicketsTableBody from "./TickeTabletBody";

const AddTicket = ({ mainData, handlePageChange, page }) => {
  const { t } = useTranslation();
  const dir = t("direction");
  const theme = useTheme();
  const border =
    theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";



  return (
    <>
      <TableContainer sx={{ border: border }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align={dir ? "right" : "left"}>
                {t("TicketTitle")}
              </TableCell>
              <TableCell align={dir ? "right" : "left"}>
                {t("TicketNumber")}
              </TableCell>
              <TableCell align={dir ? "right" : "left"}>
                {t("TicketPriority")}
              </TableCell>
              <TableCell align={dir ? "right" : "left"}>
                {t("TicketDate")}
              </TableCell>
              <TableCell align={dir ? "right" : "left"}>
                {t("TicketDepartment")}
              </TableCell>
              <TableCell align={dir ? "right" : "left"}>
                {t("TicketStatus")}
              </TableCell>
              <TableCell align={dir ? "right" : "left"}>
                {t("Actions")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TicketsTableBody data={mainData?.data} />
          </TableBody>
        </Table>
        {mainData?.total > 10 && (
          <PaginateCore>
            <Pagination
              dir={dir ? "rtl" : "ltr"}
              page={page}
              onChange={handlePageChange}
              count={Math.ceil(mainData?.total / mainData?.per_page)}
              variant="outlined"
              color="primary"
              disabled={mainData?.total < 11}
            />
          </PaginateCore>
        )}
      </TableContainer>
    </>
  );
};

export default AddTicket;
