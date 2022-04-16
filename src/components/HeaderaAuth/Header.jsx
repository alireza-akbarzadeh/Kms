import React from "react";
import { BGHeader, AuthBtn, Wrapper, List } from "./Styled_HeaderAuth";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import { Container, Stack, Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import MobileHeader from "./MobileHeader";
import { SwitchLang } from "components";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "context/ThemeContext";
import { styled } from "@mui/material/styles";
import { Path } from "constant/Path";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SingOut } from "redux/features/Auth/singOutSlice";
import Cookies from "js-cookie";
const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Header = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const history = useHistory();

  const userInfo = Cookies.get("token");
  const dispatch = useDispatch();
  const handelSignOut = () => {
    dispatch(SingOut());
  };
  return (
    <BGHeader>
      <Container maxWidth={"xl"}>
        <Wrapper>
          <div>
            <Stack direction="row" spacing={2}>
              <Item>
                <SwitchLang />
              </Item>
              <Item onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <Brightness5Icon
                    sx={{ cursor: "pointer", marginTop: "4px" }}
                  />
                ) : (
                  <Brightness4Icon
                    sx={{ cursor: "pointer", marginTop: "4px" }}
                  />
                )}
              </Item>
            </Stack>
          </div>
          {userInfo ? (
            <form onSubmit={(e) => e.preventDefault()}>
              <Button
                variant={"contained"}
                type={"submit"}
                onClick={() => handelSignOut()}
              >
                خروج
              </Button>
            </form>
          ) : (
            <div className={"left_Menu"}>
              <List>
                <li>
                  <AuthBtn
                    onClick={() => history.push(Path.SIGNIN)}
                    variant={"contained"}
                    color={"secondary"}
                  >
                    {t("SignIN")}
                  </AuthBtn>
                </li>
                <li className={"border-y"}>
                  <span className={"mr"} />
                </li>
                <li>
                  <AuthBtn
                    onClick={() => history.push(Path.SIGNUP)}
                    variant={"contained"}
                    color={"primary"}
                  >
                    {t("SignUp")}
                  </AuthBtn>
                </li>
              </List>
            </div>
          )}
        </Wrapper>
        <MobileHeader />
      </Container>
    </BGHeader>
  );
};

export default Header;
