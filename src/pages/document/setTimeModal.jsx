import * as React from 'react';
import {Box, Stack, Button} from '@mui/material';
import {useTranslation} from "react-i18next";
import WikiSvg from "assets/wiki.png"
import {ModalCore} from "core";
import CustomInput from "components/Input/CustomInput";
import CoreBTN from "core/CoreBTN";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {SetReadTime} from "redux/features/document/stuff/setReadTime";
import {showArticle} from "redux/features/document/article/showArticelSlice";
import {useEffect, useState} from "react";

const SetTimeModal = ({id, time, setOpenModal, openModal}) => {
    const [submit, setSubmit] = useState(false)
    const {t} = useTranslation();
    const dir = t("direction") === "rtl";
    const dispatch = useDispatch()
    const {
        register, handleSubmit, setValue, formState: {errors},
    } = useForm();
    const {isSuccess, loading} = useSelector((state) => state.SetReadTimeSlice)

    useEffect(() => {
        if (isSuccess && submit){
            setOpenModal(false)
        }
    }, [isSuccess, submit])

    const onSubmit = (data) => {
        dispatch(SetReadTime({
            document_id: id,
            time: data?.time
        }))
            .then(res => {
                setSubmit(true)
                dispatch(showArticle({id: id, page: 1, perPage: 5}))
            })
        setSubmit(false)
    }

    setValue('time', time)

    return (
        <ModalCore
            title={t("ReadTime")}
            open={openModal}
            size="600px"
            setOpen={setOpenModal}
        >

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction={'column'} spacing={2}>

                    <CustomInput
                        errors={errors}
                        register={register}
                        title={t('minutes')}
                        field={'time'}
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
    );
}
export default SetTimeModal