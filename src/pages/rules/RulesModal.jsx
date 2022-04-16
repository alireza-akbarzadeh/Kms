import React, {useEffect, useState} from "react";
import {CoreBTN, ModalCore} from "core";
import {Box, Button, FormControl, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {ErrorCore} from "core";
import {addRulesCusetomer} from "redux/features/customer-cnfig/addRulesSlice";
import {TextBox, Input} from "../document/DocumentStyles";
import {gteRulesList} from "../../redux/features/customer-cnfig/rulesListSlice";

const RulesModal = ({openModal, setOpenModal}) => {
    const [submit, setSubmit] = useState(false)

    const {t} = useTranslation();
    const {loading, error, isSuccess} = useSelector((state) => state.addRules);
    const dir = t("direction") === "rtl";
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess && submit) {
            setOpenModal(false)
        }
    }, [isSuccess, submit])

    const onSubmit = (data) => {
        dispatch(addRulesCusetomer(data))
            .then(response => {
                setSubmit(true)
                dispatch(gteRulesList());
            })
        setSubmit(false)
    };

    return (
        <>
            <ModalCore title={t("Add_Rules")} open={openModal} setOpen={setOpenModal}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth>
                        <Typography align={dir ? "right" : "left"} htmlFor="title">
                            {t("Title")}
                        </Typography>
                        <Input
                            dir={dir}
                            sx={{margin: "10px 0"}}
                            className={`${errors.title && "Border_Error"} left_Radius`}
                            type={"text"}
                            id="title"
                            variant="outlined"
                            {...register("title", {required: true})}
                        />
                        {errors.title && <ErrorCore>{t("Requierd")}</ErrorCore>}
                    </FormControl>
                    <FormControl fullWidth>
                        <Typography align={dir ? "right" : "left"} htmlFor="title">
                            {t("Description")}
                        </Typography>
                        <TextBox
                            dir={dir}
                            style={{height: "150px"}}
                            className={`${errors.body && "Border_Error"} left_Radius`}
                            type={"text"}
                            id="body"
                            variant="outlined"
                            {...register("body", {required: true})}
                        />
                        {errors.body && <ErrorCore>{t("Requierd")}</ErrorCore>}
                    </FormControl>
                    {error?.error && <ErrorCore>{error?.error}</ErrorCore>}
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

export default RulesModal;
