import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LoadingCore, PaginateCore} from "core";
import {getTeamRoles} from "redux/features/project/TeamRoles/getTeamRolsSlice";
import {CheckRole, Http} from "helper";
import {useTranslation} from "react-i18next";
import {
    Box,
    Button,
    Container,
    Input,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import TableListBody from "./TableListBody";
import {Add} from '@mui/icons-material';
import CreateTeamRole from './CreateTeamRole';
import {Filter, NoData} from 'components';
import _ from "lodash";

const TeamRoleList = () => {
    const [page, setPage] = useState(1);
    const [openStoreTeam, setOpenStoreTeam] = useState(false);
    const [teamList, setTeamList] = useState([]);
    const [teamClone, setTeamClone] = useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const {data: user} = useSelector((state) => state.user);
    const {data, loading} = useSelector((state => state.getTeamRoles));

    const handleStoreTeam = () => {
        setOpenStoreTeam(true)
    };

    const perPage = 10;
    const firstRequest = React.useRef(false);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const theme = useTheme();

    React.useEffect(() => {
        setTeamList(data);
        setTeamClone(data);
    }, [data]);

    useEffect(() => {
        dispatch(getTeamRoles())
    }, []);


    /// handlePageChange
    const handlePageChange = async (event, value) => {
        setPage(value);
        let page = value;
        const res = await Http(
            `teamRole?page=${page}&perPage=${perPage}`,
            {
                method: "get",
            }
        );
        if (res.status === 200) {
            setTeamList(res?.data?.data);
        }
    };
    ////Handle Search
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm !== "") {
                const res = await Http(`teamRole?search=${searchTerm}`, {
                    method: "get",
                });
                if (res.status === 200) {
                    setTeamList(res?.data?.data);
                }
            } else {
                if (firstRequest.current) {
                    setTeamList(teamClone)
                } else {
                    firstRequest.current = true;
                }

            }
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleFilterChange = async (queryString) => {
        const res = await Http(`teamRole?${queryString}`, {
            method: "get",
        });
        if (res.status === 200) {
            setTeamList(res?.data?.data);
        }
    };


    let dir = t("direction") === "rtl";
    const border =
        theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";


    if (loading) {
        return <LoadingCore loading={loading}/>
    }

    const updateData = (newData) => {
        let newStateData = _.cloneDeep(teamList)
        newStateData.data.data = newData
        setTeamList(newStateData)
    }

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
                            <Button variant='contained' color={"secondary"} onClick={handleStoreTeam}>
                                <Add/>
                            </Button>
                        )}
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
                            {teamList?.filters?.length > 0 && (
                                <Filter
                                    data={teamList?.filters}
                                    handleChange={handleFilterChange}
                                />
                            )}

                        </Box>
                    </Box>
                    {teamList?.data?.data?.length > 0 ? (
                        <TableContainer sx={{border: border}} component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {t("Title")}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {t("status")}
                                        </TableCell>
                                        {CheckRole({roles: user?.data?.type, page: 'projects', part: 'update'}) && (
                                            <TableCell align={'center'}>
                                                {t("Edit")}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableListBody user={user} updateData={updateData} data={teamList?.data?.data}/>
                            </Table>
                            {teamList?.data?.total > 10 && (
                                <PaginateCore>
                                    <Pagination
                                        dir={dir ? "rtl" : "ltr"}
                                        page={page}
                                        onChange={handlePageChange}
                                        count={Math.ceil(
                                            teamList?.data?.total / teamList?.data?.per_page
                                        )}
                                        variant="outlined"
                                        color="primary"
                                        disabled={teamList?.data?.total < 11}
                                    />
                                </PaginateCore>
                            )}
                        </TableContainer>
                    ) : (
                        <NoData/>
                    )}
                </Container>
            </Box>
            {openStoreTeam && <CreateTeamRole openModal={openStoreTeam} setOpenModal={setOpenStoreTeam}/>}
        </>
    );
};
export default TeamRoleList;
