import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "redux/features/Auth/signInSlice";
import {
  Box,
  Grid,
  InputLabel,
  Typography,
  useMediaQuery,
  Container,
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
import cookie from "js-cookie";

const Login = () => {
  const matches = useMediaQuery("(min-width:800px)");
  const eavl = useMediaQuery("(max-width:780px)");
  const { loading, errors: error } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const token = cookie.get("token");

  React.useEffect(() => {
    if (token) {
      return (window.location.href = "/user-panel");
    }
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(SignIn(data));
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
              <Box sx={{ height: 880 }}>
                <img
                  className={"w-full h-full"}
                  src="/assets/images/Group 131.svg"
                  alt=""
                />
              </Box>
            </ImageControl>
          </Grid>
        ) : null}
        <Grid item md={7} xs={12}>
          <Container maxWidth={eval ? "md" : ""}>
            <FormBG isMobile={eavl} elevation={eavl ? 3 : 0}>
              <FormContainer>
                <Box textAlign={"center"}>
                  <Typography
                    mt={7}
                    color={"#707070"}
                    component={"h4"}
                    variant={"h5"}
                  >
                    {t("SignIN")}
                  </Typography>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl>
                    <InputLabel htmlFor="username">{t("UserName")}</InputLabel>
                    <Input
                      className={`${
                        errors.username && "Border_Error"
                      } left_Radius`}
                      type={"text"}
                      id="userName"
                      variant="outlined"
                      {...register("username", { required: true })}
                    />
                    {errors.username && <ERROR>{t("Requierd")}</ERROR>}
                  </FormControl>
                  <FormControl>
                    <InputLabel sx={{ marginTop: 2 }} htmlFor="password">
                      {t("Password")}
                    </InputLabel>
                    <Input
                      className={`${
                        errors.password && "Border_Error"
                      } left_Radius`}
                      type={"password"}
                      id="password"
                      variant="outlined"
                      {...register("password", { required: true })}
                    />
                    {errors.password && <ERROR>{t("Requierd")}</ERROR>}
                    {error?.error && <ERROR>{error?.error}</ERROR>}
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
                    <Box sx={{ color: "#8005d8" }} textAlign={"center"}>
                      <Link to={Path.ForgotPass}>{t("Forgot_Password")}</Link>
                    </Box>
                  </Box>
                </form>
              </FormContainer>
            </FormBG>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
