import React from "react";
import {gteRulesList} from "redux/features/customer-cnfig/rulesListSlice";
import {
    TableRow,
    TableCell,
    Box,
    Typography,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    Container,
    Button,
    Input,
    useTheme,
} from "@mui/material";
import {useTranslation} from "react-i18next";
import LoadingCore from "core/LoadingCore";
import {Http} from "helper/Http";
import {useDispatch, useSelector} from "react-redux";
import RulesListBody from "./RulesListBody";
import {PaginateCore} from "core";
import {Pagination} from "@mui/lab";
import {Add, SentimentVeryDissatisfied} from "@mui/icons-material";
import RulesModal from "../RulesModal";
import {NoData} from "../../../components";
import {CheckRole} from "../../../helper";

const GetRulesList = () => {
    const [page, setPage] = React.useState(1);
    const [rulesList, setRulesList] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [ruleClone, setRuleClone] = React.useState([]);

    const perPage = 10;
    const firstRequest = React.useRef(false);

    const {data, loading} = useSelector((state) => state.rulesList);
    const {data: user} = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const {t} = useTranslation();
    const theme = useTheme();
    React.useEffect(() => {
        dispatch(gteRulesList());
    }, [dispatch]);
    React.useEffect(() => {
        setRulesList(data);
        setRuleClone(data);
    }, [data]);

    const updateList = (data) => {
        setRulesList(data);
    };

    const handlePageChange = async (event, value) => {
        setPage(value);
        const page = value;
        const res = await Http(
            `customer/config/rule?page=${page}&perPage=${perPage}`,
            {
                method: "get",
            }
        );
        if (res.status === 200) {
            setRulesList(res?.data?.data);
        }
    };

    ////Handle Search
    React.useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm !== "") {
                const res = await Http(`customer/config/rule?search=${searchTerm}`, {
                    method: "get",
                });
                if (res.status === 200) {
                    setRulesList(res?.data?.data);
                }
            } else {
                if (firstRequest.current) {
                    setRulesList(ruleClone);
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


    return (
        <>
            {loading && <LoadingCore loading={loading}/>}
            <Box sx={{margin: "30px 0"}}>
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "rgba(128, 5, 216, 0.9)",
                            padding: "14px 10px",
                            backdropFilter: "blur(5px)",
                            flexWrap: "wrap",
                            gap: 2
                        }}
                        style={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
                    >
                        <Typography sx={{color: "#fff"}}>{t("ًRules")}</Typography>
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
                            {CheckRole({roles: user?.data?.type, page: 'rules', part: 'store'}) && (
                                <Button
                                    onClick={() => setOpenModal(true)}
                                    variant="outlined"
                                    sx={{color: "#fff", borderColor: "#fff", margin: "0 7px"}}
                                    color="secondary"
                                >
                                    <Add/>
                                    {t("Create_Rules")}
                                </Button>
                            )}
                        </Box>
                    </Box>
                    {rulesList?.data?.data?.length > 0 ? (
                        <TableContainer sx={{border: border}}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {t("Title")}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {t("Description")}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {t("Create_At")}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {t("Update_At")}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {t("Actions")}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <RulesListBody
                                        user={user}
                                        setRulesList={setRulesList}
                                        data={rulesList?.data?.data}
                                        updateList={updateList}
                                        mainData={rulesList}
                                    />
                                </TableBody>
                            </Table>
                            {rulesList?.data?.total > 10 && (
                                <PaginateCore>
                                    <Pagination
                                        dir={dir ? "rtl" : "ltr"}
                                        page={page}
                                        onChange={handlePageChange}
                                        count={Math.ceil(
                                            rulesList?.data?.total / rulesList?.data?.per_page
                                        )}
                                        variant="outlined"
                                        color="primary"
                                        disabled={rulesList?.data?.total < 11}
                                    />
                                </PaginateCore>
                            )}
                        </TableContainer>
                    ) : (
                        <NoData/>
                    )}

                </Container>
                <RulesModal openModal={openModal} setOpenModal={setOpenModal}/>
            </Box>
        </>
    );
};

export default GetRulesList;
