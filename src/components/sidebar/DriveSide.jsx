import {useTranslation} from "react-i18next";
import {Divider} from "@mui/material";
import Item from "../../core/Item";
import {SidebarItem} from "../index";
import {CloudDone, Person} from "@mui/icons-material";
import React from "react";
import {useHistory} from "react-router-dom";

const DriveSide = ({mine = false}) =>{
    const {t} = useTranslation();
    const history = useHistory();

    return (
        <>
            <Divider sx={{margin: '5px 0 7px 0'}}/>
            <Item>
                <SidebarItem text={t("AllDrives")} icon={<CloudDone/>} onClick={() => history.push('/drive')}/>
            </Item>
            {!mine && (
                <Item>
                    <SidebarItem text={t("MyDrives")} icon={<Person/>} onClick={() => history.push('/myDrive')}/>
                </Item>
            )}
        </>
    )
}

export default DriveSide