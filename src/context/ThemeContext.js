import * as React from "react";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {StyleSheetManager} from "styled-components";
import {responsiveFontSizes, CssBaseline} from "@mui/material";
import {useTranslation} from "react-i18next";
import Cookies from "js-cookie";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    },
});

const ThemeContext = ({children}) => {
    const [mode, setMode] = React.useState("light" || "dark" > "light");
    const {t} = useTranslation();
    const dir = t("direction") === "rtl" ? "rtl" : "ltr";

    React.useEffect(() => {
        Cookies.set("theme", mode);
    }, [mode]);
    const colorMode = React.useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        },
    }), []);

    let theme = React.useMemo(() => createTheme({
        direction: dir, palette: {
            mode,
            primary: {
                main: "#8005d8", dark: "#707070", light: "",
            }, secondary: {
                main: "#322740", dark: "#ce1440", light: "#f9f9f9",
            }, success: {
                main: "#008000", dark: "#228B22", light: "#1ce087",
            }, warning: {
                main: "#FFFF66", dark: "#FFFF00", light: "#FFFFCC",
            }, info: {
                main: "#0000FF", dark: "#000080", light: "#ADD8E6",
            }, grey: {
                main: "#808080", dark: "#A9A9A9", light: "#D3D3D3",
            }, error: {
                main: "#ce1440", dark: "#800000", light: "#ffcccb",
            },
        }, typography: {
            fontFamily: "Vazir", htmlFontSize: 16, subtitle1: {
                fontSize: 14,
            }, subtitle2: {
                fontSize: 12,
            }, body1: {
                fontWeight: 700,
            }, body2: {
                fontWeight: 500,
            },
        }, components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: "transition: all 0.3s ease",
                },
            },
        },
    }), [mode]);

    theme = responsiveFontSizes(theme);
    return (
        <ThemeProvider theme={theme}>
            <ColorModeContext.Provider value={colorMode}>
                <CssBaseline/>
                <StyleSheetManager>
                    {children}
                </StyleSheetManager>
            </ColorModeContext.Provider>
        </ThemeProvider>
    );
};

export default ThemeContext;
