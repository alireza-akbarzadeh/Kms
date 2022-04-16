import VacationCeiling from "pages/vacation/VacationCeiling";
import React, {useState} from "react";
import {Divider} from "@mui/material";
import Item from "../../core/Item";
import {SidebarItem} from "../index";
import {Edit} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

const VacationDetailSide = () => {
    const [openModal, setOpenModal] = useState(false)
    const { t } = useTranslation();

    return (
        <>
            <Divider sx={{margin: '5px 0 7px 0'}}/>

            <Item>
                <SidebarItem text={t("User_leave_ceiling")} icon={<></>} onClick={() => setOpenModal(true)}/>
            </Item>
            {openModal && (
                <VacationCeiling openModal={openModal} setOpenModal={setOpenModal} />
            )}
        </>
    );
}

export default VacationDetailSide