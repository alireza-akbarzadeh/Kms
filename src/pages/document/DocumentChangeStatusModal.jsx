import {ModalCore} from "core";
import {Box, Button, Stack, TextField} from "@mui/material";
import CoreBTN from "core/CoreBTN";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import CustomInput from "components/Input/CustomInput";
import Select from "react-select";
import {DocumentChangeStatus} from "redux/features/document/DocumentChangeStatusSlice";
import {showArticle} from "../../redux/features/document/article/showArticelSlice";

const DocumentChangeStatusModal = ({document, openModal, setOpenModal}) => {
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [submit, setSubmit] = useState(null)
    const {t} = useTranslation();
    const {loading, isSuccess} = useSelector((state) => state.DocumentChangeStatusSlice);
    const dispatch = useDispatch();
    const {
        register, handleSubmit, formState: {errors},
    } = useForm();

    useEffect(() => {
        setSelectedStatus({label: document?.status, value: document?.status_type})
    }, [document])

    const options = [{
        label: t('reject'), value: 'reject'
    }, {
        label: t('accept'), value: 'accept'
    }, {
        label: t('published'), value: 'publish'
    }, {
        label: t('need_review'), value: 'needReview'
    }]

    useEffect(() => {
        if (isSuccess && submit) {
            setOpenModal(false)
        }
    }, [submit, isSuccess])

    const onSubmit = (data) => {
        dispatch(DocumentChangeStatus({
            id: document?.id, comment: data?.comment, type: selectedStatus?.value
        }))
            .then(res => {
                setSubmit(true)
                dispatch(showArticle({id: document?.id, page: 1, perPage: 5}))
            })
        setSubmit(false)
    }

    return (<>
        <ModalCore
            title={t("Edit")}
            open={openModal}
            size="600px"
            setOpen={setOpenModal}
        >

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction={'column'} spacing={2}>

                    <Select
                        className="React_select"
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                        options={options}
                        placeholder={t("Select")}
                    />
                    <CustomInput
                        errors={errors}
                        register={register}
                        title={'comment'}
                        field={'comment'}
                        required={true}
                    />


                </Stack>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mt={4}
                >
                    <CoreBTN
                        sx={{borderRadius: 15, padding: "5px 12px", width: "100%"}}
                        variant={"contained"}
                        color={"primary"}
                        title={t("Confirmation")}
                        type={'submit'}
                        loading={loading}
                        disabled={document.status_type === selectedStatus?.value}
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
    </>);
}
export default DocumentChangeStatusModal
