import React from "react";
import UserInfo from "./UserInfo";
import {Divider, IconButton, Stack, useMediaQuery} from "@mui/material";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {styled, useTheme} from "@mui/material/styles";
import {ColorModeContext} from "../context/ThemeContext";
import {Notification, SwitchLang} from "components";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {AppContext} from "../context/AppContext";
import {useLocation} from "react-router-dom/";
import {Box} from "@mui/system";
import GeneralBreadcrumb from "./Breadcrumbs/GeneralBreadcrumb";


const Item = styled("div")(({theme}) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: "#fff",
}));

const Header = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

const HeaderLayout = ({data, loading}) => {

    const theme = useTheme();
    const {sidebar, setSidebarBar, setTabsSide, mobileSize} = React.useContext(AppContext);
    const colorMode = React.useContext(ColorModeContext);
    let {pathname} = useLocation();
    const matches = useMediaQuery('(max-width:425px)');

    const handleSidebar = () => {
        setSidebarBar(sidebar => !sidebar);
    }
    const handleMobileSidebar = () => {
        setSidebarBar(sidebar => !sidebar);
        setTabsSide(tabsSide => !tabsSide);
    }
    return (
        <Box sx={{background: "#322740", height: "auto", minHeight: 110}}>
            <Header>
                <Box sx={{display: "inline-flex", cursor: "pointer"}}>
                    {!sidebar && (
                        <Box>
                            {mobileSize ? (
                                <IconButton onClick={() => handleMobileSidebar()}
                                            sx={!sidebar && {marginRight: "7px"}}
                                >
                                    <MenuOpenIcon sx={{color: "#fff"}}/>
                                </IconButton>
                            ) : (
                                <IconButton
                                    onClick={() => handleSidebar()}
                                    sx={!sidebar && {marginRight: "7px"}}
                                >
                                    <MenuOpenIcon sx={{color: "#fff"}}/>
                                </IconButton>
                            )}

                        </Box>
                    )}
                    <UserInfo data={data} loading={data}/>
                </Box>
                <Stack
                    direction="row"
                    alignItems={"center"}
                    gap={matches ? 0.5 : 2}
                >
                    <Item>
                        <SwitchLang/>
                    </Item>
                    <Item>
                        <Item onClick={colorMode.toggleColorMode}>
                            <IconButton>
                                {theme.palette.mode === "dark" ? (
                                    <Brightness5Icon
                                        style={
                                            theme.palette.mode === "dark"
                                                ? {color: "#fff", margin: "0 5px"}
                                                : {color: "#fff", margin: "0 5px"}
                                        }
                                        sx={{cursor: "pointer"}}
                                    />
                                ) : (
                                    <Brightness4Icon
                                        style={
                                            theme.palette.mode === "dark"
                                                ? {color: "#fff", margin: "0 5px"}
                                                : {color: "#fff", margin: "0 5px"}
                                        }
                                        sx={{cursor: "pointer"}}
                                    />
                                )}
                            </IconButton>
                        </Item>
                    </Item>
                    <Item>
                        <Notification data={data} loading={loading}/>
                    </Item>
                </Stack>
            </Header>
            <GeneralBreadcrumb path={pathname}/>
        </Box>
    );
};

export default HeaderLayout;
