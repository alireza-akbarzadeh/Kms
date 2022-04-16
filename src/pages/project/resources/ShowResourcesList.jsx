import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LoadingCore, PaginateCore} from "core";
import {useTranslation} from "react-i18next";
import {CheckRole, Http} from "helper";
import {
    Box,
    Button,
    Container,
    Input,
    Pagination,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme
} from "@mui/material";
import ShowResourcesTableBody from "./ShowResourcesTableBody";
import {showResources} from "redux/features/project/Resources/showResourcesList";
import {Add} from "@mui/icons-material";
import StoreResources from "./StoreResources";
import {NoData} from "../../../components";


const SHowResourcesList = ({id}) => {
    const [page, setPage] = useState(1)
    const [resourceList, setResourcesList] = useState([])
    const [searchTerm, setSearchTerm] = React.useState("");
    const [resourceClone, setResourcetClone] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const perPage = 12;
    const {data, loading} = useSelector(state => state.showResourcesListSlice)
    const {data: user} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const theme = useTheme();
    let dir = t("direction") === "rtl";
    const border = theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";
    const firstRequest = React.useRef(false);


    useEffect(() => {
        setResourcesList(data)
        setResourcetClone(data)
    }, [data])
    useEffect(() => {
        dispatch(showResources(id))
    }, [dispatch])

    const handleStoreModal = () => setOpenModal((openModal) => !openModal)

    const handlePageChange = async (event, value) => {
        setPage(value);
        let page = value;
        const res = await Http(`project/doc/index/${id}?page=${page}&perPage=${perPage}`, {
            method: "get",
        });
        if (res.status === 200) {
            setResourcesList(res?.data?.data);
        }
    };
    ////Handle Search
    React.useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm !== "") {
                const res = await Http(`project/doc/index/${id}?search=${searchTerm}`, {
                    method: "get",
                });
                if (res.status === 200) {
                    setResourcesList(res?.data?.data);
                }
            } else {
                if (firstRequest.current) {
                    setResourcesList(resourceClone);
                } else {
                    firstRequest.current = true;
                }
            }
        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <>
            {loading && <LoadingCore loading={loading}/>}
            <Box sx={{marginTop: 2}}>
                <Container maxWidth="xl">
                    <Box
                        sx={{display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0"}}>
                        <Typography component={"h3"} variant='h4'>
                            {t("Resources")}
                        </Typography>
                        <Box>
                            <Input
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoComplete="off"
                                sx={{
                                    padding: "0 6px", borderRadius: 2, color: "#444", margin: "0 20px"
                                }}
                                type={"search"}
                                variant="contained"
                                placeholder={t("search")}
                            />
                            {CheckRole({
                                roles: user?.data?.type,
                                page: 'projects',
                                part: 'update'
                            }) && (
                                <Button onClick={handleStoreModal} variant={"contained"}>
                                    <Add/>
                                    {t("Submit_Sources")}
                                </Button>
                            )}
                        </Box>
                    </Box>
                    {resourceList?.data?.data?.length > 0 ? (
                        <TableContainer sx={{border: border}}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {t("Title")}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {t("Version")}
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            {t("status")}
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            {t("Actions")}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <ShowResourcesTableBody id={id} user={user} data={resourceList?.data?.data}/>
                            </Table>
                            {resourceList?.data?.total > 10 && (<PaginateCore>
                                <Pagination
                                    dir={dir ? "rtl" : "ltr"}
                                    page={page}
                                    onChange={handlePageChange}
                                    count={Math.ceil(resourceList?.data?.total / resourceList?.data?.per_page)}
                                    variant="outlined"
                                    color="primary"
                                    disabled={resourceList?.data?.total < 11}
                                />
                            </PaginateCore>)}
                        </TableContainer>
                    ) : (
                        <NoData/>
                    )}

                </Container>
            </Box>
            {openModal && <StoreResources id={id} openModal={openModal} setOpenModal={setOpenModal}/>}
        </>
    );
};
export default SHowResourcesList;
