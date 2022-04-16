import React, {useEffect, useState} from 'react';
import {Avatar} from "components";
import {Alert, Box, Button, Chip, Divider, Grid, IconButton, Stack, Typography} from '@mui/material'
import {AlignItems, SideArticle, SpaceItems} from "../Article/Article-Styled"
import {Close, OpenInNew} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import DocumentSideTop from "../DocumentSideTop";
import {useDispatch, useSelector} from "react-redux";
import IndexContributeSlice, {IndexContribute} from "../../../redux/features/document/Contribute";
import {useHistory, useParams} from "react-router-dom";
import {PaginateCore} from "../../../core";
import Pagination from "@mui/lab/Pagination";

const ShowWikiSide = ({data, showSide, setShowSide}) => {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const {id} = useParams()
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const direction = t('direction')
    const {data: contributes, loading} = useSelector((state) => state.IndexContributeSlice)
    let dir = t("direction") === "rtl";
    useEffect(() => {
        dispatch(IndexContribute({id: id, page, perPage, show: false, filters: 'status=accept&sort=DESC'}))
    }, [dispatch, id, page])


    const makeItem = (row, type = 'contribute') => {
        return <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '10px 0'
        }} gap={2}>
            <Box sx={{display: 'inline-flex'}} gap={1.5}>
                <Avatar address={row?.user?.avatar}/>
                <Typography>
                    {row?.user?.first_name + ' ' + row?.user?.last_name}
                </Typography>
            </Box>
            <Typography dir={'ltr'} component={'span'} sx={{fontWeight: 300, fontSize: 13}}>{row?.date}</Typography>
            <Typography>
                {row?.title?.length > 5 ? (<>{row?.title?.substring(0, 3)} ...</>) : row?.title}
            </Typography>
        </Box>
    }


    return (<SideArticle IsMobileSide={showSide}>
        <Stack direction={"column"} gap={2.5}>
            <DocumentSideTop t={t} data={data} setShowSide={setShowSide}/>
            <Divider sx={{margin: "14px 0"}}/>
            <Stack direction={'column'} spacing={2} textAlign={'center'}>
                <Alert sx={{
                    '& .MuiAlert-icon-dzODxC': {
                        marginLeft: '12px'
                    }
                }} severity="success">{t('contributes')}</Alert>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }} gap={2}>
                    <Typography>
                        {t('UserName')}
                    </Typography>
                    <Typography>
                        {t('Date')}
                    </Typography>
                    <Typography>
                        {t('WikiTitle')}
                    </Typography>
                </Box>
                <Divider/>
                {contributes?.data?.wiki?.data?.map((item) => {
                    return makeItem(item)
                })}
                {contributes?.data?.wiki?.total > 5 && (<PaginateCore>
                    <Pagination
                        page={page}
                        dir={dir ? "rtl" : "ltr"}
                        onChange={(e, value) => setPage(value)}
                        count={Math.ceil(contributes?.data?.wiki?.total / contributes?.data?.wiki?.per_page)}
                        variant="outlined"
                        color="primary"
                        disabled={contributes?.data?.wiki?.total < 5}
                    />
                </PaginateCore>)}
                <Button variant={'contained'} color={'secondary'} fullWidth
                        onClick={() => history.push(`/document/contributes/${data?.id}`)}>
                    {t('allContributes')}
                </Button>
            </Stack>
        </Stack>
    </SideArticle>);
};
export default ShowWikiSide;

