import React, { useEffect } from "react";
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
import { LoadingCore, PaginateCore, StatusCore } from "../../core";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { leaveRequestDetailsList } from "../../redux/features/mange/LeaveRequsetDetailstSlice";
import { Http } from "../../helper";
import { Filter } from "../../components";

const VacationDetailsList = () => {
  const [perPage, setPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const [UserList, setUserList] = React.useState([]);
  const { data, loading } = useSelector((state) => state.leaveRequestDetails);

  useEffect(() => {
    setUserList(data);
  }, [data]);

  const theme = useTheme();
  const { t } = useTranslation();
  let dispatch = useDispatch();
  let history = useHistory();
  ////Handle Page Change

  const { id } = useParams();
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    const page = pageNumber;
    dispatch(leaveRequestDetailsList({ id, perPage, page }));
  };

  React.useEffect(() => {
    dispatch(leaveRequestDetailsList({ id, perPage, page }));
  }, [dispatch]);
  const handleSortChange = async (e) => {
    const sort = e.target.value;
    const res = await Http(`user/hr/leaveRequests/${id}?status=${sort}`, {
      method: "get",
    });
    if (res.status === 200) {
      setUserList(res?.data?.data);
    }
  };

  let dir = t("direction") === "rtl";

  const border =
    theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";

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
          padding: "18px 10px",
          backdropFilter: "blur(5px)",
        }}
        style={{ borderTopLeftRadius: 9, borderTopRightRadius: 9 }}
      >
        <Typography sx={{ color: "#fff" }}>{t("VacationDetails")}</Typography>
        <Box>
          <Filter data={UserList?.filters} handleChange={handleSortChange} />
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
            </TableRow>
          </TableHead>
          {UserList?.data?.length === 0 ? (
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
              {t("User_Not_Found")}
            </Box>
          ) : (
            <TableBody>
              {UserList?.data?.data.map((row, i) => (
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
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {UserList?.data?.total > 10 && (
          <PaginateCore>
            <Pagination
              activePage={page}
              totalItemsCount={UserList?.data.total}
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

export default VacationDetailsList;
