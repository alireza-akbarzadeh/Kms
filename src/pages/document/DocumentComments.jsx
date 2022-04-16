import {
    Button,
    Checkbox,
    Chip,
    Container,
    Divider,
    Grid,
    IconButton,
    Pagination,
    Stack,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import {FirstLoadingCore, LoadingCore, PaginateCore} from "core";
import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CommentIndex} from "redux/features/document/stuff/CommentIndex";
import Box from "@mui/material/Box";
import NoData from "components/NoData";
import {
    ArrowBack, ThumbDown, ThumbUp,
} from "@mui/icons-material";
import {Header} from "./Article/Article-Styled";
import {getDocStatus, Http} from "helper";
import Avatar from "components/avatar";
import _ from "lodash";
import {CommentChangeStatus} from "redux/features/document/stuff/CommentChangeStatus";

const DocumentComments = () => {
    const [page, setPage] = useState(1)
    const [comments, setComments] = useState(null)
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const history = useHistory();
    const ref = useRef(false);
    const {id} = useParams()
    const dir = t("direction") === "rtl";
    const theme = useTheme();
    const border = theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";
    const {data, loading} = useSelector((state) => state.CommentIndexSlice)
    const {data: response, loading: acceptLoading} = useSelector((state) => state.CommentChangeStatusSlice)

    useEffect(() => {
        dispatch(CommentIndex({
            id: id, page: 1, perPage: 5
        }))
    }, [dispatch, id])

    useEffect(() => {
        setComments(data)
    }, [data])


    const handlePageChange = async (event, value) => {
        setPage(value);
        const res = await Http(`document/comments/${id}?page=${value}&perPage=${5}`, {
            method: "get",
        });
        if (res.status === 200) {
            setComments(res?.data?.data);
        }

    }


    const handleStatus = (id, status) => {
        const newData = _.cloneDeep(comments);
        const index = newData.data.comments?.data?.findIndex((item) => item.id === id);
        let indexData = newData.data.comments?.data[index];
        _.merge(indexData, {status_type: status});
        if (status === 'accept') {
            _.merge(indexData, {status: 'تایید شده'});
        } else {
            _.merge(indexData, {status: 'رد شده'});
        }
        _.merge(newData.data.comments?.data[index], indexData);
        dispatch(CommentChangeStatus({id: id, type: status}))
            .then(res => {
                setComments(newData);
            })
    };



    useEffect(() => {
        if (loading && comments?.data?.length === 0){
            ref.current = true
        }
    }, [loading, comments])



    return (!ref.current && loading) ? <FirstLoadingCore loading={loading}/> :(
        <>
            {loading && <LoadingCore loading={loading}/>}
            <Container maxWidth={"xl"}>
                <Stack direction={'column'} justifyContent={'center'} display={'flex'} spacing={3}>

                    {comments?.data?.document?.id !== undefined ? (<>
                        {/* Header */}
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Box position={"relative"} sx={{paddingLeft: 4.4}}>
                                    <Header mt={10}>
                                        <Box sx={{display: "inline-flex", alignItems: "center", gap: 2}}>
                                            <Typography fontWeight={"bold"} component={"h3"} variant={"h5"}>
                                                {comments?.data?.document?.title}
                                            </Typography>
                                            <Chip label={t(comments?.data?.document?.type)}
                                                  variant={"outlined"}
                                                  color={"primary"}/>
                                        < /Box>
                                    </Header>
                                </Box>

                                <Box sx={{display: "inline-flex", gap: 1, mt: 2}}>
                                    <Typography>
                                        {t("Description")}
                                    </Typography>
                                    :<Typography fontWeight={400} fontSize={14}
                                                 lineHeight={1.9}>{comments?.data?.document?.description?.substring(0, 250)}</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Chip label={t('Comments')}/>
                        {comments?.data?.comments?.data?.length > 0 ? (<Stack
                                direction={'column'}
                                spacing={5}
                                justifyContent={'center'}
                                mt={5}
                                sx={{
                                    marginTop: '0 !important', minHeight: '300px', overflowY: 'auto'
                                }}>
                                <TableContainer sx={{border: border}}>
                                    <Table sx={{minWidth: 300}} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align={dir ? "right" : "left"}>
                                                    {t("Author")}
                                                </TableCell>
                                                <TableCell align={dir ? "right" : "left"}>
                                                    {t("Type")}
                                                </TableCell>
                                                <TableCell align={dir ? "right" : "left"}>
                                                    {t("CmText")}
                                                </TableCell>
                                                <TableCell align={"center"}>{t("status")}</TableCell>
                                                <TableCell align={"center"}>{t("Actions")}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {comments?.data?.comments?.data?.map((comment) => (<>
                                            <TableRow
                                                key={comment?.id}
                                                sx={{
                                                    marginBottom: "5px", "&:last-child td, &:last-child th": {
                                                        border: 0, borderColor: border,
                                                    },
                                                }}
                                            >
                                                <TableCell align={dir ? "right" : "left"}>
                                                    <Box sx={{display: 'flex'}} gap={1}>
                                                        <Avatar address={comment?.user?.avatar}/>
                                                        {comment?.user?.first_name + ' ' + comment?.user?.last_name}
                                                    </Box>
                                                </TableCell>
                                                <TableCell
                                                    align={dir ? "right" : "left"}>{comment?.type === 'comment' ? t('comment') : t('reply')}</TableCell>
                                                <TableCell align={dir ? "right" : "left"}>{comment?.text}</TableCell>
                                                <TableCell
                                                    align={dir ? "right" : "left"}>{getDocStatus(comment?.status_type, comment?.status)}</TableCell>
                                                <TableCell>
                                                    <Box>
                                                        <IconButton
                                                            sx={{
                                                                border: "1px solid #1ce087", borderRadius: "100%",
                                                            }}
                                                            disabled={comment?.status_type === "accept"}
                                                            onClick={() => handleStatus(comment?.id, "accept")}
                                                        >
                                                            <ThumbUp
                                                                sx={comment?.status_type === "accept" ? {color: "#777 !important"} : {color: "#1ce087"}}
                                                            />
                                                        </IconButton>
                                                        <IconButton
                                                            sx={{
                                                                border: "1px solid #ce1440",
                                                                borderRadius: "100%",
                                                                margin: "0 10px",
                                                            }}
                                                            disabled={comment?.status_type === "reject"}
                                                            onClick={() => handleStatus(comment?.id, "reject")}
                                                        >
                                                            <ThumbDown
                                                                sx={comment?.status_type === "reject" ? {color: "#777 !important"} : {color: "#ce1440"}}
                                                            />
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        </>))}
                                    </Table>
                                </TableContainer>
                            </Stack>) : (<NoData/>)}

                        {comments?.data?.comments?.total > 5 && (<PaginateCore>
                            <Pagination
                                dir={dir ? "rtl" : "ltr"}
                                page={page}
                                onChange={handlePageChange}
                                count={Math.ceil(comments?.data?.comments?.total / comments?.data?.comments?.per_page)}
                                variant="outlined"
                                color="primary"
                                disabled={comments?.data?.comments?.total < 5}
                            />
                        </PaginateCore>)}
                        <Divider sx={{margin: "15px 0", borderColor: "#e8e8e8"}}/>
                    </>) : (<NoData mt={'200px'}/>)}
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                        <Button
                            variant={'contained'}
                            onClick={() => history.push(`/document/${comments?.data?.document?.type}/${id}`)}
                            color={'primary'}>
                            {t('Back')}
                            <ArrowBack sx={{margin: '0 5px'}}/>
                        </Button>
                    </Box>
                </Stack>

            </Container>
        </>)
}

export default DocumentComments