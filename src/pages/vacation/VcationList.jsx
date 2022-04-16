import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Typography, Box, Paper, Input} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import {getUserList} from "redux/features/users/getUserSlice";
import {Http} from "helper";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {PaginateCore} from "core";
import Pagination from "react-js-pagination";
import {Badge} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";

const VacationList = () => {
    const [perPage, setPerPage] = React.useState(10);
    const [page, setPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState("");

    const [UserList, setUserList] = React.useState([]);
    const {data, loading} = useSelector((state) => state.userList);

    useEffect(() => {
        setUserList(data);
    }, [data]);

    const theme = useTheme();
    const {t} = useTranslation();
    let dispatch = useDispatch();
    let history = useHistory();
    ////Handle Page Change
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        const page = pageNumber;
        dispatch(getUserList({perPage, page}));
    };

    React.useEffect(() => {
        dispatch(getUserList({perPage, page}));
    }, [dispatch]);

    ////Handle Search
    React.useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            const res = await Http(`user/customerIndex?search=${searchTerm}`, {
                method: "get",
            });
            if (res.status === 200) {
                setUserList(res?.data?.data);
            }
        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    let dir = t("direction") === "rtl";

    const border = theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";

    return (<>
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(128, 5, 216, 0.9)",
                padding: "18px 10px",
                flexWrap: "wrap",
                backdropFilter: "blur(5px)",
            }}
            style={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
        >
            <Typography sx={{color: "#fff"}}>{t("Member")}</Typography>
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
            </Box>
        </Box>
        <Box>
            {UserList?.data?.length === 0 ? (<Box
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
                <SentimentVeryDissatisfiedIcon sx={{margin: "0 5px"}}/>
                {t("User_Not_Found")}
            </Box>) : (<Paper elevation={2}>
                {UserList?.data?.data.map((row, i) => (<Box
                    key={i}
                    sx={{
                        padding: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                                paddingBottom: "6px",
                            }}
                        >
                            <Box>
                                <img style={{margin: "0 7px"}} src={row?.avatar} alt={''}/>
                            </Box>
                            <Link to={`/vacations/${row?.id}`}>
                                <Box>
                                    <Box sx={{display: "inline-flex"}}>
                                        <Typography component={"p"}>
                                            {row?.first_name}
                                        </Typography>
                                        <Typography sx={{margin: "0 10px"}} component={"p"}>
                                            {row?.last_name}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        sx={{fontSize: 13, display: "block", marginTop: 1}}
                                        component={"span"}
                                    >
                                        {row?.email}
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                        {row?.leave_requests > 0 && (
                            <Badge badgeContent={row?.leave_requests} color="primary">
                                <EventIcon color="action"/>
                            </Badge>)}
                    </Box>
                </Box>))}
                {UserList?.data?.total > 10 && (<PaginateCore>
                    <Pagination
                        activePage={page}
                        totalItemsCount={UserList?.data.total}
                        pageRangeDisplayed={10}
                        onChange={handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </PaginateCore>)}
            </Paper>)}
        </Box>
    </>);
};

export default VacationList;
