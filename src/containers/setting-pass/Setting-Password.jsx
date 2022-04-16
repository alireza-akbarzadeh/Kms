import React from "react";
import { ModalCore } from "../../core";
import { Box, Button, FormControl, InputLabel, Input } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { ERROR } from "../../pages/Login/Styled_Login";
import { restPassAction } from "redux/features/users/resetPassSlice";
import { CoreBTN } from "core";

const SettingPassword = ({ openModal, setOpenModal }) => {
  const { t } = useTranslation();
  let dir = t("direction") === "rtl";
  const isFirstRender = React.useRef(true)

  const {
    loading,
    errors: error,
    isSuccess,
  } = useSelector((state) => state.resetPassword);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(restPassAction(data));
  };
  React.useEffect(() => {
    if (isSuccess && !isFirstRender.current) {
      setOpenModal(false);

    } else {
      isFirstRender.current = false
    }
  }, [isSuccess])
  return (
    <>
      <ModalCore
        title={t("Password_settings")}
        open={openModal}
        setOpen={setOpenModal}
      >
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ margin: "10px 0", width: "100%" }}>
              <InputLabel
                sx={dir && { right: 14, left: "unset", fontSize: 14 }}
              >
                {t("Last_Pss")}
              </InputLabel>
              <Input
                type="password"
                className={`${errors.username && "Border_Error"} left_Radius`}
                id="current_password"
                variant="outlined"
                {...register("current_password", { required: true })}
              />
              {errors.current_password && <ERROR>{t("Requierd")}</ERROR>}
            </FormControl>
            <FormControl sx={{ margin: "10px 0", width: "100%" }}>
              <InputLabel
                sx={dir && { right: 14, left: "unset", fontSize: 14 }}
              >
                {t("New_Pass")}
              </InputLabel>
              <Input
                type="password"
                className={`${errors.username && "Border_Error"} left_Radius`}
                id="new_password"
                variant="outlined"
                {...register("new_password", { required: true })}
              />
              {errors.new_password && <ERROR>{t("Requierd")}</ERROR>}
            </FormControl>
            <FormControl sx={{ margin: "10px 0", width: "100%" }}>
              <InputLabel
                sx={dir && { right: 14, left: "unset", fontSize: 14 }}
              >
                {t("Repeat_The_Password")}
              </InputLabel>
              <Input
                type="password"
                className={`${errors.username && "Border_Error"} left_Radius`}
                id="renew_password"
                variant="outlined"
                {...register("renew_password", { required: true })}
              />
              {errors.renew_password && <ERROR>{t("Requierd")}</ERROR>}
              {error?.new_password && <ERROR>{error?.new_password[0]}</ERROR>}
              {error?.renew_password && (
                <ERROR>{error?.renew_password[0]}</ERROR>
              )}
            </FormControl>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              mt={4}
            >
              <CoreBTN
                loading={loading}
                sx={{ borderRadius: 15, padding: "5px 12px" }}
                variant={"contained"}
                color={"primary"}
                type={"submit"}
                title={t("Confirmation")}
              />
              <Button
                sx={{ borderRadius: 15, padding: "5px 12px", margin: "0 15px" }}
                variant={"contained"}
                color={"secondary"}
                onClick={() => setOpenModal(false)}
              >
                {t("Cancel")}
              </Button>
            </Box>
          </form>
        </Box>
      </ModalCore>
    </>
  );
};

export default SettingPassword;
