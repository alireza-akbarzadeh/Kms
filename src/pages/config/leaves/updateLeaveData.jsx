import React, {useEffect, useState} from "react";
import {CoreBTN, ModalCore} from "core";
import {Box, Button, Stack} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {updateConfigLeave} from "redux/features/customer-cnfig/updateConfigLeave";
import {CustomInput} from "components";
import {useForm} from "react-hook-form";

const UpdateLeaveConfig = ({openModal, setOpenModal, data}) => {
    const [submit, setSubmit] = useState(false)
    const {t} = useTranslation();
    const {loading, isSuccess} = useSelector((state) => state.updateConfigLeave);
    const isFirstRender = React.useRef(true)

    const dispatch = useDispatch();

    const onSubmit = (req) => {
        dispatch(updateConfigLeave(req))
            .then(res => {
                setSubmit(true)
            })
        setSubmit(false)
    };

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


    React.useEffect(() => {
        if (isSuccess && !isFirstRender.current) {
            setOpenModal(false);
        } else {
            isFirstRender.current = false
        }
    }, [isSuccess])


    setValue('sick', data?.sick)
    setValue('earned', data?.earned)
    setValue('start_month', data?.startMonth)

    return (
        <>
            <ModalCore
                title={t("LeaveSetting")}
                open={openModal}
                setOpen={setOpenModal}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction={'column'} spacing={2} sx={{marginBottom: '10px'}}>
                        <CustomInput
                            errors={errors}
                            register={register}
                            title={'earnedLeave'}
                            field={'earned'}
                            required={true}
                        />
                        <CustomInput
                            errors={errors}
                            register={register}
                            title={'sickLeave'}
                            field={'sick'}
                            required={true}
                        />
                        <CustomInput
                            errors={errors}
                            register={register}
                            title={'start_month'}
                            field={'start_month'}
                            required={true}
                        />
                    </Stack>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <CoreBTN
                            fullWidth
                            sx={{borderRadius: 15, padding: "5px 12px"}}
                            variant={"contained"}
                            type={"submit"}
                            loading={loading}
                            color={"primary"}
                            title={t("Confirmation")}
                        />
                        <span style={{width: "20px"}}/>
                        <Button
                            fullWidth
                            sx={{borderRadius: 15, padding: "5px 12px"}}
                            variant={"contained"}
                            color={"secondary"}
                            onClick={() => setOpenModal(false)}
                        >
                            {t("Cancel")}
                        </Button>
                    </Box>
                </form>
            </ModalCore>
        </>
    );
};

export default UpdateLeaveConfig;
