import React from "react";
import {Box, Button, Chip, Container, Divider, Grid, Typography} from "@mui/material";
import {Avatar, CustomInput, CustomText} from "components";
import {useDispatch, useSelector} from "react-redux";
import LoadingCore from "core/LoadingCore";
import {CloudUpload, WorkspacePremium} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import {Dropzone, FileItem} from "@dropzone-ui/react";
import _ from "lodash";
import {useTranslation} from "react-i18next";
import {updateWorkspace} from "redux/features/customer-cnfig/updateWorkspace";
import {CheckRole} from "../../../helper";


const UpdateWorkspace = () => {

    const {data, loading} = useSelector((state) => state.user);
    const [files, setFiles] = React.useState([]);
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const {
        register, handleSubmit, setValue, formState: {errors},
    } = useForm();

    const updateFiles = (incomingFiles) => {
        const newFiles = _.last(incomingFiles)
        setFiles([newFiles]);
    };

    setValue('title', data?.data?.customer?.title)
    setValue('description', data?.data?.customer?.description)

    const doUpdateWorkspace = (data) => {
        let formData = new FormData();
        if (files.length !== 0) {
            formData.append("logo", files[0]?.file);
        }
        formData.append('title', data?.title);
        formData.append('description', data?.description)

        dispatch(updateWorkspace(formData))
    }

    return (<>
            {loading && (<LoadingCore loading={loading}/>)}
            <Container>
                <Box sx={{
                    display: 'flex', flexDirection: 'column',
                }}>
                    <Box sx={{
                        display: 'flex', margin: '50px', justifyContent: 'space-between', flexWrap: "wrap"
                    }}>
                        <Box sx={{display: 'flex', justifyContent: 'column'}}>
                            <Box sx={{display: 'inline-flex', alignItems: "center"}}>
                                <Avatar size='md' address={data?.data?.customer?.logo}/>
                                <Typography fontSize='30px' sx={{margin: '20px', fontSize: 13, whiteSpace: "nowrap"}}>
                                    {data?.data?.customer?.title}
                                </Typography>
                            </Box>
                            <Box>
                                <Chip label={data?.data?.customer?.type} variant="outlined"/>
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography fontSize='30px' sx={{margin: '20px'}}>
                                {data?.data?.customer?.unique_number}
                            </Typography>
                            <WorkspacePremium sx={{fontSize: '50px'}}/>
                        </Box>
                    </Box>
                    <Box sx={{mb: '20px'}}>
                        <Typography fontSize='15px' sx={{margin: '20px'}}>
                            {data?.data?.customer?.description}
                        </Typography>
                    </Box>
                    {CheckRole({roles: data?.data?.type, page: 'workspaceInfo', part: 'update'}) && (
                        <>
                            <Divider sx={{margin: '0 40px'}}/>
                            <form onSubmit={handleSubmit(doUpdateWorkspace)}>
                                <Grid container spacing={3} alignItems={'center'} mt={2}>
                                    <Grid item xs={'12'} md={'6'}>
                                        <CustomInput
                                            errors={errors}
                                            register={register}
                                            title={t('Title')}
                                            field={'title'}
                                            placeholder={data?.data?.customer?.title}
                                        />
                                        <CustomText
                                            errors={errors}
                                            register={register}
                                            title={t('Description')}
                                            field={'description'}
                                            placeholder={data?.data?.customer.description}
                                        />
                                    </Grid>
                                    <Grid item xs={'12'} md={'6'}>
                                        <Dropzone
                                            footer={false}
                                            header={false}
                                            label={<Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                <CloudUpload sx={{fontSize: '100px'}}/>
                                                <Typography>
                                                    {t('Avatar')}
                                                </Typography>
                                            </Box>}
                                            onChange={updateFiles}
                                            value={files}>
                                            {files.map((file) => (
                                                <FileItem {...file} preview/>
                                            ))}
                                        </Dropzone>
                                    </Grid>
                                </Grid>
                                <Box sx={{minWidth: '80%', display: 'flex', justifyContent: 'center', mt: 10}}>
                                    <Button type='submit' variant="contained" sx={{maxWidth: '60%'}}>
                                        {t("Confirmation")}
                                    </Button>
                                </Box>
                            </form>
                        </>
                    )}

                </Box>
            </Container>
        </>

    )
}

export default UpdateWorkspace