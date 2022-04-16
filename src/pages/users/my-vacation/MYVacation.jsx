import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserVacation} from "redux/features/users/vacation";
import {
    Container,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Paper,
    Box,
    Input,
    Button, Alert, Stack, Typography,
} from "@mui/material";
import {EventNoteOutlined} from '@mui/icons-material';
import {useTranslation} from "react-i18next";
import Pagination from "@mui/lab/Pagination";
import {Filter, NoData} from "components";
import MyVacationTableBody from "./MyVacationTableBody";
import {Http} from "helper/Http";
import {LoadingCore, PaginateCore} from "core";
import CreateLeaves from "./createLeaves";

const MYVacation = () => {
    const [page, setPage] = React.useState(1);
    const [vacationList, setVacationList] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [openModal, setOepnModal] = React.useState(false);

    const [myVacationClone, setMyVacationClone] = React.useState([])
    const {data, loading} = useSelector((state) => state.Vacation);
    const {data: user} = useSelector((state) => state.user);
    const perPage = 10;
    const firstRequest = React.useRef(false);

    const handleOpenModal = () => setOepnModal(true)

    const dispatch = useDispatch();
    const {t} = useTranslation();

    let dir = t("direction") === "rtl"

    React.useEffect(() => {
        setVacationList(data);
        setMyVacationClone(data);
    }, [data]);

    const handlePageChange = async (event, value) => {
        setPage(value);
        const page = value;
        const res = await Http(
            `user/logIndex/leave?perPage=${perPage}&page=${page}`,
            {
                method: "get",
            }
        );
        if (res.status === 200) {
            setVacationList(res?.data?.data);
        }
    };

    const handleSortChange = async (queryString) => {
        const res = await Http(`user/logIndex/leave?${queryString}`, {
            method: "get",
        });
        if (res.status === 200) {
            setVacationList(res?.data?.data);
        }
    };
    React.useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm !== "") {
                const res = await Http(`user/logIndex/leave?search=${searchTerm}`, {
                    method: "get",
                });
                if (res.status === 200) {
                    setVacationList(res?.data?.data);
                }
            } else {
                if (firstRequest.current) {
                    setVacationList(myVacationClone)
                } else {
                    firstRequest.current = true;
                }
            }
        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);


    React.useEffect(() => {
        dispatch(getUserVacation({perPage, page}));
    }, [dispatch]);


    return (
        <>
            {loading && <LoadingCore loading={loading}/>}
            <Container maxWidth={"xl"} sx={{margin: "30px auto"}}>

                <Alert severity="info" sx={{width: '100%', display: 'flex', alignItems: 'center'}}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        width: '100%',
                        margin: '0 10px'
                    }}>
                        <Typography>
                            {t('remainEarned')}
                            {user.data.earned_leave}
                        </Typography>
                        <Typography>
                            {t('remainSick')}
                            {user.data.sick_leave}
                        </Typography>
                    </Box>
                </Alert>

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
                    <Button oepnModal={openModal} setOepnModal={setOepnModal} onClick={handleOpenModal}
                            sx={{color: "#fff", "& > svg": {margin: "0 5px"}}} variant="outlined">
                        <EventNoteOutlined/>
                        {t("Submit_Leaves")}
                    </Button>
                    <Box>
                        <Input
                            sx={{
                                padding: "0 6px",
                                borderRadius: 2,
                                color: "#fff",
                            }}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type={"search"}
                            placeholder={t("search")}
                        />
                        <Filter
                            data={vacationList?.filters}
                            handleChange={handleSortChange}
                        />

                    </Box>
                </Box>

                {vacationList?.data?.data?.length > 0 ? (
                    <TableContainer sx={{border: "1px solid #eee"}} component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">{t("Type_Vacation")}</TableCell>
                                    <TableCell align="right">{t("inـhistory")}</TableCell>
                                    <TableCell align="right">{t("Perـhour")}</TableCell>
                                    <TableCell align="right">{t("Description")}</TableCell>
                                    <TableCell align="right">{t("File")}</TableCell>
                                    <TableCell align="right">{t("status")}</TableCell>
                                    <TableCell align="center">{t("comment")}</TableCell>
                                    <TableCell align="right">{t("Admin")}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <MyVacationTableBody data={vacationList?.data?.data}/>
                            </TableBody>
                        </Table>
                        {data?.data?.total > 10 && (
                            <PaginateCore>
                                <Pagination
                                    dir={dir ? "rtl" : "ltr"}
                                    page={page}
                                    onChange={handlePageChange}
                                    count={Math.ceil(
                                        vacationList?.data?.total / vacationList?.data?.per_page
                                    )}
                                    variant="outlined"
                                    color="primary"
                                    disabled={vacationList?.data.total < 11}
                                />
                            </PaginateCore>
                        )}
                    </TableContainer>
                ) : (
                    <NoData/>
                )}

            </Container>
            {openModal && <CreateLeaves openModal={openModal} setOpenModal={setOepnModal}/>}
        </>
    );
};

export default MYVacation;
