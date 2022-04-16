import {ModalCore} from "core";
import {useTranslation} from "react-i18next";
import Select from "react-select";
import React, {useEffect, useState} from "react";
import {Alert, Button, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AddMember} from "redux/features/project/Teams/AddMemberSlice";
import {showTeams} from "../../../../redux/features/project/Teams/showTeamSlice";

const AddTeamMember = ({openModal, setOpenModal, roles, users, id}) => {
    const [rolesOption, setRolesOption] = useState(null)
    const [submit, setSubmit] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    const {t} = useTranslation()
    const [alert, setAlert] = React.useState(false);
    const roleData = roles?.map((item) => {
        return {label: item.title, value: item.id};
    });
    const userData = users?.map((item) => {
        return {label: item.first_name + ' ' + item.last_name, value: item.id};
    });

    const {error, isSuccess} = useSelector((state) => state.AddMember)

    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess && submit){
            setOpenModal(false)
        }
    }, [isSuccess, submit])

    const create = () => {
        const req = {
            team_id: id,
            user_id: selectedOption?.value,
            role_id: rolesOption?.value,
        }
        dispatch(AddMember({data: req}))
            .then(res => {
                setSubmit(true)
                dispatch(showTeams(id))
            })
        setSubmit(false)

    }

    useEffect(() => {
        setAlert(error)
        setTimeout(() => setAlert(false), 5000)
    }, [error])

    return (
        <ModalCore
            title={t("Edit")}
            open={openModal}
            setOpen={setOpenModal}
        >
            <Stack direction={'column'} spacing={3}>
                {alert && (
                    <Alert severity="error">{alert}</Alert>
                )}
                <Select
                    className="React_select"
                    value={rolesOption}
                    onChange={setRolesOption}
                    options={roleData}
                    placeholder={t("Select")}
                />
                <Select
                    className="React_select"
                    value={selectedOption}
                    onChange={setSelectedOption}
                    options={userData}
                    placeholder={t("UserName")}
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    disabled={rolesOption === null || selectedOption === null}
                    onClick={create}
                >
                    {t('Save')}
                </Button>

            </Stack>

        </ModalCore>
    )
}
export default AddTeamMember