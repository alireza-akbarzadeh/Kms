import React, {useEffect, useState} from "react";
import {ModalCore} from "core";
import {Box, Button, FormControl, InputLabel} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {ERROR} from "pages/Login/Styled_Login";
import {UpdateUserAction} from "redux/features/users/updateUserRolesSlice";
import {CoreBTN} from "core";
import Select from "react-select";
import _ from "lodash";

const UpdateUserRoles = ({
                             openModal,
                             setOpenModal,
                             mainData,
                             updateHandler,
                         }) => {
    const {t} = useTranslation();
    const [submit, setSubmit] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const {loading, isSuccess} = useSelector((state) => state.updateUserRoles);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        if (isSuccess && submit) {
            setOpenModal(false);
        }
    }, [isSuccess, submit]);


    useEffect(() => {
        const values = openModal?.data?.type?.map((item) => {
            return {
                value: item,
                label: t(item),
            }
        })
        setSelectedStatus( values)
    }, [openModal])

    const onSubmit = (data) => {
        const id = openModal?.id;
        const roles = selectedStatus?.map((item) => {
            return item?.value
        });

        const newData = _.cloneDeep(mainData);
        const index = newData.data.data?.findIndex((item) => item.id === id);
        let indexData = newData.data.data[index];
        _.merge(indexData, {type: roles});
        _.merge(newData.data.data[index], indexData);

        dispatch(UpdateUserAction({id, data : {roles: roles}})).then((res) => {
            setSelectedStatus([])
            setSubmit(true);
        });
        setSubmit(false);
        updateHandler(newData);
    };
    const options = [
        {
            value: "advanced",
            label: t("advanced"),
        },
        {
            value: "admin",
            label: t("admin"),
        },
        {
            value: "hr",
            label: t("hr"),
        },
        {
            value: "expert",
            label: t("expert"),
        },
        {
            value: "user",
            label: t("user"),
        },
        {
            value: "guest",
            label: t("guest"),
        },
    ];

    return (
        <>
            <ModalCore
                title={t("Password_settings")}
                open={openModal?.modal}
                setOpen={setOpenModal}
            >
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputLabel sx={{mb: 1}} htmlFor="my-input">
                            {t("Role")}
                        </InputLabel>
                        <Select
                            isMulti
                            className="React_select"
                            value={selectedStatus}
                            onChange={setSelectedStatus}
                            options={options}
                            placeholder={t("Select")}
                        />
                        {errors.agency && <ERROR>{t("Requierd")}</ERROR>}
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
                                type={"submit"}
                                title={t("Confirmation")}
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

export default UpdateUserRoles;
