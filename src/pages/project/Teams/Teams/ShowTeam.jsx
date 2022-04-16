import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {
    Box, Button, Chip, Container, Grid, Input, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography,
} from "@mui/material";
import {Avatar, NoData} from "components";
import ShowTeamUsers from "./ShowTeamUsers";
import {Add, Edit, Search} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {LoadingCore} from "core";
import {getTeamRoles} from "redux/features/project/TeamRoles/getTeamRolsSlice";
import {CheckRole, Http} from "helper";
import AddTeamMember from "./AddTeamMember";
import {getAllUserList} from "redux/features/drive/getAllUserList";
import {useLocation, useParams} from "react-router-dom";
import {showTeams} from "redux/features/project/Teams/showTeamSlice";
import EditTeamModal from "./EditTeamModal";

const ShowTeams = ({teamData, showHeader = true}) => {
    const [showTeamData, setShowTeamData] = useState([]);
    const [openEditModal, setOpenEditModal] = useState(false);
    const {t} = useTranslation();
    let dir = t("direction") === "rtl";
    const [searchTerm, setSearchTerm] = React.useState("");
    const dispatch = useDispatch();
    const {data: team, loading: teamLoading} = useSelector((state) => state.showTeams);
    const {data, loading} = useSelector((state) => state.getTeamRoles);
    const {data: users} = useSelector((state) => state.AllUserList);
    const {data: user} = useSelector((state) => state.user);
    const location = useLocation();
    const [maxHeight, setMaxHeight] = useState("200px");

    let {id} = useParams();
    useEffect(() => {
        if (teamData !== undefined) {
            setShowTeamData(teamData);
        } else if (location?.state?.teamData !== undefined) {
            setMaxHeight("500px");
            const newData = location.state.teamData;
            setShowTeamData(newData);
        } else {
            setMaxHeight("500px");
            dispatch(showTeams(id));
        }
    }, [teamData, location?.state?.teamData]);

    useEffect(() => {
        if (team !== null) {
            setShowTeamData(team);
        }
    }, [team]);

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch(getTeamRoles());
    }, []);

    useEffect(() => {
        dispatch(getAllUserList({isPaginate: false}));
    }, []);

    React.useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm !== "") {
                const res = await Http(`team/crud/${showTeamData?.id}?search=${searchTerm}`, {
                    method: "get",
                });
                if (res.status === 200) {
                    setShowTeamData(res?.data?.data);
                }
            }
        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleOpenEditModal = () => {
        setOpenEditModal(true);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    if (loading || teamLoading) {
        return <LoadingCore loading={loading}/>;
    }

    return (<Container
        maxWidth={"xl"}
        sx={showHeader && {
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${showTeamData?.header})`,
            height: 250,
            width: "100%",
            backgroundPosition: "top center",
            position: "relative",
        }}
    >
        <Box
            sx={{
                maxHeight: "200px", display: "flex", flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    display: "flex", margin: "20px", justifyContent: "space-between",
                }}
            >
                <Box sx={{display: "flex", justifyContent: "column"}}>
                    <Box sx={{display: "flex"}}>
                        <Avatar size="md" address={showTeamData?.avatar}/>
                        <Typography fontSize="30px"
                                    sx={showHeader ? {color: "#fff", margin: "20px"} : {margin: "20px"}}>
                            {showTeamData?.title}
                        </Typography>
                    </Box>
                    <Box>
                        <Chip
                            label={showTeamData?.active ? t("Active") : "DeActive"}
                            sx={showTeamData?.active ? {
                                background: "#1ce087",
                                color: "#fff",
                                padding: 1
                            } : {background: "#ce1440", color: "#fff", padding: 1}}
                        />
                    </Box>
                </Box>
                <Box sx={{marginTop: "10px"}}>
                    {CheckRole({
                        roles: user?.data?.type,
                        page: 'projects',
                        part: 'update'
                    }) && (
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={handleOpenEditModal}
                        >
                            <Edit/>
                            {t("Edit")}
                        </Button>
                    )}

                </Box>
            </Box>
            <Box sx={{margin: "0 20px 20px 0"}}>
                <Typography
                    sx={showHeader ? {color: "#fff", maxWidth: 900, lineHeight: 1.5} : {
                        maxWidth: 900, lineHeight: 1.5
                    }}
                    fontSize="14px"
                >
                    {showTeamData?.description}
                </Typography>
            </Box>
        </Box>
        <Box
            sx={{
                margin: "10px 0", display: "flex", alignItems: "space-between", justifyContent: "flex-end",
            }}
        >
            <Grid sx={{textAlign: "center"}}>
                <Input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="off"
                    sx={{
                        padding: "0 6px", borderRadius: 2, color: "#fff"
                    }}
                    type={"search"}
                    variant="contained"
                    placeholder={t("search")}
                />
                <Search />
                {CheckRole({
                    roles: user?.data?.type,
                    page: 'projects',
                    part: 'update'
                }) && (
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                            borderRadius: "20px", margin: "0 5px",
                        }}
                        onClick={handleOpenModal}
                    >

                        <Add/>
                        {t("addUser")}
                    </Button>
                )}
            </Grid>
        </Box>
        {showTeamData?.users?.length > 0 ? (<TableContainer
            sx={{
                border: "none", boxShadow: "none", margin: "10px 0", maxHeight: maxHeight,
            }}
            component={Paper}
        >
            <Table sx={{minWidth: 650}} aria-label="simple table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align={dir ? "right" : "left"}>
                            {t("UserName")}
                        </TableCell>
                        <TableCell align={dir ? "right" : "left"}>
                            {t("Email")}
                        </TableCell>
                        <TableCell align={"center"}>{t("Roles")}</TableCell>
                        <TableCell align={"center"}>{t("Actions")}</TableCell>
                    </TableRow>
                </TableHead>
                <ShowTeamUsers
                    user={user}
                    data={showTeamData?.users}
                    id={teamData?.id}
                    roles={data?.data?.data}
                />
            </Table>
        </TableContainer>) : (<NoData/>)}
        {openModal && (<AddTeamMember
            id={showTeamData?.id}
            openModal={openModal}
            setOpenModal={setOpenModal}
            roles={data?.data?.data}
            users={users?.data?.data}
        />)}
        {openEditModal && (<EditTeamModal
            openModal={openEditModal}
            setOpenModal={setOpenEditModal}
            data={showTeamData}
        />)}
    </Container>);
};

export default ShowTeams;
