import {useHistory} from "react-router-dom";
import {Avatar, CustomText, Editor, NoAccess} from "components";
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

const UpdateBody = () => {
    const [edit, setEdit] = useState({value: null});
    const [document, setDocument] = useState(null);

    const {loading: updateLoading} = useSelector((state) => state.UpdateKnowledgeSlice)
    const {loading: saveLoading} = useSelector((state) => state.SaveKnowledgeAsDocSlice)

    const {t} = useTranslation()
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        const data = history?.location?.state?.document
        setDocument(data)
    }, [history])

    useEffect(() => {
        if (document?.body !== undefined) setEdit(document?.body)
        setValue('description', document?.description)
    }, [document])

    const user = history?.location?.state?.user
    const id = history?.location?.state?.id

    const {
        register, handleSubmit, setValue, formState: {errors},
    } = useForm();

    const onSubmit = (data) => {
        let docClone = _.cloneDeep(document)
        let body = {
            document_id: id, description: data.description, body: edit
        }
        docClone.description = data?.description
        docClone.body = edit
        dispatch(UpdateKnowledge({data: body}))
            .then(res => setDocument(docClone))
    }
    const saveDoc = () => {
        dispatch(SaveKnowledgeAsDoc({id}))
    }

    if (document?.status_type === 'writing' && (document?.user?.id !== user?.id || document?.acceptor?.id !== user?.id)) {
        return <NoAccess/>
    } else {
        return (<Container maxWidth={'xl'}>
            <Stack spacing={2} direction={'column'} mb={5}>
                {/* header */}
                <Box sx={{display: 'flex', flexDirection: 'column'}} mt={5}>
                    <Typography>
                        {t('article')}
                        :
                        {'  ' + document?.title + '  '}
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} gap={1}>
                        <Typography>
                            {t('advanced')}
                            :
                        </Typography>
                        <Box display={"flex"}>
                            <Box sx={{gap: 2}}>
                                <Avatar address={document?.acceptor?.avatar} size={'sm'}/>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', margin: '0 5px'}}>
                                <Typography component={"span"}>{document?.acceptor?.first_name}</Typography>
                                <Typography
                                    component={"span"}
                                    sx={{margin: "0 4px", display: "inline-block"}}
                                >
                                    {document?.acceptor?.last_name}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                </Box>
                <Divider/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* body */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <CustomText
                                errors={errors}
                                register={register}
                                required={true}
                                title={t('Description')}
                                field={'description'}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Editor edit={edit} setEdit={setEdit}/>
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
                            title={t("DraftUpdate")}
                            type={"submit"}
                            disabled={edit?.value === null || edit === '<p><br></p>'}
                            loading={updateLoading}
                        />
                        <CoreBTN
                            sx={{borderRadius: 15, padding: "5px 12px"}}
                            variant={"contained"}
                            color={"primary"}
                            title={t("StoreAsDoc")}
                            disabled={edit?.value === null || edit === '<p><br></p>' || document?.body === null}
                            onClick={saveDoc}
                            loading={saveLoading}
                        />

                        <Button
                            sx={{borderRadius: 15, padding: "5px 12px"}}
                            variant={'contained'}
                            onClick={() => history.push(`/document/article/${id}`)}
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