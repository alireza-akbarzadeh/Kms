import React, { useEffect } from "react";
import { ModalCore } from "core";
import { useTranslation } from "react-i18next";
import {
  Stack,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Radio,
} from "@mui/material";

const ChoosEditor = ({ openModal, setOpenModal, setOpenTab }) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState("Markup");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleClick = () => {
    if (value === "Markup") {
      setOpenTab(1);
      setOpenModal(false);
    }
    if (value === "HTML") {
      setOpenTab(2);
      setOpenModal(false);
    }
  };
  return (
    <>
      <ModalCore
        title={t("Select_Editro")}
        open={openModal}
        setOpen={setOpenModal}
      >
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="Markup"
            name="Markup"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Markup"
              control={<Radio />}
              label="Markup"
            />
            <FormControlLabel value="HTML" control={<Radio />} label="HTML" />
          </RadioGroup>
        </FormControl>
        <Stack direction="row" gap={1} justifyContent={"flex-end"}>
          <Button variant="contained" onClick={() => handleClick()}>
            {t("Yes")}
          </Button>
          <Button onClick={() => setOpenModal(false)} variant="outlined">
            {t("No")}
          </Button>
        </Stack>
      </ModalCore>
    </>
  );
};

export default ChoosEditor;
