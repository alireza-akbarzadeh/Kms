import React, {useEffect, useState} from "react";
import {ModalCore} from "core";
import {Box, Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Dropzone, FileItem} from "@dropzone-ui/react";
import {CloudUpload} from '@mui/icons-material';
import {CoreBTN} from "core";
import _ from "lodash"
import {CustomInput} from "components";
import {storeResources} from "redux/features/project/Resources/storeResources";
import {showResources} from "redux/features/project/Resources/showResourcesList";

const StoreResources = ({openModal, setOpenModal, id}) => {
    const [files, setFile] = React.useState([]);
    const {t} = useTranslation();
    const [submit, setSubmit] = useState(false)
    const {loading, isSuccess} = useSelector((state) => state.storeResourcesSlice)

    const dispatch = useDispatch();

    const updateFiles = (incomingFiles) => {
        const newFiles = _.last(incomingFiles)
        setFile([newFiles]);
    };

    useEffect(() => {
        if (isSuccess && submit){
            setOpenModal(false)
        }
    }, [isSuccess, submit])

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("version", data.version);
        formData.append("project_id", id);
        if (files !== null) {
            formData.append("doc", files[0]?.file);
        }
        dispatch(storeResources(formData))
            .then(res => {
                setSubmit(true)
                dispatch(showResources(id))
            })
        setSubmit(false)
    };
    return (
        <>
            <ModalCore
                title={t("Edit_Account")}
                open={openModal}
                size="500px"
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
                            errors={errors}
                            register={register}
                            title={t('Version')}
                            field='version'
                            placeholder={t("Please_Enter_Your_doc_Version")}
                            required={true}
                        />
                        <Box sx={{marginTop: 2}}>
                            <Dropzone
                                footer={false}
                                header={false}
                                label={<CloudUpload sx={{
                                    fontSize: '100px'
                                }}/>}
                                onChange={updateFiles}
                                value={files}>
                                {files.map((file) => (
                                    <FileItem {...file} preview/>
                                ))}
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
        </>
    );
};
export default StoreResources;