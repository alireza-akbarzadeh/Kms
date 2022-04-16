import React, {useEffect} from "react";
import {ModalCore} from "core";
import {Box, Button, Switch} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {updateTeamRole} from "redux/features/project/TeamRoles/updateTeamRoleSlice";
import {CoreBTN} from "core";
import {CustomInput} from "components";
import _ from 'lodash'

const UpdateTeamRoles = ({updateData, mainData, openModal, setOpenModal, id, title, active}) => {
    const {t} = useTranslation();
    const [checked, setChecked] = React.useState(active);
    const [submit, setSubmit] = React.useState(false);

    const dispatch = useDispatch();
    const {isSuccess, loading} = useSelector((state) => state.updateTeamRole);

    useEffect(() => {
        if (isSuccess && submit){
            setOpenModal(false)
        }
    }, [isSuccess, submit])

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();


    const onSubmit = async (data) => {
        const totalData = {
            title: data.title,
            active: checked
        }
        let newData = _.cloneDeep(mainData)
        const index = newData?.findIndex((item) => item.id === id);
        let indexData = newData[index];
        _.merge(indexData, { title: data.title, active: checked });
        _.merge(newData[index], indexData);

        dispatch(updateTeamRole({id, totalData}))
            .then(res => {
                setSubmit(true)
                updateData(newData)
            })
        setSubmit(false)
    };

    return (
        <>
            <ModalCore
                title={t("Edit")}
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
                            placeholder={title}
                            required={true}
                            type="text"
                        />
                        <Box sx={{direction: t("direction"), marginTop: 4}}>
                            {checked ? t("Active") : t("DeActive")}
                            <Switch
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{'aria-label': 'controlled'}}
                            />
                        </Box>
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

export default UpdateTeamRoles;
