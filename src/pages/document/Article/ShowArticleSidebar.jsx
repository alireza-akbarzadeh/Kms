import React, {useState} from 'react';
import {Alert, Box, Button, Chip, Divider, IconButton, Stack, Typography} from '@mui/material'
import {SideArticle, SpaceItems} from "./Article-Styled"
import {
    EditOutlined,
    ContentCopyRounded,
    OpenInNew
} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import DocumentSideTop from "../DocumentSideTop";
import ArticleStuffModal from "./Modals/ArticleStuffModal";
import documentRequirement from "Hook/useDocumentRequirement";
import {useDispatch, useSelector} from "react-redux";
import {makePrivateDoc} from "redux/features/document/public/makePrivate"
import {makePublicDoc} from "redux/features/document/public/makePublic"
import {CheckRole} from "../../../helper";

const ShowArticleSide = ({data, setOpeModal, showSide, setShowSide}) => {
    const [openModal, setOpenModal] = useState({status: false})
    const [alert, setAlert] = useState(false);
    const [type, setType] = useState(null)
    const {t} = useTranslation();
    const direction = t('direction')
    const requiredData = documentRequirement({});
    const dispatch = useDispatch()
    const {data: user} = useSelector((state) => state.user)

    const makeChips = (array) => {

        if (array?.length) {
            return <Stack direction={'row'} flexWrap={'wrap'} gap={1}>
                {array?.map((item) => (<>
                    {item?.color !== undefined ? (
                        <Chip variant={'outlined'} sx={{color: item?.color}} label={item?.title}/>
                    ) : (
                        <Chip label={item?.title}/>
                    )}
                </>))}
            </Stack>
        } else {
            return <Alert severity="info">{t('noData')}</Alert>
        }
    }

    const handleOpenModal = (data, type) => {
        setOpenModal({
            status: true,
            data: data,
            type: type
        })
    }
    const handlePrivetArticle = () => {
        dispatch(makePrivateDoc({id: data.id}))
    }
    const handlePublicArticle = () => {
        dispatch(makePublicDoc({id: data.id}))
    }
    const copyLink = (link) => {
        navigator.clipboard.writeText(link)
            .then(r => {
                setAlert(true);
                setTimeout(() => setAlert(false), 5000)

            })
    }
    return (
        <SideArticle IsMobileSide={showSide}>
            <Stack direction={"column"} gap={2.5}>
                <DocumentSideTop t={t} data={data} setShowSide={setShowSide}/>
                <Divider/>
                <Stack spacing={4} direction={'column'} textAlign={direction === 'rtl' ? 'right' : 'left'}>
                    <Stack direction={'column'} spacing={2}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} gap={2}>
                            <Typography dir={direction}>
                                #
                                {t('Tags')}
                                :
                            </Typography>
                            {CheckRole({roles: user?.data?.type, page: 'document', part: 'side'}) && (
                                <EditOutlined onClick={() => handleOpenModal(data?.tags, 'tag')}
                                              sx={{cursor: 'pointer'}}/>
                            )}
                        </Box>
                        {makeChips(data?.tags)}
                    </Stack>
                    <Divider/>
                    <Stack direction={'column'} spacing={2}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} gap={2}>
                            <Typography dir={direction}>
                                #
                                {t('DocProjects')}
                                :
                            </Typography>
                            {CheckRole({roles: user?.data?.type, page: 'document', part: 'side'}) && (
                                <EditOutlined onClick={() => handleOpenModal(data?.projects, 'project')}
                                              sx={{cursor: 'pointer'}}/>
                            )}

                        </Box>
                        {makeChips(data?.projects)}
                    </Stack>
                    <Divider/>
                    <Stack direction={'column'} spacing={2}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} gap={2}>
                            <Typography dir={direction}>
                                #
                                {t('Tasks')}
                                :
                            </Typography>
                            {CheckRole({roles: user?.data?.type, page: 'document', part: 'side'}) && (
                                <EditOutlined onClick={() => handleOpenModal(data?.tasks, 'task')}
                                              sx={{cursor: 'pointer'}}/>
                            )}
                        </Box>
                        {makeChips(data?.tasks)}
                    </Stack>
                    <Divider/>
                    <Stack direction={'column'} gap={2}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2}}>
                            <Typography dir={direction}>
                                #
                                {t('DocDrives')}
                                :
                            </Typography>
                            {CheckRole({roles: user?.data?.type, page: 'document', part: 'side'}) && (
                                <EditOutlined onClick={() => handleOpenModal(data?.drives, 'drive')}
                                              sx={{cursor: 'pointer'}}/>
                            )}
                        </Box>
                        {makeChips(data?.drives)}
                    </Stack>
                </Stack>
                <Divider/>
                {data?.is_public === 1 ? (
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "1px solid #c0c0c0",
                        padding: "7px",
                        borderRadius: "5px"
                    }}>
                        <Box sx={{display: "inline-flex", gap: 1}}>
                            <Typography sx={{margin: "0 4px"}}>{t("Public")}</Typography>
                            <Divider orientation="vertical" flexItem/>

                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <a href={data.public_link} target='_blank'>
                                <IconButton
                                    color='primary'
                                    edge="end"
                                    aria-label="open"
                                    title={t("Show")}
                                >
                                    <OpenInNew/>
                                </IconButton>
                            </a>
                            <IconButton
                                color='primary'
                                edge="end"
                                aria-label="copy"
                                title={t("Copy")}
                                onClick={() => copyLink(data.public_link)}
                            >
                                <ContentCopyRounded/>
                            </IconButton>
                        </Box>
                        <Chip clickable
                              disabled={!CheckRole({roles: user?.data?.type, page: 'document', part: 'makePublic'})}
                              onClick={() => handlePrivetArticle()}
                              label={t("Private")} color="primary" variant="outlined"/>
                    </Box>
                ) : (
                    <Box sx={{
                        display: "flex",
                        border: "1px solid #c0c0c0",
                        padding: "9px",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: "5px"
                    }}
                    >
                        <Box>{t("Private")}</Box>
                        <Button
                            disabled={!CheckRole({roles: user?.data?.type, page: 'document', part: 'makePublic'})}
                            onClick={() => handlePublicArticle()} variant={"outlined"}>{t("Public")}</Button>
                    </Box>
                )}
            </Stack>
            {openModal.status && <ArticleStuffModal id={data?.id} openModal={openModal} setOpenModal={setOpenModal}
                                                    requiredData={requiredData}/>}
        </SideArticle>
    );
};
export default ShowArticleSide;
