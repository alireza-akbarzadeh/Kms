import {ModalCore} from "core";
import {useTranslation} from "react-i18next";
import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    Switch,
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
import {UpdateTeam} from "redux/features/project/Teams/UpdateTeamSlice";

const EditTeamModal = ({openModal, setOpenModal, data}) => {
    const [files, setFiles] = React.useState([]);
    const [header, setHeader] = React.useState([]);
    const [active, setActive] = React.useState(null);
    const [submit, setSubmit] = React.useState(false);
    const {isSuccess, loading} = useSelector((state) => state.UpdateTeam)
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        setValue,
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
        formData.append('active', active)
        dispatch(UpdateTeam({
            id: data?.id,
            data: formData
        })).then(res => {
            setSubmit(true)
        })
        setSubmit(false)
    }

    useEffect(() => {
        setActive(data?.active)
        setValue('title', data?.title)
        setValue('description', data?.description)
    }, [data])


    return (
        <ModalCore
            size={'1000px'}
            title={t("Edit")}
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
                        <FormControlLabel
                            control={<Switch defaultChecked onChange={(e, checked) => setActive(checked)}/>}
                            label={active ? t('Active') : t('DeActive')}/>
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