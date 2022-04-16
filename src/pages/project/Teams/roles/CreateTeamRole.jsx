import React, {useEffect, useState} from "react";
import {ModalCore} from "core";
import {Box, Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {createTeamRole} from "redux/features/project/TeamRoles/storeTeamRolesSlice";
import {CoreBTN} from "core";
import {CustomInput} from "components";
import {getTeamRoles} from "redux/features/project/TeamRoles/getTeamRolsSlice";

const CreateTeamRole = ({openModal, setOpenModal}) => {
    const {t} = useTranslation();
    let dir = t("direction") === "rtl";
    const [submit, setSubmit] = useState(false);
    const {loading, isSuccess} = useSelector((state) => state.storeTeams);


    useEffect(() => {
        if (isSuccess && submit){
            setOpenModal(false)
        }
    }, [isSuccess, submit])

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = (data) => {
        dispatch(createTeamRole(data))
            .then(res => {
                setSubmit(true)
                dispatch(getTeamRoles())
            })
        setSubmit(false)
    };

    return (
        <>
            <ModalCore
                title={t("Create")}
                open={openModal}
                setOpen={setOpenModal}
            >
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CustomInput
                            errors={errors}
                            register={register}
                            title={t('Title')}
                            field='title'
                            required={true}
                            type="text"
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

export default CreateTeamRole;
