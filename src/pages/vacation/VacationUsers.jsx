import * as React from "react";
import {
  Box,
  Button,
  IconButton,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Filter } from "components";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { PaginateCore, LoadingCore, StatusCore } from "core";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { leaveRequestList } from "redux/features/mange/LeaveRequsetSlice";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { getUserList } from "../../redux/features/users/getUserSlice";
import { Http } from "../../helper";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { acceptVacation } from "redux/features/mange/acceptVacationSlice";
import { rejectVacation } from "redux/features/mange/rejectVacationSlice";
import { useEffect } from "react";
const VacationUsers = () => {
  const [perPage, setPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [VacationList, setVacationList] = React.useState([]);

  const [status, setStatus] = React.useState("");
  const { data, loading } = useSelector((state) => state.leaveRequest);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();

  React.useEffect(() => {
    dispatch(leaveRequestList({ perPage, page }));
  }, [dispatch]);

  React.useEffect(() => {
    setVacationList(data);
  }, [data]);
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    const page = pageNumber;
    dispatch(getUserList({ perPage, page }));
  };

  ////Handle Search
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const res = await Http(`user/hr/leaveRequests?search=${searchTerm}`, {
        method: "get",
      });
      if (res.status === 200) {
        setVacationList(res?.data?.data);
      }
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  let dir = t("direction") === "rtl";
  const border =
    theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";

  const handleSortChange = async (e) => {
    const sort = e.target.value;
    const res = await Http(`user/hr/leaveRequests?status=${sort}`, {
      method: "get",
    });
    if (res.status === 200) {
      setVacationList(res?.data?.data);
    }
  };

  //handle Accept Vacation
  const handleAcceptVacation = (id) => {
    const status = "accept";
    dispatch(acceptVacation({ id, status }));
  };
  //handle Reject Vacation
  const handleRejectVacation = (id) => {
    const status = "reject";
    dispatch(rejectVacation({ id, status }));
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
        <Box>
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
            sx={{
              padding: "0 6px",
              borderRadius: 2,
              color: "#fff",
            }}
            type={"search"}
            placeholder={t("search")}
          />
          <Filter
            data={VacationList?.filters}
            handleChange={handleSortChange}
          />
        </Box>
      </Box>
      <TableContainer sx={{ border: border }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align={dir ? "right" : "left"}>
                {t("UserName")}
              </TableCell>
              <TableCell align={dir ? "right" : "left"}>{t("Date")}</TableCell>
              <TableCell align={dir ? "right" : "left"}>
                {t("Type_Vacation")}
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
          {VacationList?.data?.length === 0 ? (
            <Box
              sx={{
                display: "flex ",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                textAlign: "center",
                marginTop: 1,
                padding: 1,
                marginBottom: 1,
              }}
            >
              <SentimentVeryDissatisfiedIcon sx={{ margin: "0 5px" }} />
              {t("Leave_Has_Not_Been_Registered")}
            </Box>
          ) : (
            <TableBody>
              {VacationList?.data?.data.map((row, i) => (
                <TableRow
                  key={i}
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
                      <Typography component={"span"}>
                        {row?.hr?.first_name}
                      </Typography>
                      <Typography
                        component={"span"}
                        sx={{ margin: "0 4px", display: "inline-block" }}
                      >
                        {row?.hr?.last_name}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        marginTop: 1,
                        fontSize: 14,
                        color: "#444",
                        display: "block",
                      }}
                      component={"span"}
                    >
                      {row?.hr?.email}
                    </Typography>
                  </TableCell>
                  <TableCell align={dir ? "right" : "left"}>
                    <Typography color={"#777"} component={"span"}>
                      {row?.date}
                    </Typography>
                    <br />
                    <Typography
                      component={"span"}
                      sx={{
                        marginTop: 1,
                        display: "inline-block",
                        fontSize: 13,
                      }}
                    >
                      از ساعت {row?.arrival} الی {row?.out}
                    </Typography>
                  </TableCell>
                  <TableCell align={dir ? "right" : "left"}>
                    {row?.type === "earned_leave" ? t("Earned") : t("Sickness")}
                  </TableCell>
                  <TableCell align={dir ? "right" : "left"}>
                    {row?.description}
                  </TableCell>
                  <TableCell align={dir ? "right" : "left"}>
                    <Box display={"flex"}>
                      {row.status === "accept" && <StatusCore success />}
                      {row.status === "reject" && <StatusCore danger />}
                      {row.status === "waiting" && <StatusCore warning />}
                      <Typography
                        color={
                          row.status === "accept"
                            ? "#1ce087"
                            : row.status === "waiting"
                            ? "#0fcece"
                            : row.status === "reject"
                            ? "#ce1440"
                            : "#333"
                        }
                        sx={{ margin: "0px 4px" }}
                      >
                        {row.status === "accept" ? (
                          row.accepted_at
                        ) : row.status === "waiting" ? (
                          <>{t("wating")}</>
                        ) : row.status === "reject" ? (
                          row.rejected_at
                        ) : null}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell scope={"row"} align={dir ? "right" : "left"}>
                    <Box
                      sx={{
                        marginTop: 1,
                        fontSize: 11,
                        color: "#666",
                      }}
                    >
                      <Typography component={"span"}>
                        {row?.user?.first_name}
                      </Typography>
                      <Typography
                        component={"span"}
                        sx={{ margin: "0 4px", display: "inline-block" }}
                      >
                        {row?.user?.last_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell scope={"row"} align={dir ? "right" : "left"}>
                    <Box>
                      <IconButton
                        disabled={row?.status === "accept"}
                        onClick={() => handleAcceptVacation(row?.id)}
                      >
                        <ThumbUp
                          sx={
                            row?.status === "accept"
                              ? { color: "#777 !important" }
                              : { color: "#1ce087" }
                          }
                        />
                      </IconButton>
                      <IconButton
                        disabled={row?.status === "reject"}
                        onClick={() => handleRejectVacation(row?.id)}
                      >
                        <ThumbDown
                          sx={
                            row?.status === "reject"
                              ? { color: "#777 !important" }
                              : { color: "#ce1440" }
                          }
                        />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {VacationList?.data?.total > 10 && (
          <PaginateCore>
            <Pagination
              activePage={page}
              totalItemsCount={VacationList?.data.total}
              pageRangeDisplayed={10}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          </PaginateCore>
        )}
      </TableContainer>
    </>
  );
};

export default VacationUsers;
