import * as React from "react";
import {
    Box, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from "@mui/material";
import {Filter, NoData} from "components";
import {LoadingCore, PaginateCore} from "core";
import {useDispatch, useSelector} from "react-redux";
import {leaveRequestList} from "redux/features/mange/LeaveRequsetSlice";
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/material/styles";
import {Http} from "helper";
import _ from "lodash";
import Pagination from "@mui/material/Pagination";
import VacationTableBody from "./VacationTableBody";

const VacationUsers = () => {
    const [page, setPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [VacationList, setVacationList] = React.useState([]);
    const [vacationClone, setVacationClone] = React.useState([]);
    const perPage = 10;

    const firstRequest = React.useRef(false);
    const {data, loading} = useSelector((state) => state.leaveRequest);

    const dispatch = useDispatch();
    const {t} = useTranslation();
    const theme = useTheme();

    React.useEffect(() => {
        dispatch(leaveRequestList({perPage, page}));
    }, [dispatch]);

    React.useEffect(() => {
        setVacationList(data);
        setVacationClone(data);
    }, [data]);

    const handlePageChange = async (event, value) => {
        setPage(value);
        let page = value;
        const res = await Http(`user/hr/leaveRequests?page=${page}&perPage=${perPage}`, {
            method: "get",
        });
        if (res.status === 200) {
            setVacationList(res?.data?.data);
        }
    };

    ////Handle Search
    React.useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm !== "") {
                const res = await Http(`user/hr/leaveRequests?search=${searchTerm}`, {
                    method: "get",
                });
                if (res.status === 200) {
                    setVacationList(res?.data?.data);
                }
            } else {
                if (firstRequest.current) {
                    setVacationList(vacationClone);
                } else {
                    firstRequest.current = true;
                }
            }
        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    let dir = t("direction") === "rtl";
    const border = theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";

    const handleFilterChange = async (queryString) => {
        const res = await Http(`user/hr/leaveRequests?${queryString}`, {
            method: "get",
        });
        if (res.status === 200) {
            setVacationList(res?.data?.data);
        }
    };

    const handleStatus = (id, status, comment) => {
        const newData = _.cloneDeep(VacationList);
        const index = newData.data.data?.findIndex((item) => item.id === id);
        let indexData = newData.data.data[index];
        _.merge(indexData, {status: status, comment: comment});
        _.merge(newData.data.data[index], indexData);

        setVacationList(newData);
    };

    return (<>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "rgba(128, 5, 216, 0.9)",
                    padding: "14px 10px",
                    flexWrap: "wrap",
                    backdropFilter: "blur(5px)",
                }}
                style={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
            >
                <Typography sx={{color: "#fff"}}>{t("VacationList")}</Typography>
                <Box>
                    <Input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoComplete="off"
                        sx={{
                            padding: "0 6px", borderRadius: 2, color: "#fff",
                        }}
                        type={"search"}
                        placeholder={t("search")}
                    />
                    <Filter
                        data={VacationList?.filters}
                        handleChange={handleFilterChange}
                    />
                </Box>
            </Box>
            {VacationList?.data?.data?.length > 0 ? (<TableContainer sx={{border: border}} component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
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
                                <TableCell align="right">{t("File")}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    {t("Latest_Status")}
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    {t("comment")}
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
                            <VacationTableBody
                                handleStatus={handleStatus}
                                data={VacationList?.data?.data}
                            />
                        </TableBody>
                    </Table>
                    {VacationList?.data?.total > 10 && (<PaginateCore>
                            <Pagination
                                dir={dir ? "rtl" : "ltr"}
                                page={page}
                                onChange={handlePageChange}
                                count={Math.ceil(VacationList?.data?.total / VacationList?.data?.per_page)}
                                variant="outlined"
                                color="primary"
                                disabled={VacationList?.data?.total < 11}
                            />
                        </PaginateCore>)}
                </TableContainer>) : (<NoData/>)}
        </>);
};

export default VacationUsers;
