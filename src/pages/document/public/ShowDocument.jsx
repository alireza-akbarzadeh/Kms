import React, {useEffect} from 'react';
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {FirstLoadingCore, LoadingCore} from "core"
import {showPublicDoc} from "redux/features/document/public/showDocument"
import {Avatar, NoData} from "components";
import {Box, Chip, Container, Divider, Grid, Stack, Typography} from "@mui/material";
import {Header} from "../Article/Article-Styled";
import {useTranslation} from "react-i18next";
import {Star, ThumbDown, ThumbUp, VisibilityOutlined} from "@mui/icons-material";

const ShowDocument = () => {
    const {t} = useTranslation();
    let dir = t("direction") === "rtl";
    const {id} = useParams();
    const {data, loading, isSuccess} = useSelector((state) => state.showPublicDocSlice);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(showPublicDoc({id}))
    }, [id, dispatch]);

    console.log(data)

    return isSuccess === false ? (<> <NoData/> </>) : (
        <>
            {loading ? <FirstLoadingCore loading={loading}/> : (
                <Container maxWidth={'xl'}>

                    <Stack direction={'column'} spacing={2}>
                        <Box sx={{
                            display: 'flex', margin: '50px', justifyContent: 'space-between', flexWrap: "wrap"
                        }}>
                            <Box sx={{display: 'flex', justifyContent: 'column'}}>
                                <Box sx={{display: 'inline-flex', alignItems: "center"}}>
                                    <Avatar size='md' address={data?.workspace?.logo}/>
                                    <Typography fontSize='30px'
                                                sx={{margin: '20px', fontSize: 13, whiteSpace: "nowrap"}}>
                                        {data?.workspace?.title}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Chip label={data?.workspace?.type} variant="outlined"/>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{mb: '20px'}}>
                            <Typography fontSize='15px'>
                                {data?.workspace?.description}
                            </Typography>
                        </Box>
                    </Stack>
                    <Divider sx={{margin: '20px'}}/>
                    <Box>
                        <Header>
                            <Box sx={{display: "inline-flex", alignItems: "center", gap: 2, marginBottom: '10px'}}>
                                <Typography fontWeight={"bold"} component={"h3"} variant={"h5"}>
                                    {data?.document?.title}
                                </Typography>
                            </Box>
                        </Header>
                        <Box sx={{display: "inline-flex", gap: 1, mt: 1}}>
                            <Typography>
                                {t("Description")}
                            </Typography>
                            :<Typography fontWeight={400} fontSize={14}
                                         lineHeight={1.9}>{data?.document?.description}</Typography>
                        </Box>
                        <Divider sx={{margin: '10px 0'}}/>
                        <Box sx={dir ? {
                            direction: 'ltr', padding: '20px', marginBottom: '20px'
                        } : {
                            direction: 'rtl', padding: '20px', marginBottom: '20px'
                        }}>
                            <div className={"body__Html"}
                                 dangerouslySetInnerHTML={{__html: `${data?.document?.body}`}}/>
                        </Box>
                        <Divider/>
                        <Grid container spacing={2} justifyContent={'center'} marginY={'20px'}>
                            <Grid item xs={6} md={3} lg={3}>
                                <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
                                    <ThumbUp/>
                                    <Typography>
                                        {data?.document?.likes}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={6} md={3} lg={3}>
                                <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
                                    <ThumbDown/>
                                    <Typography>
                                        {data?.document?.dislikes}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={6} md={3} lg={3}>
                                <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
                                    <VisibilityOutlined/>
                                    <Typography>
                                        {data?.document?.view}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={6} md={3} lg={3}>
                                <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
                                    <Star/>
                                    <Typography>
                                        {data?.document?.rate}
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Chip label={<Typography>
                            {data?.document?.user?.first_name + ' ' + data?.document?.user?.last_name}
                        </Typography>}
                              avatar={<Avatar address={data?.document?.user?.avatar}/>}
                              sx={{padding: '0 5px', marginY: '20px'}}
                              variant={"outlined"}/>

                    </Box>

                </Container>
            )}
        </>
    );
};

export default ShowDocument;
