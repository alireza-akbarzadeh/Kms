import {useHistory} from "react-router-dom";
import {Avatar, CustomInput, CustomText, Editor, MarkDownEditor, NoAccess} from "components";
import React, {useEffect, useState} from "react";
import {Container, Stack, Box, Typography, Divider, Button, Grid} from "@mui/material";
import {useTranslation} from "react-i18next";
import {ArrowBack} from "@mui/icons-material";
import CoreBTN from "core/CoreBTN";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {UpdateKnowledge} from "redux/features/document/knowledge/updateKnowledge";
import {SaveKnowledgeAsDoc} from "redux/features/document/knowledge/saveKnowledgeAsDoc";
import _ from 'lodash'
import {UpdateDocument, UpdateDocumentSlice} from "../../redux/features/document/UpdateDocumentSlice";
import {StoreContribute, StoreContributeSlice} from "../../redux/features/document/Contribute/Store";

const UpdateBody = () => {
    const [edit, setEdit] = useState({value: null});
    const [value, setEditorValue] = React.useState("");
    const [document, setDocument] = useState(null);

    const {loading: updateLoading} = useSelector((state) => state.UpdateDocumentSlice)
    const {loading: contributeLoading} = useSelector((state) => state.StoreContributeSlice)


    const {t} = useTranslation()
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        const data = history?.location?.state?.document
        setDocument(data)
    }, [history])

    useEffect(() => {
        if (document?.body !== undefined) {
            if (document?.body_type === 'html') {
                setEdit(document?.body)
            } else {
                setEditorValue(document?.body)
            }
        }
        setValue('description', document?.description)
        setValue('title', document?.title)
    }, [document])

    const user = history?.location?.state?.user
    const id = history?.location?.state?.id

    const {
        register, handleSubmit, setValue, formState: {errors},
    } = useForm();


    const onSubmit = (data) => {
        let body = {
            document_id: id, description: data.description, body: edit
        }

        if (document?.type === 'article') {
            let docClone = _.cloneDeep(document)
            docClone.description = data?.description
            if (document?.body_type === 'html') {
                docClone.body = edit
                body = {...body, body: edit}
            } else {
                docClone.body = value
                body = {...body, body: value}
            }
            docClone.title = data?.title

            dispatch(UpdateDocument({id: id, data: body}))
                .then(res => setDocument(docClone))
        } else {
            if (document?.body_type === 'html') {
                body = {...body, body: edit, title: data?.title}
            } else {
                body = {...body, body: value, title: data?.title}
            }
            dispatch(StoreContribute({data: body}))
                .then(res => {
                    history.push(`/document/${document?.type}/${id}`)
                })
        }

    }
    if (document?.status_type === 'writing' && (document?.user?.id !== user?.id || document?.acceptor?.id !== user?.id)) {
        return <NoAccess/>
    } else {
        return (<Container maxWidth={'xl'}>
            <Stack spacing={2} direction={'column'} mb={5}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} my={5} gap={2}>
                    <Typography fontWeight={'bold'}>
                        {t('Author')}
                        :
                    </Typography>
                    <Box display={"flex"}>
                        <Box sx={{gap: 2}}>
                            <Avatar address={document?.user?.avatar}/>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center', margin: '0 5px'}}>
                            <Typography component={"span"}>{document?.user?.first_name}</Typography>
                            <Typography
                                component={"span"}
                                sx={{margin: "0 4px", display: "inline-block"}}
                            >
                                {document?.user?.last_name}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Box sx={{width: '50%'}}>
                                <CustomInput
                                    errors={errors}
                                    register={register}
                                    required={true}
                                    title={t('Title')}
                                    field={'title'}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box sx={{width: '50%'}}>
                                <CustomText
                                    errors={errors}
                                    register={register}
                                    required={true}
                                    title={t('Description')}
                                    field={'description'}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            {document?.body_type === 'html' ?
                                <Editor edit={edit} setEdit={setEdit}/> :
                                <MarkDownEditor value={value} setValue={setEditorValue}/>}
                        </Grid>
                    </Grid>

                    {/* footer */}
                    <Box
                        gap={2}
                        sx={{
                            display: 'flex', alignItems: 'center', margin: '10px 5px', justifyContent: 'flex-end'
                        }}>
                        <CoreBTN
                            sx={{borderRadius: 15, padding: "5px 12px"}}
                            variant={"contained"}
                            color={"info"}
                            title={document?.type === 'article' ? t("StoreAsDoc") : t("Contribute")}
                            type={"submit"}
                            disabled={(edit?.value === null || edit === '<p><br></p>') && value === ""}
                            loading={document?.type === 'article' ? updateLoading : contributeLoading}
                        />
                        <Button
                            sx={{borderRadius: 15, padding: "5px 12px"}}
                            variant={'contained'}
                            onClick={() => history.push(`/document/${document?.type}/${id}`)}
                            color={'secondary'}>
                            {t('Back')}
                            <ArrowBack sx={{margin: '0 5px'}}/>
                        </Button>
                    </Box>
                </form>
            </Stack>
        </Container>)
    }
}
export default UpdateBody