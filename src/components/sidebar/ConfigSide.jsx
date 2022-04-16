import React, {useContext} from "react";
import {DateRange, AssessmentSharp, Workspaces} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {AppContext} from "context/AppContext";
import {useHistory} from "react-router-dom";
import Item from 'core/Item'
import {Button, Divider} from "@mui/material";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {CheckRole} from "../../helper";

const ConfigSide = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const {openEvaluateModal, setOpenEvaluateModal} = useContext(AppContext)
    const {data: user} = useSelector((state) => state.user)

    return (
        <>
            <Divider sx={{margin: '5px 0 7px 0'}}/>
            <Item>
                <SideItem variant="contained" onClick={() => history.push('/config-workspace')}>
                    <Workspaces sx={{margin: "0 7px"}}/>
                    {t("workspace")}
                </SideItem>
            </Item>
            {CheckRole({roles: user?.data?.type, page: 'config', part: 'sidebar'}) && (
                <>
                    <Item>
                        <SideItem variant="contained" onClick={() => history.push('/config-leaves')}>
                            <DateRange sx={{margin: "0 7px"}}/>
                            {t("Config_vacation")}
                        </SideItem>
                    </Item>
                    <Item>
                        <SideItem variant="contained" onClick={() => setOpenEvaluateModal(!openEvaluateModal)}>
                            <AssessmentSharp sx={{margin: "0 7px"}}/>
                            {t("config_evaluate")}</SideItem>
                    </Item>
                </>
            )}
        </>
    );
};

export default ConfigSide;


const SideItem = styled(Button)`
  width: 100%;
  height: 40px;
  border-radius: 35px;
  color: #fff !important
`;