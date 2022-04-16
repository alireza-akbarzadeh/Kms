import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import React, {useEffect, useRef, useState} from "react";
import {IndexContribute} from "redux/features/document/Contribute";
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Input,
    Stack,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Avatar, Filter, NoData} from "components";
import {ArrowLeft, Restore, Visibility, WorkspacePremium} from "@mui/icons-material";
import {Header} from "../Article/Article-Styled";
import {getDocStatus, Http} from "helper";
import ContributeRow from "./ContributeRow";
import {FirstLoadingCore, LoadingCore, PaginateCore} from "core";
import Pagination from "@mui/material/Pagination";
import EditStatusModal from "./EditStatusModal";
import ShowContributeModal from "./ShowContributeModal";
import {RestoreMainWiki} from "redux/features/document/Contribute/RestoreMainWiki";

const Contributes = () => {
    const [params, setParams] = useState({
        page: 1, perPage: 10, search: null, filters: 'sort=DESC'
    })
    const ref = useRef(false);
    const [openEditModal, setOpenEditModal] = useState(false)
    const [showData, setShowData] = useState(false)
    const {id} = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const {t} = useTranslation();
    let dir = t("direction") === "rtl";

    const {data: contributes, loading} = useSelector((state) => state.IndexContributeSlice)

    useEffect(() => {

        dispatch(IndexContribute({
            id: id,
            page: params.page,
            perPage: params.perPage,
            show: false,
            filters: params.filters,
            search: params.search
        }))
    }, [dispatch, id, params.page, params.perPage, params.filters])

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (params.search !== null) {
                dispatch(IndexContribute({
                    id: id,
                    page: params.page,
                    perPage: params.perPage,
                    show: false,
                    filters: params.filters,
                    search: params.search
                }))
            }
        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    }, [params.search]);

    const RestoreMainWikiFunc = () => {
        dispatch(RestoreMainWiki({id}))
            .then(res => {
                dispatch(IndexContribute({
                    id: id,
                    page: params.page,
                    perPage: params.perPage,
                    show: false,
                    filters: params.filters,
                    search: params.search
                }))
            })
    }

    const handleFilterChange = (queryString) => {
        let newFilter = {...params, filters: queryString};
        setParams(newFilter);
    };

    const handlePageChange = (event, value) => {
        let newPage = {...params, page: value}
        setParams(newPage)
    };

    useEffect(() => {
        if (loading && contributes?.data?.main?.length > 0) {
            ref.current = true
        }
    }, [loading, contributes])


    const getMainContent = (t, history, data, id) => {
        return <Box sx={{
            display: 'flex', margin: '30px', justifyContent: 'space-between', flexWrap: "wrap"
        }}>

            <Header>
                <Box sx={{display: "inline-flex", alignItems: "center", gap: 2, marginBottom: '10px'}}>
                    <Visibility sx={{cursor: 'pointer'}} color={'primary'} onClick={() => setShowData(data)}/>
                    <Typography fontWeight={"bold"} component={"h3"} variant={"h5"}>
                        {data?.title}
                    </Typography>
                    <Chip label={<Typography>
                        {data?.user?.first_name + ' ' + data?.user?.last_name}
                    </Typography>}
                          avatar={<Avatar address={data?.user?.avatar}/>}
                          sx={{padding: '0 5px'}}
                          variant={"outlined"}/>
                </Box>
                <Box sx={{display: 'inline-flex'}} gap={2}>
                    <Button variant={'text'} color={'primary'} onClick={RestoreMainWikiFunc}>
                        <Restore sx={{margin: '0 5px'}}/>
                        {t('RestoreMainWiki')}
                    </Button>
                    <Typography fontSize='15px' sx={{margin: '20px'}}>
                        {getDocStatus(data?.status_type, data?.status, false)}
                    </Typography>
                    <Button variant={'text'} color={'info'} onClick={() => history.push(`/document/wiki/${id}`)}>
                        {t('Back')}
                        <ArrowLeft/>
                    </Button>
                </Box>
            </Header>
            <Box sx={{display: "inline-flex", gap: 1, mt: 1}}>
                <Typography>
                    {t("Description")}
                </Typography>
                :<Typography fontWeight={400} fontSize={14}
                             lineHeight={1.9}>{data?.description}</Typography>
            </Box>
        </Box>
    }

    return (!ref.current && loading) ? <FirstLoadingCore loading={loading}/> : (
        <>
            {loading && <LoadingCore loading={loading}/>}
            <Container maxWidth={'xl'} sx={{marginBottom: '10px'}}>
                <Stack direction={'column'}>
                    {getMainContent(t, history, contributes?.data?.main, id)}
                    <Divider sx={{marginBottom: '30px'}}/>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            background: "rgba(128, 5, 216, 0.9)",
                            padding: "14px 10px",
                            backdropFilter: "blur(5px)",
                        }}
                        style={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
                    >
                        <Box>
                            <Input
                                onChange={(e) => setParams({...params, search: e.target.value})}
                                autoComplete="off"
                                sx={{
                                    padding: "0 6px", borderRadius: 2, color: "#fff",
                                }}
                                type={"search"}
                                placeholder={t("search")}
                            />
                            {contributes?.filters?.length > 0 && (<Filter
                                data={contributes?.filters}
                                handleChange={handleFilterChange}
                            />)}
                        </Box>
                    </Box>
                    {contributes?.data?.wiki?.data?.length > 0 ? (<TableContainer>
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
                                        {t("Author")}
                                    </TableCell>
                                    <TableCell align={"center"}>{t("Date")}</TableCell>
                                    <TableCell align={"center"}>{t("status")}</TableCell>
                                    <TableCell align={"center"}>{t("Actions")}</TableCell>
                                </TableRow>
                            </TableHead>
                            {contributes?.data?.wiki?.data?.map((item) => (<ContributeRow
                                data={item}
                                dir={dir}
                                setOpenEditModal={setOpenEditModal}
                                setShowData={setShowData}
                            />))}
                        </Table>
                        {contributes?.data?.wiki?.total > 10 && (<PaginateCore>
                            <Pagination
                                sx={{margin: '10px 0'}}
                                dir={dir ? "rtl" : "ltr"}
                                page={params.page}
                                onChange={handlePageChange}
                                count={Math.ceil(contributes?.data?.wiki?.total / contributes?.data?.wiki?.per_page)}
                                variant="outlined"
                                color="primary"
                                disabled={contributes?.data?.wiki?.total < 11}
                            />
                        </PaginateCore>)}
                    </TableContainer>) : (<NoData/>)}
                </Stack>
                {openEditModal &&
                    <EditStatusModal params={params} documentId={id} openModal={openEditModal}
                                     setOpenModal={setOpenEditModal}
                                     t={t}/>}
                {showData && <ShowContributeModal openModal={showData} setOpenModal={setShowData} t={t}
                                                  dir={dir}/>}
            </Container>
        </>
    )
}

export default Contributes

