import React, {useEffect, useState} from "react";
import { CoreBTN, ModalCore } from "core";
import { Box, FormControl, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ErrorCore } from "core";
import { updateRuleList } from "redux/features/customer-cnfig/updateRulesSlice";

import { TextBox, Input } from "../document/DocumentStyles";
import _ from "lodash";

const RulesUpdateModal = ({ openModal, setOpenModal, id, updateList, mainData , data}) => {
    const [submit, setSubmit] = useState(false)
    const { t } = useTranslation();
    const { isSuccess, loading} = useSelector((state) => state.updateRules);
    const dir = t("direction") === "rtl";
    let dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess && submit){
            setOpenModal(false)
        }
    }, [isSuccess, submit])

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    React.useEffect(() => {
        setValue("title", data?.title);
        setValue("body", data?.body);
    }, [data]);

    const onSubmit = (data) => {
        const newData = _.cloneDeep(mainData);
        const index = newData.data.data?.findIndex((item) => item.id === id);
        let indexData = newData.data.data[index];
        _.merge(indexData, { title: data?.title, body: data?.body, updated_at: new Date() });
        _.merge(newData.data.data[index], indexData);
        dispatch(updateRuleList({ id, data }))
            .then(response => {
                setSubmit(true)
                updateList(newData)
            })
        setSubmit(false)
    };

    return (
        <>
            <ModalCore title={t("Edit_Rules")} open={openModal} setOpen={setOpenModal}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth>
                        <Typography align={dir ? "right" : "left"} htmlFor="title">
                            {t("Title")}
                        </Typography>
                        <Input
                            dir={dir}
                            sx={{ margin: "10px 0" }}
                            className={`${errors.title && "Border_Error"} left_Radius`}
                            type={"text"}
                            id="title"
                            variant="outlined"
                            {...register("title", { required: true })}
                        />
                        {errors.title && <ErrorCore>{t("Requierd")}</ErrorCore>}
                    </FormControl>
                    <FormControl fullWidth>
                        <Typography align={dir ? "right" : "left"} htmlFor="title">
                            {t("Description")}
                        </Typography>
                        <TextBox
                            dir={dir}
                            style={{ height: "150px" }}
                            className={`${errors.body && "Border_Error"} left_Radius`}
                            type={"text"}
                            id="body"
                            variant="outlined"
                            {...register("body", { required: true })}
                        />
                        {errors.body && <ErrorCore>{t("Requierd")}</ErrorCore>}
                    </FormControl>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <CoreBTN
                            fullWidth
                            sx={{ borderRadius: 15, padding: "5px 12px" }}
                            variant={"contained"}
                            type={"submit"}
                            loading={loading}
                            color={"primary"}
                            title={t("Confirmation")}
                        />
                        <span style={{ width: "20px" }} />
                        {/* <Button
              fullWidth
              sx={{ borderRadius: 15, padding: "5px 12px" }}
              variant={"contained"}
              color={"secondary"}
              onClick={() => setOpenModal(false)}
            >
              {t("Cancel")}
            </Button> */}
                    </Box>
                </form>
            </ModalCore>
        </>
    );
};

export default RulesUpdateModal;
