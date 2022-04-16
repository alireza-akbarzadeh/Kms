import * as React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {showTicket} from "redux/features/ticket/showTicket";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Container, Divider, Grid, Paper, Stack, Typography} from "@mui/material";
import BadgeAvatars from "components/avatar";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {Close, CloudDownload} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import ShowTicketHeader from "./ShowTicketHeader";
import {CustomText} from "components";
import {FileUploader} from "helper";
import {UploadBtn} from "./Tickets.styled";
import {AnswerTicket} from "redux/features/ticket/answerTicket";
import {CloseTicket} from "redux/features/ticket/closeTicket";
import {LoadingCore} from "../../core";

const ShowTicket = () => {
    const [file, setFile] = useState(null);
    const {data, loading} = useSelector((state) => state.showTicket);
    let {id} = useParams();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(showTicket(id));
    }, [dispatch, id]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    const onSubmit = (req) => {
        const formData = new FormData();
        formData.append('ticket_id', id)
        if (file !== null) {
            formData.append('file', file[0]);
        }
        formData.append('message', req.newMessage)
        dispatch(AnswerTicket(formData))
            .then(res => {
                setValue('newMessage', '')
                dispatch(showTicket(id))
            })
    }

    const closeTicket = () => {
        dispatch(CloseTicket(id))
            .then(res => {
                dispatch(showTicket(id))
            })
    }

    const removeFile = () => {
        setFile(null)
    }

    return (
        <>
            {loading && <LoadingCore loading={loading}/>}
            <Container maxWidth={'xl'} sx={{marginTop: "50px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} sx={{height: '80vh', width: '100vh'}}>
                        <ShowTicketHeader data={data}/>
                        <Grid container spacing={2}>
                            <Grid xs={12} md={12} sx={{
                                margin: '50px',
                                height: '200px'
                            }}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <CustomText
                                        errors={errors}
                                        register={register}
                                        field={'newMessage'}
                                        required={true}
                                        placeholder={t('writeTicket')}
                                    />
                                    <Box sx={{flexGrow: 1}} marginTop={3}>
                                        <Grid container spacing={2} alignItems={'center'}>
                                            <Grid item xs={3}>
                                                <Button type='submit' color={'primary'} variant={'contained'} fullWidth>
                                                    {t('Save')}
                                                </Button>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button onClick={closeTicket} color={'secondary'} variant={'contained'}
                                                        fullWidth>
                                                    {t('CloseTicket')}
                                                </Button>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <FileUploader
                                                    src={file}
                                                    onFileUpload={setFile}
                                                    uploadMultiple={false}
                                                    showPreview={false}
                                                >
                                                    <UploadBtn variant="contained" component="label">
                                                        {file === null ? t("Upload_File") : file[0].name}
                                                        <input type="file" hidden/>
                                                    </UploadBtn>
                                                </FileUploader>
                                            </Grid>
                                            {file !== null && (
                                                <Grid item xs={1} onClick={removeFile} sx={{cursor: 'pointer'}}>
                                                    <Close/>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Box>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{height: '80vh', width: '100vh'}}>
                        <Paper
                            style={{
                                maxHeight: "80vh",
                                overflowY: "auto",
                                padding: "20px 10px",
                            }}
                        >
                            {data?.messages?.map((item, i) => (
                                <Box
                                    sx={
                                        item.sender_type === "admin"
                                            ? {
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                flexWrap: "wrap",
                                                width: "100%",
                                                gap: 1.4,
                                                position: "relative",
                                                flexDirection: "row-reverse"
                                            }
                                            : {
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                width: "100%",
                                                gap: 1.9,
                                                position: "relative",
                                                flexWrap: "wrap",
                                            }
                                    }
                                    key={i}
                                >
                                    <Box sx={{marginTop: 2}}>
                                        <BadgeAvatars address={item?.avatar} size="md"/>
                                    </Box>
                                    <Card
                                        sx={
                                            item.sender_type === "admin"
                                                ? {
                                                    background: "#8005d8",
                                                    justifyContent: "flex-start",
                                                    borderRadius: "0 50px 51px 50px",
                                                }
                                                : {
                                                    background: "#e3e8ec",
                                                    justifyContent: "flex-end",
                                                    borderRadius: "50px 0 50px 50px",

                                                }
                                        }
                                        elevation={2}

                                    >
                                        <Stack direction={"column"} spacing={1} marginTop={1}>
                                            <Typography
                                                marginTop={2}
                                                sx={
                                                    item.sender_type === "admin"
                                                        ? {
                                                            color: "#f9f9f9",
                                                            textAlign: "justify",
                                                            fontWeight: "500",
                                                        }
                                                        : {
                                                            color: "#181a20",
                                                            textAlign: "justify",
                                                            fontWeight: "500",
                                                        }
                                                }
                                            >
                                                {item.message}
                                            </Typography>
                                            <Divider
                                                sx={
                                                    item.sender_type === "admin"
                                                        ? {borderColor: "#f9f9f9"}
                                                        : {borderColor: "#181a20"}
                                                }
                                            />
                                            <Box sx={{display: "inline-flex", justifyContent: 'space-between'}}>
                                                <Typography
                                                    sx={
                                                        item.sender_type === "admin"
                                                            ? {
                                                                color: "#f9f9f9",
                                                                textAlign: "justify",
                                                                fontWeight: "500",
                                                            }
                                                            : {
                                                                color: "#181a20",
                                                                textAlign: "justify",
                                                                fontWeight: "500",
                                                            }
                                                    }
                                                >
                                                    {item.name}
                                                </Typography>
                                                <Box sx={
                                                    item.sender_type === "admin"
                                                        ? {
                                                            color: "#f9f9f9",
                                                            textAlign: "justify",
                                                            fontWeight: "500",
                                                            display: "inline-flex",
                                                        }
                                                        : {
                                                            color: "#181a20",
                                                            textAlign: "justify",
                                                            fontWeight: "500",
                                                            display: "inline-flex",
                                                        }
                                                }>
                                                    <Typography sx={{margin: "0 6px"}}>{item.time}</Typography>
                                                    <Typography>{item.date}</Typography>
                                                </Box>

                                            </Box>

                                            {item.file !== null ? (
                                                <Box
                                                    sx={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <a rel="noreferrer" target={"_blank"} href={item.file}>
                                                        <CloudDownload/>
                                                    </a>
                                                    {t("Sender_Files")}
                                                </Box>
                                            ) : null}
                                            <Box
                                                sx={
                                                    item.sender_type === "admin"
                                                        ? {
                                                            color: "#f9f9f9",
                                                            textAlign: "justify",
                                                            fontWeight: "500",
                                                            display: "inline-flex",
                                                        }
                                                        : {
                                                            color: "#181a20",
                                                            textAlign: "justify",
                                                            fontWeight: "500",
                                                            display: "inline-flex",
                                                        }
                                                }
                                            >
                                            </Box>
                                        </Stack>
                                    </Card>
                                </Box>
                            ))}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};
export default ShowTicket;

const Card = styled(Paper)`
  position: relative;
  margin-top: 30px;
  padding: 20px 40px;
  width: 60%;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 70%;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;
