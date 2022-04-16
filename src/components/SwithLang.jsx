import * as React from "react";
import {Popover, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {Translate} from "@mui/icons-material";
import i18n from "localization/i18n";
import {useTranslation} from "react-i18next";
import {Alert} from "helper";
import styled, {css} from "styled-components";

const SwitchLang = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const {t} = useTranslation();

    const handleChangelngFA = () => {
        i18n.changeLanguage("fa");
        setAnchorEl(null);
        Alert.DEFAULT(t("YourLanguageHasBeenChanged"));
    };
    const handleChangelngEn = () => {
        i18n.changeLanguage("en");
        setAnchorEl(null);
        Alert.DEFAULT(t("YourLanguageHasBeenChanged"));
    };
    return (<div>
            <Button sx={{borderColor: "transparent"}} aria-describedby={id} variant="outlined" onClick={handleClick}>
                <Translate sx={{color: "#fff"}}/>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom", horizontal: "left",
                }}
            >
                <Stack sx={{padding: 1}} direction="column" spacing={3}>
                    <Btn isDisabled={t("direction") === "rtl"} disabled={t("direction") === "rtl"}
                         onClick={handleChangelngFA}>
                        {t("Persian")}
                    </Btn>
                    <Btn isDisabled={t("direction") === "ltr"} disabled={t("direction") === "ltr"}
                         onClick={handleChangelngEn}>
                        {t("English")}
                    </Btn>
                </Stack>
            </Popover>
        </div>);
};

const Btn = styled(Button)`
  ${({isDisabled}) => isDisabled ? css`
    user-select: none;
  ` : css`
    cursor: pointer;
  `}
  background: transparent;
  border: none;
`

export default SwitchLang;
