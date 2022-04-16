import React, {useEffect, useState} from "react";
import {ModalCore} from "../../core";
import {Alert, Box, Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {CoreBTN} from "core";
import {CustomInput} from "components";
import {updateEvaluateList} from "redux/features/customer-cnfig/updateEvaluateList";
import {gteEvaluateList} from "redux/features/customer-cnfig/configEvaluateList";
import LoadingCore from "../../core/LoadingCore";

const EvaluateSetting = ({openModal, setOpenModal}) => {
    const [submit, setSubmit] = useState(false)
    const {t} = useTranslation();
    const {loading, isSuccess} = useSelector((state) => state.updateEvaluateList);
    const configEvaluateList = useSelector((state) => state.configEvaluateList);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(gteEvaluateList())

    }, [dispatch]);
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

    useEffect(() => {
        if (configEvaluateList?.data) {
            setValue("start_evaluate_day", configEvaluateList?.data?.start_evaluate_day);
            setValue("end_evaluate_day", configEvaluateList?.data?.end_evaluate_day);
        }
    }, [configEvaluateList]);

    const onSubmit = (data) => {
        dispatch(updateEvaluateList(data))
            .then(res => {
                setSubmit(true)
            })
        setSubmit(false)
    };

    return (
        <>
            <ModalCore
                title={t("Evalute_Config")}
                open={openModal}
                size="400px"
                setOpen={setOpenModal}
            >
                <Box>
                    <Alert severity="info">بازه مجاز ارزیابی کارمندان (عددی بین ۱ تا ۳۰ انتخاب کنید)</Alert>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CustomInput
                            errors={errors}
                            register={register}
                            title={t('Start_Evaluate_Day')}
                            field='start_evaluate_day'
                            placeholder={t("Please_Enter_Your_Start_Evaluate_Day")}
                            required={true}
                        />
                        <CustomInput
                            errors={errors}
                            register={register}
                            title={t('End_evaluate_day')}
                            field='end_evaluate_day'
                            placeholder={t("Please_Enter_Your_End_evaluate_day")}
                            required={true}
                        />
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
export default EvaluateSetting;