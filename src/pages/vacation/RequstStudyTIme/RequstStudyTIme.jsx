import * as React from "react";

import LoadingCore from "core/LoadingCore";
import {Http} from "helper/Http";
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from "react-redux";
import {getHrStudyTime} from "redux/features/mange/hrStudyTimeSlice";
import {statusHrStudyAction} from "redux/features/mange/statusHrStudy";
import _ from "lodash";
import {
    Box,
    Input,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from "@mui/material";
import {PaginateCore} from "core";
import Pagination from "@mui/lab/Pagination";
import RequstStudyTImeBody from "./RequstStudyTImeBody";
import {Filter, NoData} from "components";
import {SentimentVeryDissatisfied} from "@mui/icons-material";
import {useParams} from "react-router-dom"

const RequestStudyTime = () => {
    const [page, setPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [studyList, setStudyList] = React.useState([]);
    const [studyClone, setStudyClone] = React.useState([]);

    const {data, loading} = useSelector((state) => state.hrStudyTime);
    const perPage = 10;
    const firstRequest = React.useRef(false);

    const dispatch = useDispatch();
    const {t} = useTranslation();
    const theme = useTheme();
    const {id} = useParams();


    React.useEffect(() => {
        dispatch(getHrStudyTime({id}));
    }, [dispatch]);



    React.useEffect(() => {
        setStudyList(data);
        setStudyClone(data);
    }, [data]);

    const handlePageChange = async (event, value) => {
        setPage(value);
        const page = value;
        const res = await Http(
            `user/hr/logIndex/studyTime/index/${id}?page=${page}&perPage=${perPage}`,
            {
                method: "get",
            }
        );
        if (res.status === 200) {
            setStudyList(res?.data?.data);
        }
    };

    ////Handle Search
    React.useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm !== "") {
                const res = await Http(
                    `user/hr/logIndex/studyTime/index/${id}?search=${searchTerm}`,
                    {
                        method: "get",
                    }
                );
                if (res.status === 200) {
                    setStudyList(res?.data?.data);
                }
            } else {
                if (firstRequest.current) {
                    setStudyList(studyClone);
                } else {
                    firstRequest.current = true;
                }
            }
        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    let dir = t("direction") === "rtl";
    const border =
        theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";

    const handleFilterChange = async (queryString) => {
        const res = await Http(
            `user/hr/logIndex/studyTime/index/${id}?search=${queryString}`,
            {
                method: "get",
            }
        );
        if (res.status === 200) {
            setStudyList(res?.data?.data);
        }
    };

    const handleStatus = (id, status) => {
        const newData = _.cloneDeep(studyList);
        const index = newData.data.data?.findIndex((item) => item.id === id);
        let indexData = newData.data.data[index];
        _.merge(indexData, {status: status});
        _.merge(newData.data.data[index], indexData);
        dispatch(statusHrStudyAction({status, id}));
        setStudyList(newData);
    };

    return (
        <>
            {loading && <LoadingCore loading={loading}/>}
            <div>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "rgba(128, 5, 216, 0.9)",
                        padding: "14px 10px",
                        backdropFilter: "blur(5px)",
                        flexWrap: "wrap"
                    }}
                    style={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
                >
                    <Typography sx={{color: "#fff"}}>{t("VacationList")}</Typography>
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
                        <Filter data={studyList?.filters} handleChange={handleFilterChange}/>
                    </Box>
                </Box>
                {studyList?.data?.data?.length > 0 ? (
                    <TableContainer sx={{border: border}} component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align={dir ? "right" : "left"}>
                                        {t("UserName")}
                                    </TableCell>
                                    <TableCell align={dir ? "right" : "left"}>{t("Date")}</TableCell>
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
                                <RequstStudyTImeBody
                                    handleStatus={handleStatus}
                                    data={studyList?.data?.data}
                                />
                            </TableBody>
                        </Table>
                        {studyList?.data?.total > 10 && (
                            <PaginateCore>
                                <Pagination
                                    dir={dir ? "rtl" : "ltr"}
                                    page={page}
                                    onChange={handlePageChange}
                                    count={Math.ceil(
                                        studyList?.data?.total / studyList?.data?.per_page
                                    )}
                                    variant="outlined"
                                    color="primary"
                                    disabled={studyList?.data?.total < 11}
                                />
                            </PaginateCore>
                        )}
                    </TableContainer>
                ) : (
                    <NoData/>
                )}
            </div>
        </>
    );
};

export default RequestStudyTime;
