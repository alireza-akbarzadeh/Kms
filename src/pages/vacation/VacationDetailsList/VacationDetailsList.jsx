import React, {useEffect} from "react";
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
import {LoadingCore, PaginateCore} from "core";
import Pagination from "@mui/lab/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {leaveRequestDetailsList} from "redux/features/mange/LeaveRequsetDetailstSlice";
import {Http} from "helper";
import {Filter, NoData} from "components";
import {userAcceptLeave} from "redux/features/mange/userAcceptVacationSlice";
import {userRejectLeave} from "redux/features/mange/userRejectVacationSlice";
import VacationTableBody from "./VacationTableBody";
import _ from "lodash";

const VacationDetailsList = ({data, loading}) => {
    const [perPage, setPerPage] = React.useState(10);
    const [page, setPage] = React.useState(1);

    const [UserList, setUserList] = React.useState([]);

    const theme = useTheme();
    const {t} = useTranslation();
    let dispatch = useDispatch();
    ////Handle Page Change

    const {id} = useParams();
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        const page = pageNumber;
        dispatch(leaveRequestDetailsList({id, perPage, page}));
    };

    useEffect(() => {
        setUserList(data);
    }, [data]);

    const handleSortChange = async (queryString) => {
        const res = await Http(`user/hr/leaveRequests/${id}?${queryString}`, {
            method: "get",
        });
        if (res.status === 200) {
            setUserList(res?.data?.data);
        }
    };

    const handleStatus = (id, status, comment) => {
        const newData = _.cloneDeep(UserList);
        const index = newData.data.data?.findIndex((item) => item.id === id);
        let indexData = newData.data.data[index];
        _.merge(indexData, {status: status, comment: comment});
        _.merge(newData.data.data[index], indexData);

        setUserList(newData);
    };


    let dir = t("direction") === "rtl";

    const border =
        theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";


    return (
        <>
            {loading && <LoadingCore loading={loading}/>}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "rgba(128, 5, 216, 0.9)",
                    padding: "18px 10px",
                    backdropFilter: "blur(5px)",
                }}
                style={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
            >
                <Typography sx={{color: "#fff"}}>{t("VacationDetails")}</Typography>
                <Box>
                    <Filter data={UserList?.filters} handleChange={handleSortChange}/>
                </Box>
            </Box>
            {UserList?.data?.data?.length > 0 ? (
                <TableContainer sx={{border: border}} component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align={dir ? "right" : "left"}>{t("Date")}</TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    {t("Type_Vacation")}
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    {t("Description")}
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    {t("file")}
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    {t("Latest_Status")}
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    {t("Responsibleـfollow")}
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    {t("comment")}
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    {t("Actions")}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <VacationTableBody
                                username={false}
                                data={UserList?.data?.data}
                                handleStatus={handleStatus}
                            />
                        </TableBody>
                    </Table>
                    {UserList?.data?.total > 10 && (
                        <PaginateCore>
                            <Pagination
                                dir={dir ? "rtl" : "ltr"}
                                page={page}
                                onChange={handlePageChange}
                                count={Math.ceil(
                                    UserList?.data?.total / UserList?.data?.per_page
                                )}
                                variant="outlined"
                                color="primary"
                                disabled={UserList?.data?.total < 11}
                            />
                        </PaginateCore>
                    )}
                </TableContainer>
            ) : (
                <NoData/>
            )}

        </>
    );
};

export default VacationDetailsList;
