import * as React from "react";
import { useTranslation } from "react-i18next";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { ErrorCore } from "core";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { FormControl } from "../../pages/Register/Styled_Register";


const CustomSelect = ({ errors, register, data, title, field, placeholder, required = true }) => {
    const { t } = useTranslation();
    const border = t("direction") === "rtl" ? "37px 0 37px 37px" : "0 37px 37px 37px";

    return (
        <>
            <FormControl sx={{ width: "100%" }} fullWidth>
                <InputLabel htmlFor={field}>{t(title)}</InputLabel>
                <Select
                    className={`${errors[field] && "Border_Error"} w-full`}
                    {...register(field, { required: true })}
                    fullWidth
                    clearOnEscape
                    placeholder={"انتخاب کنید"}
                    IconComponent={() => <ArrowDropDownIcon />}
                    sx={{
                        float: "none",
                        borderRadius: border,
                        padding: "4px",
                        height: "42px",
                        border: "solid 1px #a0a3a5",
                    }}
                    id={field}
                    loading={true}
                >
                    {data?.map((item) => (
                        <MenuItem sx={{
                            direction: t("direction")
                        }} key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
                {errors[field] && <ErrorCore>{t("Requierd")}</ErrorCore>}
            </FormControl>
        </>
    );
};

export default CustomSelect;
