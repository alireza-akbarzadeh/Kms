import {ModalCore} from "core";
import CoreBTN from "core/CoreBTN";
import * as React from "react";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import CustomInput from "components/Input/CustomInput";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {acceptVacation} from "../../redux/features/mange/acceptVacationSlice";

const LeaveRequestCommentModal = ({openModal, setOpenModal,handleStatus, id, type}) => {
    const [submit, setSubmit] = useState(false)
    const {t} = useTranslation()
    const {loading: loading, isSuccess} = useSelector((state) => state.acceptVacation);
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (isSuccess && submit){
            setOpenModal(false)
        }
    }, [isSuccess, submit])

    const onSubmit = (req) => {
        dispatch(acceptVacation({id: id, status: type, comment: req.comment}))
            .then(res => {
                setSubmit(true)
                handleStatus(id, type, req.comment)
            })
        setSubmit(false)
    }

    return (
        <ModalCore
            title={t("AcceptLeave")}
            open={openModal}
            setOpen={setOpenModal}
            size={"400px"}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                    errors={errors}
                    register={register}
                    field={'comment'}
                    title={t(type + 'LeaveComment')}
                    required={true}
                />

                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mt={4}
                >
                    <CoreBTN
                        sx={{ borderRadius: 15, padding: "5px 12px", width: "100%" }}
                        variant={"contained"}
                        color={"primary"}
                        title={t("Confirmation")}
                        type={'submit'}
                        loading={loading}
                    />
                    <Button
                        sx={{ borderRadius: 15, padding: "5px 12px", margin: "0 15px" }}
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
export default LeaveRequestCommentModal