import * as React from 'react';
import {styled} from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, {treeItemClasses} from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import {useSpring, animated} from 'react-spring';
import {useTranslation} from "react-i18next";
import {Add} from "@mui/icons-material";
import Box from "@mui/material/Box";
import FolderOpen from "assets/folderOpen.png"
import folderFill from 'assets/folderFill.png'
import article from 'assets/article.png'
import wiki from 'assets/wiki.png'
import {Badge, Button, Chip, Divider, LinearProgress, Stack, useMediaQuery, useTheme} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {categoryList} from "redux/features/document/Category/CategoryListSlice";
import {useHistory} from "react-router-dom";
import AddDocModal from "./AddDocModal";

let styleDir = {};
let StyleImg = {}

const CategorySidebar = ({}) => {
    const [openModal, setOpenModal] = useState(null)
    const [data, setData] = useState(null)
    const {t} = useTranslation()
    const dir = t('direction') === 'rtl'
    const dispatch = useDispatch()
    const history = useHistory();
    const {data: categories, loading} = useSelector((state) => state.categoryListSlice)

    useEffect(() => {
        dispatch(categoryList({withDoc: true}))
    }, [dispatch])

    useEffect(() => {
        setData(categories?.data)
    }, [categories])


    const makeDoc = (item) => {
        return <Stack direction={'column'}>
            {item?.documents?.map((doc) => (<>
                {doc?.is_new ? (
                    <>
                        {doc?.type === 'article' ? (
                            <Badge badgeContent={''} color="success" variant="dot" sx={direction && {
                                '& .MuiBadge-badge': {
                                    right: 'unset',
                                    left: 0,
                                    transform: "translate(-11px , -2px)"
                                }
                            }}>
                                <StyledTreeArticle onDoubleClick={() => history.push(`/document/article/${doc.id}`)}
                                                   nodeId={`doc_${doc.id}`} label={doc.title}/>
                            </Badge>) : (
                            <Badge badgeContent={''} color="success" variant="dot" sx={direction && {
                                '& .MuiBadge-badge': {
                                    right: 'unset',
                                    left: 0,
                                    transform: "translate(-11px , -2px)"
                                }
                            }}>
                                <StyledTreeWiki onDoubleClick={() => history.push(`/document/wiki/${doc.id}`)}
                                                nodeId={`doc_${doc.id}`} label={doc.title}/>
                            </Badge>)}
                    </>
                ) : (
                    <>
                        {doc?.type === 'article' ? (
                            <StyledTreeArticle onDoubleClick={() => history.push(`/document/article/${doc.id}`)}
                                               nodeId={`doc_${doc.id}`} label={doc.title}/>
                        ) : (
                            <StyledTreeWiki onDoubleClick={() => history.push(`/document/wiki/${doc.id}`)}
                                            nodeId={`doc_${doc.id}`} label={doc.title}/>
                        )}
                    </>
                )}
            </>))}
        </Stack>
    }

    const makeTree = (row) => {
        return row?.map((item) => {
            if (item?.subCategories.length > 0) {
                return <>
                    <StyledTreeItem nodeId={item.id} label={item.title}>
                        {makeDoc(item)}
                        <Divider sx={{
                            margin: '5px 0 7px 0',
                            "&::before": {borderColor: '#8005d8'},
                            "&::after": {borderColor: '#8005d8'}
                        }}>
                            <Add fontSize={'small'} sx={{
                                marginTop: '10px',
                                cursor: 'pointer',
                                width: '0.8em',
                                height: '0.8em',
                            }} onClick={() => setOpenModal(item)}/>
                        </Divider>
                    </StyledTreeItem>
                </>
            } else {
                return <>
                    <StyledTreeItem nodeId={item.id} label={item.title}>
                        {makeDoc(item)}
                        <Divider sx={{
                            margin: '5px 0 7px 0',
                            "&::before": {borderColor: '#8005d8'},
                            "&::after": {borderColor: '#8005d8'}
                        }}>

                            <Add fontSize={'small'} sx={{
                                marginTop: '10px',
                                cursor: 'pointer',
                                width: '0.8em',
                                height: '0.8em',
                            }} onClick={() => setOpenModal(item)}/>
                        </Divider>
                    </StyledTreeItem>
                </>
            }
        })
    }

    const direction = t('direction') === 'ltr'
    const theme = useTheme();
    const mode = theme.palette.mode === 'dark'
    styleDir = direction ? {
        marginLeft: 15,
        paddingLeft: 18,
        marginTop: 15,
        marginBottom: 30,
        borderLeft: `2px solid #8005d8`,
        whiteSpace: "nowrap",
    } : {
        marginRight: 15,
        paddingRight: 18,
        marginTop: 15,
        marginBottom: 30,
        borderRight: `2px solid #8005d8`,
        whiteSpace: "nowrap",
    }
    StyleImg = direction ? {
        width: "22px", height: "22px", position: "absolute", transform: `translate(-20px , -12px) scaleX(-1)`
    } : {
        width: "22px", height: "22px", position: "absolute", transform: "translate(20px , -12px)  scaleX(-1)"
    }

    return (
        <>
            <Stack justifyContent={'center'} spacing={2} sx={{width: '100%'}}>
                {loading ? (
                    <Box sx={{height: '60vh'}}>
                        <LinearProgress value={1}/>
                    </Box>
                ) : (
                    <>
                        <Divider sx={{margin: '5px 0 7px 0'}}/>
                        <TreeView
                            aria-label="customized"
                            defaultExpanded={['1']}
                            defaultCollapseIcon={<MinusSquare/>}
                            defaultExpandIcon={<PlusSquare/>}
                            defaultEndIcon={<CloseSquare/>}
                            sx={{height: '55vh', flexGrow: 1, maxWidth: '100%', overflowY: 'auto', overflowX: 'auto'}}
                        >
                            {data?.map((item) => (<StyledTreeItem endIcon={<Add/>} nodeId={item.id} label={item.title}>
                                {item.subCategories.length > 0 && makeTree(item.subCategories)}
                                {makeDoc(item)}
                                <Divider sx={{
                                    margin: '5px 0 7px 0',
                                    "&::before": {borderColor: '#8005d8'},
                                    "&::after": {borderColor: '#8005d8'}
                                }}>
                                    <Add fontSize={'small'} sx={{
                                        marginTop: '10px',
                                        cursor: 'pointer',
                                        width: '0.8em',
                                        height: '0.8em',
                                    }} onClick={() => setOpenModal(item)}/>
                                </Divider>
                            </StyledTreeItem>))}
                        </TreeView>
                    </>
                )}
            </Stack>
            {openModal && <AddDocModal openModal={openModal} setOpenModal={setOpenModal} category={openModal}/>}
        </>

    )
}

export default CategorySidebar

function MinusSquare(props) {
    return (<Box sx={{position: 'relative'}}>
        <img style={StyleImg} src={FolderOpen} alt={''}/>
    </Box>);
}

function PlusSquare(props) {
    return (<Box sx={{position: 'relative'}}>
        <img style={StyleImg} src={folderFill} alt={''}/>
    </Box>);
}

function CloseSquare(props) {
    return (<Box sx={{position: 'relative'}}>
        <img style={StyleImg} src={FolderOpen} alt={''}/>
    </Box>);
}

function TransitionComponent(props) {
    const style = useSpring({
        from: {
            opacity: 0, transform: 'translate3d(20px,0,0)',
        }, to: {
            opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
        },
    });
    return (<animated.div style={style}>
        <Collapse {...props} />
    </animated.div>);
}


const itemStyle = (({theme}) => ({
    margin: '5px 0',
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    }, [`& .${treeItemClasses.group}`]: styleDir,
}));

const StyledTreeItem = styled((props) => (<TreeItem {...props} TransitionComponent={TransitionComponent}/>))(itemStyle);


const StyledTreeArticle = styled((props) => (<TreeItem {...props}
                                                       endIcon={<Box sx={{
                                                           position: "relative"
                                                       }}>
                                                           <img style={StyleImg} src={article} alt={''}/>
                                                       </Box>} TransitionComponent={TransitionComponent}/>))(itemStyle);


const StyledTreeWiki = styled((props) => (<TreeItem {...props}
                                                    endIcon={<Box sx={{position: "relative"}}>
                                                        <img style={StyleImg} src={wiki} alt={''}/>
                                                    </Box>} TransitionComponent={TransitionComponent}/>))(itemStyle);