import React, {useCallback, useEffect, useState} from "react";
import {
    Box, Container, Stack, Divider, Typography, Skeleton, useMediaQuery, IconButton, Alert, useTheme
} from "@mui/material";
import {useTranslation} from "react-i18next"
import {FolderAction} from "./DocumentStyles";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {LoadingCore, PaginateCore} from "core";
import {useTimer} from "Hook";
import Pagination from "@mui/material/Pagination";
import {Http} from "helper";
import AddDocumentModal from "./AddDocumentModal";
import AddCategoryModal from "./Category/AddCategoryModal";
import {Archive, ArchiveOutlined, ArrowLeft, Edit} from "@mui/icons-material";
import backFolderLight from 'assets/folder/back-light.png'
import plusFolderLight from 'assets/folder/plus-light.png'
import emptyFolderLight from 'assets/folder/empty-light.png'
import fillFolderLight from 'assets/folder/fill-light.png'
import noCategory from "assets/noCategory.png";
import backFolderDark from 'assets/folder/back-dark.png'
import plusFolderDark from 'assets/folder/plus-dark.png'
import emptyFolderDark from 'assets/folder/empty-dark.png'
import fillFolderDark from 'assets/folder/fill-dark.png'
import NoData from "components/NoData";
import EditCategoryModal from "./Category/EditCategoryModal";
import ArchiveCategoryModal from "./Category/ArchiveCategoryModal";

const LazyImage = () => {
    return (<Box sx={{width: 80}}>
        <Skeleton/>
        <Skeleton animation="wave"/>
        <Skeleton animation={false}/>
    </Box>)
}


const DocumentList = ({id, data, loading, handleFolderChange}) => {

    const [page, setPage] = useState(1);
    const [modalData, setModalData] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openArchiveModal, setOpenArchiveModal] = useState(false);
    const [folderList, setFolderList] = useState([]);
    const mobileMatches = useMediaQuery('(max-width:600px)');
    const dispatch = useDispatch();
    const history = useHistory()
    const {t} = useTranslation();
    const perPage = 10;
    let timer = useTimer({time: 2000})
    const dir = t("direction") === "rtl"
    const theme = useTheme()
    let mode = theme.palette.mode === 'dark'

    React.useEffect(() => {
        setFolderList(data);
    }, [data]);

    const handlePageChange = async (event, value) => {
        setPage(value);
        let page = value;
        const res = await Http(`document/category/deleted/index/${1}?page=${page}&perPage=${perPage}`, {
            method: "get",
        });
        if (res.status === 200) {
            setFolderList(res?.data?.data);
        }
    };

    const handleChangeLocation = (id, type) => {
        history.push(`/document/archive/${type}/${id}`)
    }

    const ImgStyle = {
        width: "60px", height: "50px",
    }
    const BoxStyle = {
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: mobileMatches ? "flex-start" : "flex-end",
        alignItems: 'start',
        gap: 1,
        width: mobileMatches ? "100%" : "auto",
        position: "relative",
        "&:not(:last-child)": {
            borderBottom: mobileMatches ? "1px solid rgba(0,0,0,0.12)" : "none",
        },
        paddingBottom: 1.5,
    }


    const folder = (item, type = 'id') => {
        if (type === 'id') {
            let folderType = folderList?.parent?.document_category_id === null ? 'main' : item?.parent?.type;
            return <Box sx={BoxStyle} key={item.id}>
                <Box sx={{display: "inline-flex", alignItems: "center", margin: '0 10px'}}>
                    <Stack sx={{flexWrap: "wrap"}} spacing={2}>
                        <Edit onClick={() => editCategory(item)} sx={{cursor: 'pointer'}}/>
                        <ArchiveOutlined onClick={() => archiveCategory(item)} sx={{cursor: 'pointer'}}/>
                    </Stack>
                    <FolderAction isMobile={mobileMatches}
                                  onClick={() => handleFolderChange(item.id, folderList?.parent?.document_category_id, folderType)}
                                  key={item}
                                  variant={"secondary"}>

                        {!timer ? <LazyImage/> : (<img
                            src={item?.docCount > 0 ? (mode ? fillFolderDark : fillFolderLight) : (mode ? emptyFolderDark : emptyFolderLight)}
                            alt={"Folder"}/>)}
                    </FolderAction>
                    <Box>
                        <Typography fontSize={!mobileMatches ? 14 : 12}>{item.title}</Typography>
                        {mobileMatches && <Typography mt={1}
                                                      fontSize={!mobileMatches ? 14 : 12}>{item.created_at}</Typography>}
                    </Box>
                    {mobileMatches && <Divider flexItem sx={{mt: 1}}/>}
                </Box>
                {mobileMatches && (<Box sx={dir ? {
                    position: "absolute", left: 0, top: "50%", transform: "translate(-37%,-50%)"
                } : {position: "absolute", right: 0, top: "50%", transform: "translate(-50  %,-50%)"}}>
                    <IconButton>
                        <ArrowLeft/>
                    </IconButton>
                </Box>)}
            </Box>
        } else {
            let folderType = folderList?.parent?.type;
            return <Box sx={BoxStyle} key={'back'}>
                <Box sx={{display: "inline-flex", alignItems: "center"}}>
                    <FolderAction isMobile={mobileMatches}
                                  onClick={() => handleFolderChange(folderList?.parent?.document_category_id, folderList?.parent?.document_category_id, folderType)}
                                  key={'back'}
                                  variant={"secondary"}>
                        {!timer ? <LazyImage/> : (<img src={mode ? backFolderDark : backFolderLight} alt={"Folder"}/>)}
                    </FolderAction>
                    <Box>
                        <Typography fontSize={!mobileMatches ? 14 : 12}>{t('Back')}</Typography>
                    </Box>
                </Box>
                {mobileMatches && (<Box sx={dir ? {
                    position: "absolute", left: 0, top: "50%", transform: "translate(-37%,-50%)"
                } : {position: "absolute", right: 0, top: "50%", transform: "translate(-50  %,-50%)"}}>
                    <IconButton>
                        <ArrowLeft/>
                    </IconButton>
                </Box>)}
            </Box>
        }
    }

    const addDirectory = () => {
        let body = {
            type: 'main'
        }
        if (data?.parent?.id !== undefined) {
            body = {type: 'sub', document_category_id: data?.parent?.id}
        }
        setModalData(body)
        setOpenModal(true)
    }

    const editCategory = (item) => {
        setModalData(item)
        setOpenEditModal(true)
    }

    const archiveCategory = (item) => {
        setModalData(item)
        setOpenArchiveModal(true)
    }


    const addDirectoryJSX = () => {
        return <Box sx={BoxStyle} key={'add'}>
            <Box sx={{display: "inline-flex", alignItems: "center"}}>
                <FolderAction isMobile={mobileMatches} key={'add'}
                              onClick={addDirectory}
                              variant={"secondary"}>
                    {!timer ? <LazyImage/> : (<img src={mode ? plusFolderDark : plusFolderLight} alt={"Folder"}/>)}
                </FolderAction>
                <Box>
                    <Typography fontSize={!mobileMatches ? 14 : 12}>{t('addCategory')}</Typography>
                </Box>
                {mobileMatches && <Divider flexItem sx={{mt: 1}}/>}
            </Box>
            {mobileMatches && (<Box sx={dir ? {
                position: "absolute", left: 0, top: "50%", transform: "translate(-37%,-50%)"
            } : {position: "absolute", right: 0, top: "50%", transform: "translate(-50  %,-50%)"}}>
                <IconButton>
                    <ArrowLeft/>
                </IconButton>
            </Box>)}
        </Box>
    }

    return (<>
        {loading && <LoadingCore loading={loading}/>}
        <Box sx={{position: "relative", width: "100%", height: "100%"}}>
            <Container maxWidth="xl">
                <Box sx={{mt: mobileMatches ? 0.5 : 4, height: "100%"}}>
                    {id !== null && folder(null, 'back')}

                    {(!mobileMatches === true && data?.parent?.id !== undefined) && (<Box sx={{width: '10%'}}>
                        <Divider flexItem sx={{mt: 1}}/>
                    </Box>)}
                    {mobileMatches && addDirectoryJSX()}
                    {/*start directories*/}
                    <Stack flexWrap={"wrap"} sx={{width: "100%"}} direction={!mobileMatches ? "row" : "column"}
                           gap={!mobileMatches ? 3 : 1}
                           alignItems={!mobileMatches ? "center" : "start"}>
                        {folderList?.directories?.map((item) => (folder(item, 'id')))}

                        {!mobileMatches && addDirectoryJSX()}
                    </Stack>
                    {!mobileMatches && <Divider sx={{mt: 2}}/>}
                    {/*end directories*/}

                    {/*start documents*/}
                    {folderList?.documents?.data?.length > 0 ? (
                        <Stack className={"border-t"} sx={{width: "100%", flexWrap: "wrap"}}
                               direction={!mobileMatches ? "row" : "column"}
                               gap={!mobileMatches ? 3 : 1}
                               alignItems={!mobileMatches ? "center" : "start"}>
                            {folderList?.documents?.data?.map((item) => (<>
                                <Box onClick={() => handleChangeLocation(item.id, item.type)} sx={BoxStyle}
                                     key={item.id}>
                                    <FolderAction isMobile={mobileMatches}
                                                  key={item}
                                                  variant={"secondary"}>
                                        {item?.type === "wiki" ? (
                                                <img style={ImgStyle} src={"assets/images/wiki.png"} alt={"wiki"}/>) :
                                            <img style={ImgStyle} src={"assets/images/article.png"}
                                                 alt={"article"}/>}
                                    </FolderAction>
                                    <Typography fontSize={!mobileMatches ? 14 : 12}>{item.title}</Typography>
                                </Box>
                            </>))}
                        </Stack>) : (data?.parent?.id !== undefined && (<NoData/>))}
                    {/*end documents*/}
                </Box>

                {folderList?.documents?.data?.length >= 50 && (<PaginateCore>
                    <Pagination
                        dir={dir ? "rtl" : "ltr"}
                        page={page}
                        onChange={handlePageChange}
                        count={Math.ceil(folderList?.documents?.total / folderList?.documents?.per_page)}
                        variant="outlined"
                        color="primary"
                        disabled={folderList?.data?.total < 11}
                    />
                </PaginateCore>)}
            </Container>


            {data?.parent?.id !== undefined ? (<AddDocumentModal category={data?.parent}/>) : (<Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: '100px'
            }}>
                <img src={noCategory} alt={'noData'}/>
                <Typography mt={5}>{t('createSubCategory')}</Typography>
            </Box>)}
            {openModal && <AddCategoryModal handleFolderChange={handleFolderChange}
                                            openModal={openModal}
                                            setOpenModal={setOpenModal}
                                            data={modalData}
                                            mainData={data}
                                            id={id}/>}
            {openEditModal && <EditCategoryModal handleFolderChange={handleFolderChange}
                                                 openModal={openEditModal}
                                                 setOpenModal={setOpenEditModal}
                                                 data={modalData}
                                                 mainData={data}
                                                 id={id}/>}
            {openArchiveModal && <ArchiveCategoryModal handleFolderChange={handleFolderChange}
                                                       openModal={openArchiveModal}
                                                       setOpenModal={setOpenArchiveModal}
                                                       data={modalData}
                                                       mainData={data}
                                                       id={id}/>}
        </Box>
    </>);
};
export default DocumentList;
