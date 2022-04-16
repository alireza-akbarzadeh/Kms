import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {
    Box, Button,
    Container,
    Input,
    Paper,
    Table, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme
} from "@mui/material";
import {getTeamsList} from "redux/features/project/Teams/getTeamList";
import {LoadingCore, PaginateCore} from "core";
import {Filter, NoData} from "components";
import Pagination from "@mui/material/Pagination";
import TeamTableBody from "./TeamTableBody";
import {Add} from "@mui/icons-material";
import AddTeamModal from "./AddTeamModal";
import {CheckRole} from "helper";


const TeamList = () => {
    const [openAddTeamModal, setOpenAddTeamModal] = useState(false);
    const [teams, setTeams] = useState([]);
    const [queryParams, setQueryParams] = useState({page: 1, perPage: 15, search: null, filters: null})
    const {data, loading} = useSelector((state => state.TeamsList));
    const {data: user} = useSelector((state => state.user));
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const theme = useTheme();

    useEffect(() => {
        dispatch(getTeamsList(queryParams))
    }, [dispatch, queryParams]);


    React.useEffect(() => {
        setTeams(data?.data);
    }, [data]);

    let dir = t("direction") === "rtl";
    const border = theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";


    const handleOpenAddTeamModal = () => {
        setOpenAddTeamModal(true)
    }


    const handleFilterChange = (queryString) => {
        setQueryParams({...queryParams, filters: queryString})
    }

    const handlePageChange = async (event, value) => {
        setQueryParams({...queryParams, page: value})
    };

    return (
        <>

            <Box marginTop={4}>
                <Container maxWidth={"lg"}>
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
                        {CheckRole({roles: user?.data?.type, page: 'projects', part: 'update'}) && (
                            <Button variant='contained'
                                    color={"secondary"}
                                    onClick={handleOpenAddTeamModal}
                            >
                                <Add/>
                            </Button>
                        )}
                        <Box>
                            <Input
                                onChange={(e) => setQueryParams({...queryParams, search: e.target.value})}
                                autoComplete="off"
                                sx={{
                                    padding: "0 6px",
                                    borderRadius: 2,
                                    color: "#fff",
                                }}
                                type={"search"}
                                placeholder={t("search")}
                            />
                            {teams?.filters?.length > 0 && (
                                <Filter
                                    data={teams?.filters}
                                    handleChange={handleFilterChange}
                                />
                            )}

                        </Box>
                    </Box>
                    {teams?.data?.data?.length > 0 ? (
                        <TableContainer sx={{border: border}} component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {t("Title")}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {t("Description")}
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            {t("status")}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TeamTableBody mainData={teams?.data?.data}/>
                            </Table>
                            {teams?.data?.total > 10 && (
                                <PaginateCore>
                                    <Pagination
                                        dir={dir ? "rtl" : "ltr"}
                                        page={queryParams.page}
                                        onChange={handlePageChange}
                                        count={Math.ceil(
                                            teams?.data?.total / teams?.data?.per_page
                                        )}
                                        variant="outlined"
                                        color="primary"
                                        disabled={teams?.data?.total < 11}
                                    />
                                </PaginateCore>
                            )}
                        </TableContainer>
                    ) : (
                        <NoData/>
                    )}
                    {openAddTeamModal &&
                        <AddTeamModal openModal={openAddTeamModal} setOpenModal={setOpenAddTeamModal}/>}
                </Container>
            </Box>
        </>
    );
};

export default TeamList;
