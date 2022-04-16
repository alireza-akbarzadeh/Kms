import React from 'react'
import { EventNote, Insights, ListAlt} from '@mui/icons-material'
import {Divider} from '@mui/material'
import Item from 'core/Item'
import {useTranslation} from 'react-i18next'
import {SidebarItem} from "../index";

const DashboardSide = () => {
    const {t} = useTranslation();
    return (
        <>
            <Divider sx={{margin: '5px 0 7px 0'}}/>
            <Item>
                <SidebarItem text={t("Reports_and_statistics")} icon={<Insights/>}/>
            </Item>
            <Item>
                <SidebarItem text={t("Todo_List")} icon={<ListAlt/>}/>
            </Item>
            <Item>
                <SidebarItem text={t("Event_calender")} icon={<EventNote/>}/>
            </Item>
        </>
    )
}

export default DashboardSide;
