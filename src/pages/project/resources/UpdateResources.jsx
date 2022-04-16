import React, {useEffect} from "react";
import {Box, Button, Switch, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Dropzone, FileItem} from "@dropzone-ui/react";
import {CloudUpload} from '@mui/icons-material';
import {CoreBTN, ModalCore} from "core";
import _ from "lodash"
import {CustomInput} from "components";
import {UpdateProjectDocs} from "redux/features/project/Resources/UpdateResourcesSlice";

const UpdateResources = ({openModal, setOpenModal, id, data}) => {
    const [file, setFile] = React.useState([]);
    const [checked, setChecked] = React.useState(false);
    const [submit, setSubmit] = React.useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const {t} = useTranslation();

    const {loading, isSuccess} = useSelector((state) => state.updateResources)
    const dispatch = useDispatch();

    const updateFiles = (incomingFiles) => {
        const newFiles = _.last(incomingFiles)
        setFile([newFiles]);
    };


    useEffect(()=> {
        if (isSuccess && submit){
            setOpenModal(false)
        }
    }, [isSuccess, submit])

    const {
        register, handleSubmit, setValue, formState: {errors},
    } = useForm();

    React.useEffect(() => {
        if (data) {
            setValue("title", data.title);
            setValue("version", data.version);
            setChecked(data?.active === 1)
        }
    }, [data]);

    const onSubmit = (requestData) => {
        const formData = new FormData();
        if (file.length !== 0) {
            formData.append("file", file[0].file);
        }
        formData.append("doc_id", data.id);
        formData.append("title", requestData.title);
        formData.append("version", requestData.version);
        formData.append("active", checked ? "1" : "0");
        dispatch(UpdateProjectDocs({
            id: id,
            data: formData
        }))
            .then(res => {
                setSubmit(true)
            })
        setSubmit(false)
    };
    return (<>
        <ModalCore
            title={t("Edit_Resources")}
            open={openModal}
            size="600px"
            setOpen={setOpenModal}
        >
            <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CustomInput
                        errors={errors}
                        register={register}
                        title={t('Title')}
                        field='title'
                        placeholder={t("Please_Enter_Your_doc_Title")}
                        required={true}
                    />
                    <CustomInput
                        type={"text"}
                        errors={errors}
                        register={register}
                        title={t('Version')}
                        field='version'
                        placeholder={t("Please_Enter_Your_doc_Version")}
                        required={true}
                    />
                    <Box sx={{display: "inline-flex", gap: 1, alignItems: "center", margin: "20px 0"}}>
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                        <Typography>{checked ? t("Active") : t("DeActive")}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >

                        <Dropzone
                            footer={false}
                            header={false}
                            label={<CloudUpload sx={{
                                fontSize: '100px'
                            }}/>}
                            onChange={updateFiles}
                            value={file}>
                            {file.map((itemFile) => (<FileItem {...itemFile} preview/>))}
                        </Dropzone>
                    </Box>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        mt={4}
                    >
                        <CoreBTN
                            loading={loading}
                            sx={{borderRadius: 15, padding: "5px 12px"}}
                            variant={"contained"}
                            color={"primary"}
                            title={t("Confirmation")}
                            type={"submit"}
                        />
                        <Button
                            sx={{borderRadius: 15, padding: "5px 12px", margin: "0 15px"}}
                            variant={"contained"}
                            color={"secondary"}
                            onClick={() => setOpenModal(false)}
                        >
                            {t("Cancel")}
                        </Button>
                    </Box>

                </form>
            </Box>
        </ModalCore>
    </>);
};
export default UpdateResources;