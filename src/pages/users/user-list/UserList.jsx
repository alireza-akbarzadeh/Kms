import * as React from "react";
import {LoadingCore} from "core";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getUserList} from "redux/features/users/getUserSlice";
import {PaginateCore} from "core";
import {Filter} from "components";
import {
    Container, Box, Input, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper,
} from "@mui/material";
import Pagination from "@mui/lab/Pagination";
import {Http} from "helper/Http";
import {useTheme} from "@mui/material/styles";
import {UpdateUserRoles} from "containers";
import {useEffect} from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import UserTableBody from "./UserTableBody";
import {CheckRole} from "../../../Hook";

const UserList = () => {
    const [page, setPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [openModal, setOpenModal] = React.useState({
        modal: false, id: null,
    });
    const firstRequest = React.useRef(false);
    const perPage = 10;


    const [UserList, setUserList] = React.useState([]);
    const [userClone, setUserClone] = React.useState([]);


    const {data: user} = useSelector((state) => state.user);
    const {data, loading} = useSelector((state) => state.userList);
    const {data: UserData} = useSelector((state) => state.updateUserRoles);

    useEffect(() => {
        setUserList(data?.data)
        setUserClone(data?.data);
    }, [data]);

    const theme = useTheme();
    const {t} = useTranslation();
    let dispatch = useDispatch();

    ////Handle Page Change
    const handlePageChange = async (event, value) => {
        setPage(value);
        const page = value;
        const res = await Http(`user/customerIndex?page=${page}&perPage=${perPage}`, {
            method: "get",
        });
        if (res.status === 200) {
            setUserList(res?.data?.data);
        }
    };
    const handleFilterChange = async (queryString) => {
        const res = await Http(`user/customerIndex?${queryString}`, {
            method: "get",
        });
        if (res.status === 200) {
            setUserList(res?.data?.data);
        }
    };


    React.useEffect(() => {
        dispatch(getUserList({perPage, page}));
    }, [dispatch]);

    ////Handle Search
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm !== "") {
                const res = await Http(`user/customerIndex?search=${searchTerm}`, {
                    method: "get",
                });
                if (res.status === 200) {
                    setUserList(res?.data?.data);
                }
            } else {
                if (firstRequest.current) {
                    setUserList(userClone)
                } else {
                    firstRequest.current = true;
                }
            }

        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    let dir = t("direction") === "rtl";
    const border = theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";
    const HandleUpdateUser = (row) => {
        setOpenModal({modal: true, id: row?.id, data: row});
    };

    if (loading) {
        return <LoadingCore loading={loading}/>;
    }


    const updateList = (data) => {
        setUserList(data)
    }

    return (<>
        <Container maxWidth={"xl"} sx={{margin: "30px auto"}}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "rgba(128, 5, 216, 0.9)",
                    padding: "14px 10px",
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
                    <Filter
                        data={UserList?.filters}
                        handleChange={handleFilterChange}
                    />
                </Box>
            </Box>
            <TableContainer sx={{border: border}} component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={dir ? "right" : "left"}>
                                {t("user")}
                            </TableCell>
                            <TableCell align={dir ? "right" : "left"}>
                                {t("UserName")}
                            </TableCell>{" "}
                            <TableCell align={dir ? "right" : "left"}>
                                {t("Email")}
                            </TableCell>
                            <TableCell align={dir ? "right" : "left"}>
                                {t("Mobile")}
                            </TableCell>
                            <TableCell align={dir ? "right" : "left"}>
                                {t("Roles")}
                            </TableCell>
                            <TableCell align={dir ? "right" : "left"}>
                                {t("EDIT_ROLES")}
                            </TableCell>
                        </TableRow>
                    </TableHead>
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
                        کاربر وجود ندارد
                    </Box>) : (<TableBody>
                        <UserTableBody
                            user={user}
                            data={UserList?.data?.data}
                            HandleUpdateUser={HandleUpdateUser}
                        />
                    </TableBody>)}
                </Table>
                {UserList?.data?.total > 10 && (<PaginateCore>
                    <Pagination
                        page={page}
                        dir={dir ? "rtl" : "ltr"}
                        onChange={handlePageChange}
                        count={Math.ceil(UserList?.data?.total / UserList?.data?.per_page)}
                        variant="outlined"
                        color="primary"
                        disabled={UserList?.data?.total < 11}
                    />
                </PaginateCore>)}
            </TableContainer>
        </Container>
        <UpdateUserRoles
            mainData={UserList}
            setOpenModal={setOpenModal}
            openModal={openModal}
            updateHandler={updateList}

        />
    </>);
};

export default UserList;
