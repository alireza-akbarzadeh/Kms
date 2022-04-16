import * as React from "react";
import {useTranslation} from "react-i18next";
import {styled, TextareaAutosize, FormControl, useTheme} from "@mui/material";
import {ErrorCore} from "core";

const CustomText = ({errors, register, title, field, placeholder, required = true, maxRow, height}) => {
    const {t} = useTranslation();
    const dir = t("direction") === "rtl" ? "rtl" : "ltr";
    const border = t("direction") === "rtl" ? "37px 0 37px 37px" : "0 37px 37px 37px";
    const theme = useTheme();

    const TextBox = styled(TextareaAutosize)(({theme}) => ({
        "label + &": {
            marginTop: theme.spacing(0.5),
        },

        borderRadius: `${border} !important`,
        position: "relative",
        border: "1px solid",
        borderColor: errors[field] ? "#ce1440" : theme.palette.mode === "dark" ? "#808080" : "#A0A3A5",
        fontSize: 16,
        width: "100%",
        padding: "10px 12px",
        transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
        ]),
        textAlign: dir === "rtl" ? "right" : "left",
        resize: "none",
        color: theme.palette.mode === "dark" ? "#fff" : "#333",
        background: 'transparent'
    }));

    return (
        <>
            <FormControl fullWidth sx={{margin: "10px 0", direction: t("direction")}}>
                <label htmlFor={field}>{t(title)}</label>
                <TextBox
                    maxRows={maxRow ? maxRow : 10}
                    className={`${errors[field] && "Border_Error"}`}
                    aria-label="maximum height"
                    placeholder={placeholder}
                    {...register(field, {required: required})}
                    style={{
                        width: "100%",
                        outline: "none",
                        height: height ? height : 150,
                        border: " solid 1px #a0a3a5",
                        borderTopLeftRadius: 15,
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                    }}
                />
                {errors[field] && <ErrorCore>{t("Requierd")}</ErrorCore>}
            </FormControl>
        </>
    );
};

export default CustomText;
