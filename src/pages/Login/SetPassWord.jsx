import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPassUser } from "redux/features/Auth/setPasswordSlice";
import {
  Box,
  Grid,
  InputLabel,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { HeadrAuth } from "components";
import {
  ERROR,
  FormBG,
  FormContainer,
  FormControl,
  ImageControl,
  Input,
  LogInBTN,
} from "./Styled_Login";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Path } from "constant/Path";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const SetPassword = () => {
  const matches = useMediaQuery("(min-width:800px)");

  const { loading } = useSelector((state) => state.forgotPass);
  const dispatch = useDispatch();

  let { slug } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(setPassUser({ slug, data }));
  };

  const { t } = useTranslation();
  return (
    <>
      <HeadrAuth />
      <Grid spacing={0} container>
        {matches ? (
          <Grid item md={5} xs={12}>
            <ImageControl>
              <Typography component={"h3"} color={"secondary.dark"}>
                {t("Resources_your_knowledge")}
                <br />
                {t("Share_with_others")}
              </Typography>
              <img
                className={"w-full h-full"}
                src="/assets/images/Group 131.svg"
                alt=""
              />
            </ImageControl>
          </Grid>
        ) : null}
        <Grid item md={7} xs={12}>
          <FormBG elevation={0}>
            <FormContainer>
              <Box textAlign={"center"}>
                <Typography
                  mt={7}
                  color={"#707070"}
                  component={"h4"}
                  variant={"h5"}
                >
                  {t("Forgot_Password")}
                </Typography>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                  <InputLabel htmlFor="password">{t("Password")}</InputLabel>
                  <Input
                    className={`${errors.username && "Border_Error"
                      } left_Radius`}
                    type={"password"}
                    id="password"
                    variant="outlined"
                    {...register("password", { required: true })}
                  />
                  {errors.password && <ERROR>{t("Requierd")}</ERROR>}
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="re_password">{t("re_password")}</InputLabel>
                  <Input
                    className={`${errors.re_password && "Border_Error"
                      } left_Radius`}
                    type={"password"}
                    id="re_password"
                    variant="outlined"
                    {...register("re_password•••••••••", { required: true })}
                  />
                  {errors.re_password && <ERROR>{t("Requierd")}</ERROR>}
                </FormControl>
                <FormControl className={"center"}>
                  <LogInBTN
                    sx={{
                      padding: "10px 0",
                      borderRadius: "25px",
                      marginTop: 1,
                      marginBottom: 1,
                      maxWidth: 400,
                    }}
                    title={t("Send")}
                    loading={loading}
                    type={"submit"}
                    variant={"contained"}
                  />
                </FormControl>
                <Box sx={{ color: "#8005d8" }} textAlign={"center"}>
                  <span style={{ color: "#333" }}>{t("Return")}</span>
                  <Link to={Path.SIGNIN}>{t("SignIN")}</Link>
                </Box>
              </form>
            </FormContainer>
          </FormBG>
        </Grid>
      </Grid>
    </>
  );
};

export default SetPassword;
