import React, {useContext, useState} from "react";
import {Item} from "core";
import {Stack, Tooltip, tooltipClasses, Box} from "@mui/material";
import {WrapperIcon} from "./Sidebar-styled";
import {Link, useLocation} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {
    CloudDone, FolderOpen, Person, Settings, Window, Group, EventNote, Gavel, PowerSettingsNewSharp, DoubleArrowSharp,
} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {AppContext} from "context/AppContext";
import SignOutModal from "./SignOutModal";
import {useSelector} from "react-redux";
import {CheckRole} from "../../helper";


const Tabs = ({handleMobileSidebar}) => {

    const {sidebar, setSidebarBar} = useContext(AppContext);
    const [openModal, setOpenModal] = useState(false)
    const {t} = useTranslation();
    let {pathname} = useLocation();
    const {data: user} = useSelector((state) => state.user);


    const CustomTooltip = styled(({className, ...props}) => (<Tooltip
        dir={t("direction") === "rtl" ? "left" : "right"}
        placement={t("direction") === "rtl" ? "left" : "right"}
        componentsProps={{
            tooltip: {
                sx: {
                    bgcolor: "#322740", fontSize: "15px ", "& .MuiTooltip-arrow": {
                        color: "#322740", "& .MuiTooltip-arrow:before": {
                            right: 0,
                        },
                    },
                },
            },
        }}
        {...props}
        arrow
        classes={{popper: className}}
    />))(({theme}) => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: "#322740",
        }, [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: "#322740",
        },
    }));

    return (<>
        <Stack flexDirection={"column"} display={"flex"} spacing={2}>
            <Box sx={{display: "flex", justifyContent: "flex-end", flexDirection: "column"}}>
                <Box>
                    <Item onClick={() => handleMobileSidebar()} isActive={pathname === "/document"}>
                        <CustomTooltip title={t("Document")}>
                            <WrapperIcon>
                                <Link to={"/document"}>
                                    <FolderOpen/>
                                </Link>
                            </WrapperIcon>
                        </CustomTooltip>
                    </Item>
                    <Item onClick={() => handleMobileSidebar()} isActive={pathname === "/users"}>
                        <CustomTooltip title={t("Users")}>
                            <WrapperIcon>
                                <Link to={"/users"}>
                                    <Group/>
                                </Link>
                            </WrapperIcon>
                        </CustomTooltip>
                    </Item>
                    {CheckRole({
                        roles: user?.data?.type, page: 'tabs', part: 'vacation'
                    }) && (<Item onClick={() => handleMobileSidebar()} isActive={pathname === "/vacation"}>
                        <CustomTooltip title={t("vacation")}>
                            <WrapperIcon>
                                <Link to={"/vacation"}>
                                    <EventNote/>
                                </Link>
                            </WrapperIcon>
                        </CustomTooltip>
                    </Item>)}
                    {CheckRole({
                        roles: user?.data?.type, page: 'tabs', part: 'projects'
                    }) && (<Item onClick={() => handleMobileSidebar()} isActive={pathname === "/projects"}>
                        <CustomTooltip title={t("project")}>
                            <WrapperIcon>
                                <Link to={"/projects"}>
                                    <img src="/assets/images/analytics.png" alt="project"/>
                                </Link>
                            </WrapperIcon>
                        </CustomTooltip>
                    </Item>)}
                    {CheckRole({
                        roles: user?.data?.type, page: 'tabs', part: 'tickets'
                    }) && (<Item onClick={() => handleMobileSidebar()} isActive={pathname === "/tickets"}>
                        <CustomTooltip title={t("Tickets")}>
                            <WrapperIcon>
                                <Link to={"/tickets"}>
                                    <img src="/assets/icon/tickets.png" alt="tickets"/>
                                </Link>
                            </WrapperIcon>
                        </CustomTooltip>
                    </Item>)}

                    <Item onClick={() => handleMobileSidebar()} isActive={pathname === "/drive"}>
                        <CustomTooltip title={t("Drive")}>
                            <WrapperIcon>
                                <Link to={"/drive"}>
                                    <CloudDone/>
                                </Link>
                            </WrapperIcon>
                        </CustomTooltip>
                    </Item>
                    <Item onClick={() => handleMobileSidebar()} isActive={pathname === "/rules"}>
                        <CustomTooltip title={t("Rules")}>
                            <WrapperIcon>
                                <Link to={"/rules"}>
                                    <Gavel/>
                                </Link>
                            </WrapperIcon>
                        </CustomTooltip>
                    </Item>
                    {CheckRole({
                        roles: user?.data?.type, page: 'tabs', part: 'config'
                    }) && (<Item onClick={() => handleMobileSidebar()} isActive={pathname === "/config"}>
                        <CustomTooltip title={t("config")}>
                            <WrapperIcon>
                                <Link to={"/config-workspace"}>
                                    <Settings/>
                                </Link>
                            </WrapperIcon>
                        </CustomTooltip>
                    </Item>)}
                </Box>
                <Box sx={{position: "absolute", bottom: "5px"}}>
                    <Item>
                        <CustomTooltip title={t("SignOut")}>
                            <WrapperIcon onClick={() => setOpenModal(!openModal)}>
                                <PowerSettingsNewSharp/>
                            </WrapperIcon>
                        </CustomTooltip>
                    </Item>
                    <Item onClick={() => handleMobileSidebar()} isActive={pathname === "/user-panel"}>
                        <CustomTooltip title={t("User_Profile")}>
                            <WrapperIcon>
                                <Link to={"/user-panel"}>
                                    <Person/>
                                </Link>
                            </WrapperIcon>
                        </CustomTooltip>
                    </Item>
                    <Item>
                        {/* <CustomTooltip title={t("config")}> */}
                        {sidebar ? (<WrapperIcon onClick={() => setSidebarBar(!sidebar)}>
                            <DoubleArrowSharp/>
                        </WrapperIcon>) : (<WrapperIcon onClick={() => setSidebarBar(!sidebar)}>
                            <DoubleArrowSharp sx={{transform: "rotate(180deg)"}}/>
                        </WrapperIcon>)}
                        {/* </CustomTooltip> */}
                    </Item>
                </Box>
            </Box>
        </Stack>
        {openModal && (<SignOutModal openModal={openModal} setOpenModal={setOpenModal}/>)}
    </>);
};

export default Tabs;
