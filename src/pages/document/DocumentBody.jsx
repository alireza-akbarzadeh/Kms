import {
    Alert,
    Box,
    Button,
    Checkbox,
    Chip,
    Container,
    Divider,
    Grid,
    Pagination,
    Rating,
    Stack,
    Tooltip,
    Typography,
    useMediaQuery
} from "@mui/material";
import {AlignItems, AlignItemsClick, ArrowControl, Body, Header, LikeBtn} from "./Article/Article-Styled";
import {
    ArrowBack,
    ArrowDownward,
    ArrowDropDown,
    ArrowForward,
    ArrowLeft,
    ArrowRight,
    Bookmark,
    BookmarkBorder,
    Cancel,
    Chat,
    ChatBubble,
    Close,
    ContentCopy,
    ContentCopyTwoTone,
    Edit,
    EventNote,
    FolderOpenOutlined,
    History,
    MarkChatRead,
    Star,
    ThumbDown,
    ThumbUp,
    VisibilityOutlined
} from "@mui/icons-material";
import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {storeSaveDocument} from "redux/features/document/save-document/storeSaveDocumnet";
import {deleteDocumentList} from "redux/features/document/save-document/deleteSaveDocumnet";
import {LikeDocument} from "redux/features/document/stuff/likeDocument";
import ShowArticleSide from "./Article/ShowArticleSidebar";
import ShowWikiSide from "./Wiki/ShowWikiSidebar";
import {CheckRole, getDocStatus, Http} from "helper";
import {CommentText, SendBtn} from "./Article/Modals/Modal-Styled";
import Comment from "./Comment";
import {CommentDocument} from "redux/features/document/stuff/CommentDocument";
import {PaginateCore} from "core";
import {NoData} from "components";
import DocumentChangeStatusModal from "./DocumentChangeStatusModal";
import {showArticle} from "redux/features/document/article/showArticelSlice";
import {DeprecateDoc} from "redux/features/document/DeprecateSlice";
import SetTimeModal from './setTimeModal'


const DocumentBody = ({data, id, setData, user}) => {
    const [rate, setRate] = React.useState({like: false, disLike: false, showRate: false, callApi: true});
    const [comment, setComment] = React.useState(null);
    const [openStatusModal, setOpenStatusModal] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [replyTo, setReplyTo] = React.useState({
        to: null, text: '', id: null
    });
    const {t} = useTranslation();
    const history = useHistory();
    const dir = t("direction") === "rtl";
    const [rateNumber, setRateNumber] = React.useState(0);
    const [state, setState] = React.useState(null);
    const [showSide, setShowSide] = React.useState(true);
    const [opeModal, setOpeModal] = React.useState(null);
    const [showTooltip, setShowTooltip] = React.useState(null);
    const dispatch = useDispatch();
    const matches = useMediaQuery(("max-width:890px"))

    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()


    React.useEffect(() => {
        if (matches) return setShowSide(false)
    }, [matches]);


    React.useEffect(() => {
        if (data?.log?.status === 'like') {
            setRate({like: true, disLike: false, showRate: true, callApi: false})
            setRateNumber(data?.log?.rate)
        } else if (data?.log?.status === 'dislike') {
            setRate({like: false, disLike: true, showRate: true, callApi: false})
            setRateNumber(data?.log?.rate)
        }
    }, [data]);

    //BookMark functionality
    const handleBookMark = (e) => {
        const status = e.target.checked;
        const data = {
            document_id: id
        }
        if (status) {
            dispatch(storeSaveDocument(data))
        }
        if (!status) {
            dispatch(deleteDocumentList(id))
        }
    }

    //Like & DisLike functionality
    const handleStatus = (val) => {
        let body = {};
        if (val === "Like") {
            body = {
                type: 'like', rate: rateNumber, document_id: id
            }
            if (rate.showRate) {
                setRate({...rate, like: true, disLike: false, callApi: false})
            } else {
                setRate({showRate: true, like: true, disLike: false, callApi: true})
            }
        }
        if (val === "DisLike") {
            body = {
                type: 'dislike', rate: rateNumber, document_id: id
            }
            if (rate.showRate) {
                setRate({...rate, like: false, disLike: false, callApi: false})
            } else {
                setRate({showRate: true, like: false, disLike: false, callApi: true})
            }
        }
        if (rate.showRate) {
            dispatch(LikeDocument(body))
        }
    }


    const handleChange = () => {
        setState(true)
    }
    //copy document functionality
    const handleCloseClipboard = () => {
        const timer = setTimeout(() => {
            setShowTooltip(false);
        }, 1000);
        return () => clearTimeout(timer);
    }
    const handleCopyClipboard = () => {
        setShowTooltip(true);
        navigator.clipboard.writeText(data?.body);
    }
    const label = {inputProps: {'aria-label': 'Copy'}};

    //rate functionality
    const handleRateNumber = (e) => {
        setRateNumber(e.target.value)
        let type = rate.like ? 'like' : 'dislike';
        if (rate.callApi) {
            dispatch(LikeDocument({
                type: type, rate: e.target.value, document_id: id
            }))
        }
    }


    const storeComment = (type = 'comment') => {
        let body = {
            text: comment
        }
        if (replyTo?.to !== null) {
            body = {...body, type: 'reply', comment_id: replyTo.id, document_id: id}
        } else {
            body = {...body, type: 'comment', document_id: id}
        }
        dispatch(CommentDocument(body))
            .then(res => {
                setComment(null)
                setReplyTo({
                    to: null, id: null, text: ''
                })
            })
    }

    const handlePageChange = async (event, value) => {
        setPage(value);
        const res = await Http(`document/${id}?page=${value}&perPage=${5}`, {
            method: "get",
        });
        if (res.status === 200) {
            setData(res?.data?.data);
        }
    };

    const handleDeprecate = (type) => {
        dispatch(DeprecateDoc({
            id: id, type: type
        }))
            .then(res => {
                dispatch(showArticle({id: id, page: 1, perPage: 5}))
            })
    }

    const handleTimeModal = () => {
        if (CheckRole({roles: user?.type, page: 'admin', part: 'check'})) {
            return setOpeModal(true)
        }
    }

    const updateDoc = () => {
        if (document.status_type === 'writing') {
            return history.push({
                pathname: `/document/knowledge/update`, state: {document: data, user: user, id: id}
            })
        } else {
            return history.push({
                pathname: `/document/update`, state: {document: data, user: user, id: id}
            })
        }
    }

    return (<>
        <Box sx={{mt: 2}}>
            <Container maxWidth={"xl"}>
                {!data ? <Box sx={{
                    display: "flex",
                    alignItems: "Center",
                    height: "80vh",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <img src="/assets/images/Lawyer-bro.png" alt="Article Not Found"/>
                    <Typography mt={2}>{t("DOC_NOTFOUND")}</Typography>
                </Box> : <Grid container spacing={5}>
                    <Grid item xs={12} md={showSide ? 9 : 12}>
                        <Box position={"relative"} sx={{paddingLeft: 4.4}}>
                            <Header mt={10}>
                                <Box sx={{display: "inline-flex", alignItems: "center", gap: 2}}>
                                    <Typography fontWeight={"bold"} component={"h3"} variant={"h5"}>
                                        {data?.title}
                                    </Typography>
                                    {data?.is_new && (<Chip label={t("New")}
                                                            variant={"outlined"} color={"success"}/>)}
                                </Box>
                                <Box sx={{display: "inline-flex", alignItems: "center", gap: 2}}>

                                    {data?.is_deprecated ? (<>
                                        {CheckRole({roles: user?.type, page: 'document', part: 'deprecate'}) && (<Chip
                                            label={'تعیین بعنوان منبع رایج'}
                                            color={'success'}
                                            variant={'outlined'}
                                            onClick={() => handleDeprecate('restoreDeprecate')}
                                            sx={{cursor: 'pointer', padding: '2px'}}/>)}
                                        <Chip label={t("Deprecated")}
                                              variant={"outlined"}
                                              color={"error"}/> </>) : <>
                                        {CheckRole({
                                            roles: user?.type, page: 'document', part: 'deprecate'
                                        }) && (<Chip color={'error'}
                                                     label={'تعیین بعنوان منسوخ شده'}
                                                     variant={'outlined'}
                                                     onClick={() => handleDeprecate('makeDeprecate')}
                                                     sx={{cursor: 'pointer'}}/>)}
                                    </>}
                                    {data?.type === 'article' ? (<>
                                        {(CheckRole({
                                            roles: user?.type, page: 'document', part: 'edit'
                                        }) || data?.user?.id === user?.id) && (
                                            <Button variant={"contained"} color={"primary"} onClick={updateDoc}>
                                                <Edit sx={{fontSize: 15, margin: "0 5px"}}/>
                                                {t("Edit")}
                                            </Button>)}
                                    </>) : (<>
                                        {(data?.status_type === 'published' && CheckRole({
                                            roles: user?.type, page: 'document', part: 'contribute'
                                        })) && (<Button variant={"contained"} color={"primary"} onClick={updateDoc}>
                                            <Edit sx={{fontSize: 15, margin: "0 5px"}}/>
                                            {t("Contribute")}
                                        </Button>)}
                                    </>)}

                                </Box>
                            </Header>
                            <Header mt={29}>
                                <Stack direction={"row"} gap={1.5}>
                                    <AlignItems>
                                        <EventNote/>
                                        <span>
                                    {data?.date}
                                        </span>
                                    </AlignItems>
                                    <AlignItems>
                                        <History/><span>
                                    {data?.read_time === null ? (<Typography
                                        onClick={() => handleTimeModal()}
                                        sx={CheckRole({
                                            roles: user?.type, page: 'admin', part: 'check'
                                        }) ? {
                                            whiteSpace: 'nowrap', cursor: 'pointer'
                                        } : {whiteSpace: 'nowrap'}}>{t("No_Study_Time")}</Typography>) : (<Typography
                                        onClick={() => handleTimeModal()}
                                        sx={CheckRole({
                                            roles: user?.type, page: 'admin', part: 'check'
                                        }) ? {whiteSpace: 'nowrap', cursor: 'pointer'} : {whiteSpace: 'nowrap'}}>
                                        {data?.read_time + t('minutes')}
                                    </Typography>)}
                                        </span>
                                    </AlignItems>
                                    {data?.status_type === 'writing' ? (<AlignItemsClick>
                                        <Chip label={t('knowledgeTree')}/>
                                    </AlignItemsClick>) : (<>
                                        {CheckRole({
                                            roles: user?.type, page: 'document', part: 'manageComments'
                                        }) && (<AlignItemsClick
                                            onClick={() => history.push(`/document/comments/${id}`)}>
                                            <MarkChatRead/>
                                            <span>
                                                        <Typography
                                                            sx={{whiteSpace: 'nowrap'}}>{t("ManageComments")}</Typography>
                                                     </span>
                                        </AlignItemsClick>)}
                                    </>)}
                                </Stack>
                                <Stack direction={"row"} gap={1} alignItems={'center'}>
                                    <Box sx={{display: 'flex'}}>
                                        <Chip color={'info'} variant={'outlined'} label={<Box sx={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                        }}>
                                            {t('Comments')}
                                            <ArrowDropDown/>
                                        </Box>}
                                              onClick={executeScroll}/>
                                    </Box>
                                    <Box sx={CheckRole({
                                        roles: user?.type, page: 'document', part: 'changeStatus'
                                    }) ? {display: 'flex', cursor: 'pointer'} : {display: 'flex'}}
                                         onClick={() => {
                                             if (CheckRole({
                                                 roles: user?.type, page: 'document', part: 'changeStatus'
                                             })) {
                                                 if (data?.status_type !== 'writing') {
                                                     setOpenStatusModal(true)
                                                 }
                                             }
                                         }}
                                    >
                                        {getDocStatus(data?.status_type, data?.status, true)}
                                    </Box>
                                    <Tooltip
                                        open={showTooltip}
                                        title={t("Copied")}
                                        leaveDelay={1500}
                                        onClose={handleCloseClipboard}
                                    >
                                        <Checkbox
                                            onChange={handleCopyClipboard}
                                            {...label}
                                            icon={<ContentCopy/>}
                                            checkedIcon={<ContentCopyTwoTone/>}
                                        />
                                    </Tooltip>
                                    <Checkbox
                                        {...label}
                                        onChange={(e) => handleBookMark(e)}
                                        icon={<BookmarkBorder/>}
                                        checkedIcon={<Bookmark/>}
                                        defaultChecked={data?.bookmark}
                                    />
                                    <AlignItems>
                                        <span>
                                    {data?.category}
                                        </span>
                                        <FolderOpenOutlined/>
                                    </AlignItems>

                                </Stack>
                            </Header>
                            <Box sx={{display: "inline-flex", gap: 1, mt: 1}}>
                                <Typography>
                                    {t("Description")}
                                </Typography>
                                :<Typography fontWeight={400} fontSize={14}
                                             lineHeight={1.9}>{data?.description?.substring(0, 250)}</Typography>
                            </Box>
                            <Divider sx={{margin: "15px 0", borderColor: "#e8e8e8"}}/>

                            <Grid container spacing={2} justifyContent={'center'}>
                                <Grid item xs={6} md={3} lg={3}>
                                    <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
                                        <ThumbUp/>
                                        <Typography>
                                            {data?.likes}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={6} md={3} lg={3}>
                                    <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
                                        <ThumbDown/>
                                        <Typography>
                                            {data?.dislikes}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={6} md={3} lg={3}>
                                    <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
                                        <VisibilityOutlined/>
                                        <Typography>
                                            {data?.view}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={6} md={3} lg={3}>
                                    <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
                                        <Star/>
                                        <Typography>
                                            {data?.rate}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Divider sx={{margin: "15px 0", borderColor: "#e8e8e8"}}/>
                            {data?.body === null ? (
                                <Box sx={{display: 'flex', justifyContent: 'center', margin: '100px 0'}}>
                                    <Typography>
                                        <Alert severity="success"> {data?.status}</Alert>
                                    </Typography>
                                </Box>) : (<Body>
                                <div className={"body__Html"} dangerouslySetInnerHTML={{__html: `${data?.body}`}}/>
                            </Body>)}

                            {data?.status_type !== 'writing' && (<>
                                <Divider sx={{margin: "15px 0", borderColor: "#e8e8e8"}}/>
                                <Stack mt={2} justifyContent={"center"} direction={"row"} alignItems={"center"}
                                       gap={2}>
                                    <Box sx={{
                                        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 1
                                    }}>
                                        <LikeBtn
                                            Active={rate.like}
                                            btn={"like"}
                                            onClick={() => handleStatus("Like")}
                                            disabled={rate.like}
                                        >
                                            <ThumbUp/>
                                        </LikeBtn>
                                        <Typography>
                                            {t("Yes")}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 1
                                    }}>
                                        <LikeBtn
                                            DisActive={rate.disLike}
                                            btn={"disLike"}
                                            onClick={() => handleStatus("DisLike")}
                                            disabled={rate.disLike}
                                        >
                                            <ThumbDown/>
                                        </LikeBtn>
                                        <Typography>
                                            {t("No")}
                                        </Typography>
                                    </Box>
                                    <Typography>
                                        {t('ArticleLikeText')}
                                    </Typography>
                                </Stack>
                                <Box sx={{textAlign: "center", mt: 2}}>
                                    {(rate.showRate) && (<Rating name="size-large"
                                                                 value={rateNumber}
                                                                 onChange={(e) => handleRateNumber(e)}
                                                                 size="large"/>)}
                                </Box>
                                {/*comments section*/}
                                <Box ref={myRef} sx={{margin: '20px 0 50px 0'}}>
                                    <Typography>
                                        {t('Comments')}
                                        {replyTo?.to !== null && (
                                            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                                <Cancel
                                                    sx={{cursor: 'pointer'}}
                                                    onClick={() => setReplyTo({to: null, id: null, text: ''})}/>
                                                <Typography> پاسخ به :</Typography>
                                                <Typography>{replyTo?.to}</Typography>
                                                <Typography>({replyTo?.text?.substring(0, 10)} ...)</Typography>
                                            </Stack>)}
                                    </Typography>
                                    <CommentText isRtl={t("direction") === "rtl"}>
                                        <input placeholder={t('writeComment')} height={"250px"}
                                               onChange={(e) => setComment(e.target.value)}/>
                                        <SendBtn
                                            type={"submit"}
                                            isRtl={t("direction") === "rtl"}
                                            disabled={comment === null}
                                            onClick={() => storeComment('comment')}>
                                            {dir ? <ArrowBack/> : <ArrowForward/>}
                                        </SendBtn>
                                    </CommentText>
                                    {/* load comments */}
                                    {data?.comment?.data?.length > 0 ? (
                                        <Stack direction={'column'} spacing={5} justifyContent={'center'} mt={5}>
                                            {data?.comment?.data?.map((comment) => (<>
                                                <Comment executeScroll={executeScroll} setReplyTo={setReplyTo}
                                                         comment={comment}/>
                                                <Divider/>
                                            </>))}
                                        </Stack>) : (<NoData/>)}

                                    {data?.comment?.total > 5 && (<PaginateCore>
                                        <Pagination
                                            dir={dir ? "rtl" : "ltr"}
                                            page={page}
                                            onChange={handlePageChange}
                                            count={Math.ceil(data?.comment?.total / data?.comment?.per_page)}
                                            variant="outlined"
                                            color="primary"
                                            disabled={data?.comment?.total < 5}
                                        />
                                    </PaginateCore>)}
                                </Box>
                            </>)}

                            <Box>
                                <ArrowControl onClick={() => setShowSide(showSide => !showSide)}>
                                    {showSide ? <ArrowLeft/> : <ArrowRight/>}
                                </ArrowControl>
                                <Divider
                                    color={"#e8e8e8"}
                                    sx={{position: "absolute", left: 0, top: 0, borderColor: "#e8e8e8"}}
                                    variant={"fullWidth"}
                                    orientation={"vertical"}/>
                            </Box>
                        </Box>
                    </Grid>
                    {data?.type === 'article' ? (<Grid item xs={12} md={showSide ? 3 : 0}>
                        {showSide && <ShowArticleSide setShowSide={setShowSide} showSide={showSide}
                                                      setOpeModal={setOpeModal}
                                                      data={data}/>}
                    </Grid>) : (<Grid item xs={12} md={showSide ? 3 : 0}>
                        {showSide && <ShowWikiSide setShowSide={setShowSide} showSide={showSide}
                                                   setOpeModal={setOpeModal}
                                                   data={data}/>}
                    </Grid>)}
                </Grid>}
            </Container>
        </Box>
        {opeModal && <SetTimeModal id={data?.id} time={data?.read_time} openModal={opeModal}
                                   setOpenModal={setOpeModal}/>}
        {openStatusModal && <DocumentChangeStatusModal openModal={openStatusModal} setOpenModal={setOpenStatusModal}
                                                       document={data}/>}
    </>)
}
export default DocumentBody