import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingCore, PaginateCore } from "core";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Pagination from "@mui/lab/Pagination";
import { userAcceptLeave } from "redux/features/mange/userAcceptVacationSlice";
import { userRejectLeave } from "redux/features/mange/userRejectVacationSlice";
import { useTheme } from "@mui/material/styles";
import { checkLeaveReq } from "redux/features/mange/checkLeaveRequestSlice";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CheckTableBody from "./checkTableBody";
import { Http } from "helper/Http";
import _ from "lodash";
import {NoData} from "../../../components";

const CheckLeaveRequest = () => {
  const [page, setPage] = React.useState(1);
  const { data, loading } = useSelector((state) => state.checkLeaveRequest);
  const [VacationReq, setVacationReq] = React.useState([]);
  const perPage = 10;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const { id } = useParams();
  let dir = t("direction") === "rtl";

  const border =
    theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";

  React.useEffect(() => {
    dispatch(checkLeaveReq(id));
  }, [dispatch]);

  React.useEffect(() => {
    setVacationReq(data);
  }, [data]);

  const handlePageChange = async (event, value) => {
    setPage(value);
    const page = value;
    const res = await Http(
      `user/hr/logIndex/arrival/user/${id}?page=${page}&perPage=${perPage}`,
      {
        method: "get",
      }
    );
    if (res.status === 200) {
      setVacationReq(res?.data?.data);
    }
  };


  //handle Accept Vacation
  const handleStatusVacation = (id, status) => {
    const newData = _.cloneDeep(VacationReq);
    const index = newData.data.data?.findIndex((item) => item.id === id);
    let indexData = newData.data.data[index];
    _.merge(indexData, { status: status });
    _.merge(newData.data.data[index], indexData);

    if (status === "accept") {
      dispatch(userAcceptLeave({ id, status }));
    } else {
      dispatch(userRejectLeave({ id, status }));
    }
    setVacationReq(newData);
  };


  if (loading) {
    return <LoadingCore loading={loading} />;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(128, 5, 216, 0.9)",
          padding: "14px 10px",
          backdropFilter: "blur(5px)",
        }}
        style={{ borderTopLeftRadius: 9, borderTopRightRadius: 9 }}
      >
        <Typography sx={{ color: "#fff" }}>{t("VacationList")}</Typography>
      </Box>
      <TableContainer>
        {VacationReq?.data?.length === 0 ? (
          <NoData/>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align={dir ? "right" : "left"}>
                  {t("UserName")}
                </TableCell>
                <TableCell align={dir ? "right" : "left"}>
                  {t("Date")}
                </TableCell>
                <TableCell align={dir ? "right" : "left"}>
                  {t("Description")}
                </TableCell>
                <TableCell align={dir ? "right" : "left"}>
                  {t("Latest_Status")}
                </TableCell>
                <TableCell align={dir ? "right" : "left"}>
                  {t("Responsibleـfollow")}
                </TableCell>
                <TableCell align={dir ? "right" : "left"}>
                  {t("Actions")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <CheckTableBody
                handleStatusVacation={handleStatusVacation}
                data={VacationReq?.data?.data}
              />
            </TableBody>
          </Table>
        )}
        {VacationReq?.data?.total > 10 && (
          <PaginateCore>
            <Pagination
              dir={dir ? "rtl" : "ltr"}
              page={page}
              onChange={handlePageChange}
              count={Math.ceil(
                VacationReq?.data?.total / VacationReq?.data?.per_page
              )}
              variant="outlined"
              color="primary"
              disabled={VacationReq?.data?.total < 11}
            />
          </PaginateCore>
        )}
      </TableContainer>
    </>
  );
};

export default CheckLeaveRequest;
