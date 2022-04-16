import * as React from "react";
import {useTranslation} from "react-i18next";
import {FormControl, Input} from "../../pages/Login/Styled_Login";
import {InputLabel, styled} from "@mui/material";
import {ErrorCore} from "core";


const CustomInput = ({sx, errors, register, title, field, placeholder, required = true, type = 'text', ...rest}) => {
    const {t} = useTranslation();
    const dir = t("direction") === "rtl" ? "rtl" : "ltr";
    const border = t("direction") === "rtl" ? "37px 0 37px 37px" : "0 37px 37px 37px";
    const BootstrapInput = styled(Input)(({theme}) => ({
        "label + &": {
            marginTop: theme.spacing(0.3),
        },
        borderRadius: `${border} !important`,
        position: "relative",
        border: "1px solid",
        borderColor: errors[field] ? "#ce1440" : "#A0A3A5",
        fontSize: 16,
        width: "100%",
        padding: "10px 12px",
        transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
        ]),
        textAlign: dir === "rtl" ? "right" : "left",

    }));

    return (
        <>
            <FormControl>
                <InputLabel htmlFor={field}>{t(title)}</InputLabel>
                <BootstrapInput
                    sx={sx}
                    {...rest}
                    className={`${errors[field] && "Border_Error"
                    } left_Radius`}
                    type={type}
                    id={field}
                    variant="outlined"
                    placeholder={placeholder}
                    {...register(field, {required: required})}
                />
                {errors[field] && <ErrorCore>{t("Requierd")}</ErrorCore>}
            </FormControl>
        </>
    );
};

export default CustomInput;
