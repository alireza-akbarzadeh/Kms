import React, {useEffect, useRef, useState} from 'react'
import {FirstLoadingCore, LoadingCore} from 'core';
import {useDispatch, useSelector} from 'react-redux'
import {getProjectList} from 'redux/features/project/ProjectListSlice';
import BadgeAvatars from 'components/avatar';
import {Box, Button, Chip, Container, Divider, Grid, Input, Pagination, Paper, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {PaginateCore} from 'core';
import {Add} from '@mui/icons-material';
import {Http} from 'helper';
import {Link} from 'react-router-dom';
import StoreProject from './StoreProject';
import {Filter, NoData} from "components";


const GetProjectLIst = () => {
    const [openModal, setOpenModal] = useState(false)
    const [page, setPage] = useState(1)
    const [projectList, setProjectList] = useState([])
    const [searchTerm, setSearchTerm] = React.useState("");
    const [projectClone, setProjectClone] = useState([])
    const perPage = 12;
    const ref = useRef(false);
    const {data, loading} = useSelector(state => state.projectList)
    const dispatch = useDispatch();
    const {t} = useTranslation();
    let dir = t("direction") === "rtl";

    const handleOpenModal = () => setOpenModal(true)
    const firstRequest = React.useRef(false);


    useEffect(() => {
        setProjectList(data)
        setProjectClone(data)
    }, [data])
    useEffect(() => {
        dispatch(getProjectList({perPage, page}))
    }, [dispatch])

    const handlePageChange = async (event, value) => {
        setPage(value);
        let page = value;
        const res = await Http(
            `project?page=${page}&perPage=${perPage}`,
            {
                method: "get",
            }
        );
        if (res.status === 200) {
            setProjectList(res?.data?.data);
        }
    };

    ////Handle Search
    React.useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm !== "") {
                const res = await Http(`project?search=${searchTerm}`, {
                    method: "get",
                });
                if (res.status === 200) {
                    setProjectList(res?.data?.data);
                }
            } else {
                if (firstRequest.current) {
                    setProjectList(projectClone);
                } else {
                    firstRequest.current = true;
                }
            }
        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleFilterChange = async (queryString) => {
        const res = await Http(`project?${queryString}`, {
            method: "get",
        });
        if (res.status === 200) {
            setProjectList(res?.data?.data);
        }
    };

    const project = projectList?.data?.data;


    useEffect(() => {
        if (loading && project?.length > 0){
            ref.current = true
        }
    }, [loading, project])


    return (!ref.current && loading) ? <FirstLoadingCore loading={loading}/> : (
        <>
            {loading && <LoadingCore loading={loading}/>}
            <Box sx={{marginTop: 2}}>
                <Container maxWidth="xl">
                    <Box
                        sx={{display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0"}}>
                        <Typography component={"h3"} variant='h4'>
                            {t("project")}
                        </Typography>
                        <Box>
                            <Input
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoComplete="off"
                                sx={{
                                    padding: "0 6px",
                                    borderRadius: 2,
                                    color: "#444",
                                    margin: "0 20px"
                                }}
                                type={"search"}
                                variant="contained"
                                placeholder={t("search")}
                            />
                            <Filter
                                data={projectList?.filters}
                                handleChange={handleFilterChange}
                            />
                            <Button onClick={handleOpenModal} variant='outlined'>
                                <Add/>
                                {t("Submnit_project")}
                            </Button>
                        </Box>
                    </Box>
                    <Divider sx={{marginBottom: "20px"}}/>
                    {project?.length !== undefined ? (
                        <>
                            <Grid container spacing={4}>
                                {project?.map((item) => (
                                    <Grid key={item.id} item xs={12} sm={6}  lg={4}>
                                        <Paper sx={{padding: 2, width: "100%", height: 150, cursor: "pointer"}}
                                               elevation={3}>
                                            <Link to={`/project/${item?.id}`}>
                                                <Box sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center"
                                                }}>
                                                    <Box sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        gap: 2
                                                    }}>
                                                        <BadgeAvatars size={"sm"} address={item?.avatar}/>
                                                        <Typography fontSize={14}>
                                                            {item.title}
                                                        </Typography>
                                                    </Box>
                                                    <Chip label={item.team.active ? t("Active") : "DeActive"}
                                                          sx={item.team.active ? {
                                                              background: "#1ce087",
                                                              color: "#fff",
                                                              padding: 1
                                                          } : {background: "#ce1440", color: "#fff", padding: 1}}/>
                                                </Box>
                                                <Divider sx={{marginTop: 3}}/>
                                                <Typography fontSize={15} fontWeight={600} component={"p"} marginTop={2}
                                                            align='justify'>
                                                    {item?.description?.substring(1, 35)}
                                                </Typography>
                                            </Link>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                            <Box sx={{marginTop: 5}}>
                                {projectList?.data?.total > 10 && (
                                    <PaginateCore>
                                        <Pagination
                                            dir={dir ? "rtl" : "ltr"}
                                            page={page}
                                            onChange={handlePageChange}
                                            count={Math.ceil(
                                                projectList?.data?.total / projectList?.data?.per_page
                                            )}
                                            variant="outlined"
                                            color="primary"
                                            disabled={projectList?.data?.total < 11}
                                        />
                                    </PaginateCore>
                                )}
                            </Box>
                        </>
                    ) : (
                        <NoData/>
                    )}
                </Container>
            </Box>
            {openModal && <StoreProject openModal={openModal} setOpenModal={setOpenModal}/>}
        </>
    )
}

export default GetProjectLIst
