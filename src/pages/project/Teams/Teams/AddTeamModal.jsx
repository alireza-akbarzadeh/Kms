import {LoadingCore, ModalCore} from "core";
import {useTranslation} from "react-i18next";
import {
    Box,
    Button,
    Grid,
    Typography
} from "@mui/material";
import {CustomInput, CustomText} from "components";
import {useForm} from "react-hook-form";
import {CloudUpload} from "@mui/icons-material";
import {Dropzone, FileItem} from "@dropzone-ui/react";
import React, {useEffect} from "react";
import _ from "lodash";
import CoreBTN from "core/CoreBTN";
import {useDispatch, useSelector} from "react-redux";
import {StoreTeam} from "redux/features/project/Teams/StoreTeam";
import {getTeamsList} from "../../../../redux/features/project/Teams/getTeamList";

const EditTeamModal = ({openModal, setOpenModal}) => {
    const [files, setFiles] = React.useState([]);
    const [header, setHeader] = React.useState([]);
    const [submit, setSubmit] = React.useState(false);
    const {isSuccess, loading} = useSelector((state) => state.StoreTeam)
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        if (isSuccess && submit) {
            setOpenModal(false)
        }
    }, [isSuccess, submit])

    const updateFiles = (incomingFiles) => {
        const newFiles = _.last(incomingFiles)
        setFiles([newFiles]);
    };

    const updateHeader = (incomingFiles) => {
        const newFiles = _.last(incomingFiles)
        setHeader([newFiles]);
    };


    const handleUpdateTeam = (req) => {
        let formData = new FormData();
        if (files.length > 0) {
            formData.append("avatar", files[0]?.file);
        }
        if (header.length > 0) {
            formData.append("header", header[0]?.file);
        }
        formData.append('title', req.title)
        formData.append('description', req.description)

        dispatch(StoreTeam({data: formData}))
            .then(res => {
                setSubmit(true)
                dispatch(getTeamsList({page: 1, perPage: 15, search: null, filters: null}))
            })
        setSubmit(false)
    }

    return (
        <ModalCore
            size={'1000px'}
            title={t("Save")}
            open={openModal}
            setOpen={setOpenModal}
        >
            <form onSubmit={handleSubmit(handleUpdateTeam)}>
                <Grid
                    container
                    spacing={4}
                    alignItems={'center'}
                >
                    <Grid item xs={12} md={6}>
                        <CustomInput
                            errors={errors}
                            register={register}
                            title={t('Title')}
                            field='title'
                            required={true}
                        />
                        <CustomText
                            maxRow={5}
                            errors={errors}
                            register={register}
                            title={t('Description')}
                            field='description'
                            type='text'
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Dropzone
                            footer={false}
                            header={false}
                            label={
                                <Box>
                                    <CloudUpload sx={{fontSize: '100px'}}/>
                                    <Typography>{t('Avatar')}</Typography>
                                </Box>
                            }
                            onChange={updateFiles}
                            value={files}>
                            {files.map((file) => (
                                <FileItem {...file} preview/>
                            ))}
                        </Dropzone>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Dropzone
                            footer={false}
                            header={false}
                            label={
                                <Box>
                                    <CloudUpload sx={{fontSize: '100px'}}/>
                                    <Typography>{t('Header')}</Typography>
                                </Box>
                            }
                            onChange={updateHeader}
                            value={header}>
                            {header.map((file) => (
                                <FileItem {...file} preview/>
                            ))}
                        </Dropzone>
                    </Grid>
                </Grid>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mt={4}
                >
                    <CoreBTN
                        loading={loading}
                        sx={{borderRadius: 15, padding: "5px 12px", width: "100%"}}
                        variant={"contained"}
                        color={"primary"}
                        title={t("Confirmation")}
                        type={"submit"}
                    />
                    <Button
                        sx={{borderRadius: 15, padding: "5px 12px", margin: "0 15px"}}
                        variant={"contained"}
                        color={"secondary"}
                        fullWidth
                        onClick={() => setOpenModal(false)}
                    >
                        {t("Cancel")}
                    </Button>
                </Box>
            </form>

        </ModalCore>
    )
}

export default EditTeamModal