import React from 'react'
import {Edit, VpnKey, DateRange, MenuBook, SupportAgent} from '@mui/icons-material'
import {Divider, Typography} from '@mui/material'
import Item from 'core/Item'
import { useTranslation } from 'react-i18next'
import { Link , useHistory} from "react-router-dom";
import {SidebarItem} from "components";

const UserPannelSide = ({ setModalAccount, setModalPass }) => {
    const { t } = useTranslation();
    const dir = t("direction") === "rtl";
    const history = useHistory();
    const goTo = (link) => {
        return history.push(link)
    }
    return (
        <>
            <Divider sx={{margin: '5px 0 7px 0'}}/>

            <Item>
                <SidebarItem text={t("Edit_account")} icon={<Edit/>} onClick={() => setModalAccount(true)}/>
            </Item>
            <Item>
                <SidebarItem text={t("Password_settings")} icon={<VpnKey/>} onClick={() => setModalPass(true)}/>
            </Item>
            <Item>
                <SidebarItem text={t("Myـvacations")} icon={<DateRange/>} onClick={() => goTo('/my-vacation')}/>
            </Item>
            <Item>
                <SidebarItem text={t("MyـStudyTime")} icon={<MenuBook/>} onClick={() => goTo('/my-studytime')}/>
            </Item>
        </>
    )
}

export default UserPannelSide
