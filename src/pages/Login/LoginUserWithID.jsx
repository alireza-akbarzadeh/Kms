import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "redux/features/Auth/signInSlice";
import {
  Box,
  Stack,
  InputLabel,
  Typography,
  useMediaQuery,
  Container,
  FormControl,
  Input,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import cookie from "js-cookie";
import { ERROR } from "./Styled_Login";
import { LogInBTN } from "./Styled_Login";
import { Path } from "constant/Path";

const LoginUserWithID = () => {
  const { t } = useTranslation();
  const { loading, errors: error } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const token = cookie.get("token");

  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(SignIn(data));
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <form  onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="25px" direction={"column"}>
            <FormControl
              sx={{
                "& label": {
                  right: "30px",
                  transformOrigin: "top right !important",
                },
              }}
              fullWidth
            >
              <TextField
                label={t("UserName")}
                variant="outlined"
                className={`${errors.username && "Border_Error"} left_Radius`}
                type={"text"}
                id="userName"
                {...register("username", { required: true })}
              />
              {errors.username && <ERROR>{t("Requierd")}</ERROR>}
            </FormControl>
            <FormControl
              sx={{
                "& label": {
                  right: "30px",
                  transformOrigin: "top right !important",
                },
              }}
              fullWidth
            >
              <TextField
                label={t("Password")}
                variant="outlined"
                className={`${errors.password && "Border_Error"} left_Radius`}
                type={"password"}
                id="password"
                {...register("password", { required: true })}
              />
              {errors.password && <ERROR>{t("Requierd")}</ERROR>}
              {error?.error && <ERROR>{error?.error}</ERROR>}
            </FormControl>
            <FormControl className={"center"}>
              <LogInBTN
                
                sx={{
                  marginTop: 1,
                  marginBottom: 1,
                }}
                title={t("SignIN")}
                loading={loading}
                type={"submit"}
                variant={"contained"}
              />
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 3,
              }}
            >
              <Box sx={{ color: "#8005d8" }} textAlign={"center"}>
                <span style={{ color: "#333" }}>{t("Not_a_Member")}</span>
                <Link to={Path.SIGNUP}>{t("SignUp")}</Link>
              </Box>
            </Box>
          </Stack>
        </form>
      </Container>
    </Box>
  );
};

export default LoginUserWithID;
