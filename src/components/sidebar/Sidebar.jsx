import * as React from "react";
import {Box, IconButton, Stack} from "@mui/material";
import {useLocation} from "react-router-dom";
import Tabs from "./Tabs";
import {
    SidebarBody,
    SidebarContainer,
    SidebarHeader,
    SidebarWrapper,
    SidebarTabs,
} from "./Sidebar-styled";
import {useTranslation} from "react-i18next";
import VacationSide from "./VacationSide";
import {AppContext} from "../../context/AppContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ConfigSide from "./ConfigSide";
import UsersSide from "./UsersSide";
import SignOutModal from "./SignOutModal";
import UserPannelSide from "./UserPannelSide";
import DashboardSide from "./DashboardSide";
import {AccountEdit} from "containers";
import UserArrivalSide from "./UserArrivalSide";
import {SettingPassword} from "containers";
import ProjectSide from "./ProjectSide";
import EvaluateSetting from "containers/Evalute-setting/EvaluteSetting";
import DocumentSide from "./DocumentSide";
import CategorySidebar from "../Document/CategorySidebar";
import DriveSide from "./DriveSide";
import VacationDetailSide from "./VacationDetailSide";

const Sidebar = ({data, loading}) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [modalPass, setModalPass] = React.useState(false);
    const [modalAccount, setModalAccount] = React.useState(false);
    const matches = useMediaQuery("(max-width:1028px)");
    const {
        sidebar,
        setSidebarBar,
        tabsSide,
        setTabsSide,
        mobileSize,
        openEvaluateModal,
        setOpenEvaluateModal
    } = React.useContext(AppContext);
    const matchesSidebar = useMediaQuery('(max-width:600px)');
    const handleMobileSidebar = () => {
        if (matchesSidebar) {
            setSidebarBar(sidebar => !sidebar);
            setTabsSide(tabsSide => !tabsSide);
        }
    }

    const {t} = useTranslation();
    let dir = t("direction") === "rtl";
    let {pathname} = useLocation();

    return (
        <>
            <SidebarContainer
                isRight={t("direction") === "rtl"}
                id="kms-side"
                sidebar={sidebar}
                border={sidebar ? dir : ""}
                size={sidebar}
                matches={matches}
            >
                <Box display={"flex"} sx={{height: "100%"}}>
                    {tabsSide && (
                        <SidebarTabs>
                            <Tabs handleMobileSidebar={handleMobileSidebar}/>
                        </SidebarTabs>
                    )}
                    {sidebar ? (
                        <SidebarWrapper>
                            <Box
                                display={"flex"}
                                justifyContent={"center"}
                                flexDirection={"column"}
                                alignItems={"center"}
                                sx={{position: "relative", width: "100%", minWidth: 290}}
                            >
                                {mobileSize && (
                                    <IconButton
                                        sx={{
                                            margin: "0 3px",
                                            position: "absolute",
                                            top: "0",
                                            left: 0,
                                        }}
                                        onClick={handleMobileSidebar}
                                    >
                                        <MenuOpenIcon sx={{color: "#000"}}/>
                                    </IconButton>
                                )}
                                <SidebarHeader>
                                    <UserArrivalSide/>
                                </SidebarHeader>
                                <SidebarBody>
                                    <Stack display={"flex"} direction={"column"}>
                                        {pathname === "/users" && <UsersSide data={data}/>}
                                        {pathname === "/dashboard" && <DashboardSide/>}
                                        {(pathname.split('/')[1] === "vacations" && parseInt(pathname.split('/')[2]) > 0)  && <VacationDetailSide/>}
                                        {pathname === "/drive" && <DriveSide/>}
                                        {pathname === "/myDrive" && <DriveSide mine={true}/>}
                                        {(pathname === "/user-panel" || pathname === "/my-studytime" || pathname === "/my-vacation") &&
                                            <UserPannelSide setModalAccount={setModalAccount}
                                                            setModalPass={setModalPass}
                                                            setOpenModal={setOpenModal}/>}
                                        {pathname === "/vacation" && <VacationSide/>}
                                        {(
                                                (pathname === "/projects" || pathname.split('/')[1] === 'project') ||
                                                (pathname === "/teams" || pathname.split('/')[1] === "team") ||
                                                (pathname.split('/')[1] === "archive-tasks")
                                            ) &&
                                            <ProjectSide/>}
                                        {(pathname === "/config" || pathname === "/config-leaves" || pathname === "/config-workspace") &&
                                            <ConfigSide/>}
                                        {(pathname === "/document" ||
                                                pathname === "/archives" ||
                                                pathname === "/document/articles" ||
                                                pathname === "/document/wikis" ||
                                                pathname === "/document/tags" ||
                                                pathname === "/document/store-article" ||
                                                pathname === "/document/bookmarks" ||
                                                pathname === "/document/drafts" ||
                                                pathname === "/document/mine" ||
                                                pathname === "/document/myKnowledge" ||
                                                pathname === "/document/templates" ||
                                                pathname === "/document/knowledge/update" ||
                                                pathname === "/document/update" ||
                                                pathname === 'document/store-wiki')  &&
                                            <DocumentSide data={data}/>}

                                        {(pathname.split('/')[1] === 'document' &&
                                                (pathname.split('/')[2] === 'article' ||
                                                    pathname.split('/')[2] === 'wiki' ||
                                                    pathname.split('/')[2] === 'contributes' ||
                                                    pathname.split('/')[2] === 'comments')
                                                && pathname.split('/')[3] > 0) &&
                                            <CategorySidebar/>}
                                    </Stack>
                                </SidebarBody>
                            </Box>
                        </SidebarWrapper>
                    ) : null}
                </Box>
            </SidebarContainer>
            <SignOutModal openModal={openModal} setOpenModal={setOpenModal}/>
            <AccountEdit
                title={"Account_Edit"}
                openModal={modalAccount}
                setOpenModal={setModalAccount}
            />
            <SettingPassword openModal={modalPass} setOpenModal={setModalPass}/>
            {openEvaluateModal && <EvaluateSetting openModal={openEvaluateModal} setOpenModal={setOpenEvaluateModal}/>}
        </>
    );
};
export default Sidebar;
