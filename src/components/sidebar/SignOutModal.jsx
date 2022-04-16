import { Box, Button, Typography } from '@mui/material'
import ModalCore from 'core/ModalCore'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { SingOut } from "redux/features/Auth/singOutSlice";

const SignOutModal = ({ setOpenModal, openModal }) => {
    const { t } = useTranslation();
    let dispatch = useDispatch();
    return (
        <ModalCore title={t("Logout")} open={openModal} setOpen={setOpenModal}>
            <Typography align={"center"}>
                {t("Areـyouـsureـyouـwantـtoـleave")}
            </Typography>
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                mt={4}
            >
                <Button
                    sx={{ borderRadius: 15, padding: "5px 12px" }}
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => dispatch(SingOut())}
                >
                    {t("Confirmation")}
                </Button>
                <Button
                    sx={{ borderRadius: 15, padding: "5px 12px", margin: "0 15px" }}
                    variant={"contained"}
                    color={"secondary"}
                    onClick={() => setOpenModal(false)}
                >
                    {t("Cancel")}
                </Button>
            </Box>
        </ModalCore>
    )
}

export default SignOutModal
