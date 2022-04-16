import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next';

const SelelctBox = ({ select, handleChange, data }) => {
    const { register } = useForm();
    const { t } = useTranslation();
    return (
        <>
            <FormControl sx={{ marginTop: 2 }} fullWidth>
                <InputLabel id="demo-multiple-name-label">قابل مشاهده برای</InputLabel>
                <Select
                    dir={"rtl"}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...register("visibility", { required: true })}
                    value={select}
                    label="Age"
                    onChange={handleChange}
                >
                    {data.map((item) => (
                        <MenuItem
                            dir={t("direction")}
                            key={item.id}
                            value={item.id}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}

export default SelelctBox
