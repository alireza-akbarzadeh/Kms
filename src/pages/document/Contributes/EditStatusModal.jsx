import React, {useEffect, useState} from 'react';
import {ModalCore} from "core";
import {Box, Button, Stack} from "@mui/material";
import Select from "react-select";
import CoreBTN from "core/CoreBTN";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {ContributeChangeStatus} from "redux/features/document/Contribute/ContributeChangeStatusSlice";
import {IndexContribute} from "redux/features/document/Contribute";

const EditStatusModal = ({openModal, setOpenModal,documentId, t, params}) => {
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [submit, setSubmit] = useState(null)
    const {loading, isSuccess} = useSelector((state) => state.ContributeChangeStatusSlice);
    const dispatch = useDispatch();
    const {
        handleSubmit,
    } = useForm();



    useEffect(() => {
        setSelectedStatus({label: openModal?.status, value: openModal?.status_type})
    }, [openModal])

    const options = [{
        label: t('reject'), value: 'reject'
    }, {
        label: t('accept'), value: 'accept'
    }, {
        label: t('published'), value: 'publish'
    }]

    useEffect(() => {
        if (isSuccess && submit) {
            setOpenModal(false)
        }
    }, [submit, isSuccess])


    const onSubmit = (req) => {
        dispatch(ContributeChangeStatus({
            id: openModal?.id, type: selectedStatus?.value
        }))
            .then(res => {
                setSubmit(true)
                dispatch(IndexContribute({
                    id: documentId,
                    page: params.page,
                    perPage: params.perPage,
                    show: false,
                    filters: params.filters,
                    search: params.search
                }))
            })
        setSubmit(false)
    }

    return (<ModalCore
            title={t("Status")}
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
                        disabled={openModal.status_type === selectedStatus?.value}
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


        </ModalCore>);
};

export default EditStatusModal;