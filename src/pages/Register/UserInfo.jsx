import * as React from "react";
import {ERROR, FormControl, Input, FileInput} from "./Styled_Register";
import {Box, Grid, InputLabel, Typography, Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {CheckUserInfo} from "redux/features/Auth/checkUniqSlice";
import {CheckEmailUser} from "redux/features/Auth/checkUniqEmailSlice";
import {checkUniqMobile} from "redux/features/Auth/checkUniqMobileSlice";
import {useEffect} from "react";
import {CheckCircle, HighlightOff} from "@mui/icons-material";
import {useHistory} from "react-router-dom";
import {Path} from "../../constant/Path";
import {FileUploader} from "helper";
import PersonIcon from "@mui/icons-material/Person";
import {CoreBTN} from "../../core";

const UserInfo = ({
    loading,
                      emailDisabled = false,
                      setTabs,
                      errors,
                      register,
                      EmailCheck,
                      setMEmailCheck,
                      mobileCheck,
                      setMobileCheck,
                      setUserNameCheck,
                      userNameCheck,
                      file,
                      setFile,
                  }) => {
    const {check} = useSelector((state) => state.CheckUser);
    const {check: checkEmailUser} = useSelector((state) => state.CheckEmail);
    const {check: checkMobileUser} = useSelector((state) => state.CheckMobile);
    const {t} = useTranslation();
    const dispatch = useDispatch();

    ///handle Check Mobile
    const handelCheckUniqMobile = () => {
        const timeout = setTimeout(() => {
            const data = {
                check: mobileCheck,
                type: "mobile",
            };
            dispatch(checkUniqMobile(data));
        }, 1000);
        return () => clearTimeout(timeout);
    };
    useEffect(() => {
        if (mobileCheck !== "") return handelCheckUniqMobile();
    }, [mobileCheck]);

    ///handle Check Email
    const handelCheckUniqEmail = () => {
        const timeout = setTimeout(() => {
            const data = {
                check: EmailCheck,
                type: "email",
            };
            dispatch(CheckEmailUser(data));
        }, 1000);
        return () => clearTimeout(timeout);
    };
    useEffect(() => {
        if (EmailCheck !== "") return handelCheckUniqEmail();
    }, [EmailCheck]);

    ///handle Check UserName
    const handelCheckUniqUserName = () => {
        const timeout = setTimeout(() => {
            const data = {
                check: userNameCheck,
                type: "username",
            };
            dispatch(CheckUserInfo(data));
        }, 1000);
        return () => clearTimeout(timeout);
    };
    useEffect(() => {
        if (userNameCheck !== "") return handelCheckUniqUserName();
    }, [userNameCheck]);

    const history = useHistory();
    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <FormControl>
                        <InputLabel htmlFor="first_name">{t("FirstName")}</InputLabel>
                        <Input
                            className={`${errors.first_name && "Border_Error"} left_Radius`}
                            type={"text"}
                            id="first_name"
                            variant="outlined"
                            {...register("first_name", {required: true})}
                        />
                        {errors.first_name && <ERROR>{t("Requierd")}</ERROR>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl>
                        <InputLabel htmlFor="last_name">{t("LastName")}</InputLabel>
                        <Input
                            className={`${errors.last_name && "Border_Error"} right_Radius`}
                            type={"text"}
                            id="last_name"
                            variant="outlined"
                            {...register("last_name", {required: true})}
                        />
                        {errors.last_name && <ERROR>{t("Requierd")}</ERROR>}
                    </FormControl>
                </Grid>
            </Grid>
            <FormControl>
                <InputLabel htmlFor="username">{t("UserName")}</InputLabel>
                <Input
                    className={`${errors.username && "Border_Error"} left_Radius`}
                    type={"text"}
                    onChange={({target}) => setUserNameCheck(target.value)}
                    id="username"
                    variant="outlined"
                />
                <Box
                    style={t("direction") === "rtl" ? {left: 10} : {right: 10}}
                    sx={{position: "absolute", top: "39px"}}
                >
                    {check ? (
                        <CheckCircle sx={{color: "#22b244"}}/>
                    ) : check === false ? (
                        <HighlightOff sx={{color: "#da1111"}}/>
                    ) : null}
                </Box>
                {errors.username && <ERROR>{t("Requierd")}</ERROR>}
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="email"> {t("Email")}</InputLabel>
                {emailDisabled ? (
                    <Input
                        className={`${errors.email && "Border_Error"} left_Radius`}
                        type={"text"}
                        id="email"
                        onChange={({target}) => setMEmailCheck(target.value)}
                        variant="outlined"
                        disabled={emailDisabled}
                        {...register('email', {required: true})}
                    />
                ): (
                    <Input
                        className={`${errors.email && "Border_Error"} left_Radius`}
                        type={"text"}
                        id="email"
                        onChange={({target}) => setMEmailCheck(target.value)}
                        variant="outlined"
                    />
                )}

                <Box
                    style={t("direction") === "rtl" ? {left: 10} : {right: 10}}
                    sx={{position: "absolute", top: "39px"}}
                >
                    {checkEmailUser ? (
                        <CheckCircle sx={{color: "#22b244"}}/>
                    ) : checkEmailUser === false ? (
                        <HighlightOff sx={{color: "#da1111"}}/>
                    ) : null}
                </Box>
                {errors.email && <ERROR>{t("Requierd")}</ERROR>}
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="mobile">{t("Mobile")} </InputLabel>
                <Input
                    className={`${errors.mobile && "Border_Error"} left_Radius`}
                    type={"number"}
                    onChange={({target}) => setMobileCheck(target.value)}
                    id="outlined-basic"
                    variant="outlined"
                />
                <Box
                    style={t("direction") === "rtl" ? {left: 10} : {right: 10}}
                    sx={{position: "absolute", top: "39px"}}
                >
                    {checkMobileUser ? (
                        <CheckCircle sx={{color: "#22b244"}}/>
                    ) : checkMobileUser === false ? (
                        <HighlightOff sx={{color: "#da1111"}}/>
                    ) : null}
                </Box>
                {errors.mobile && <ERROR>{t("Requierd")}</ERROR>}
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password">{t("Password")}</InputLabel>
                <Input
                    className={`${errors.password && "Border_Error"} left_Radius`}
                    type={"text"}
                    id="outlined-basic"
                    variant="outlined"
                    {...register("password", {required: true})}
                />
                {errors.password && <ERROR>{t("Requierd")}</ERROR>}
            </FormControl>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <FileUploader
                    src={file}
                    onFileUpload={setFile}
                    uploadMultiple={false}
                    showPreview={true}
                    title={t("PHOTO_SELECTION_KEY")}
                    description={t("NEED_CHANGE_IMAGE_KEY")}
                >
                    <FileInput>
                        <div className="wrap-custom-file">
                            <label htmlFor="avatar">
                                <Box
                                    sx={{
                                        backgroundColor: "#fff",
                                        borderRadius: 2,
                                        padding: 0.5,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <PersonIcon/>
                                </Box>
                            </label>
                        </div>
                    </FileInput>
                </FileUploader>
            </Box>
            <FormControl>
                <CoreBTN
                    loading={loading}
                    disabled={
                        checkMobileUser === false ||
                        check === false ||
                        checkEmailUser === false
                    }
                    fullWidth
                    sx={{padding: "10px 0", borderRadius: "25px"}}
                    type={"submit"}
                    onClick={() => setTabs(1)}
                    variant={"contained"}
                    title={emailDisabled ? t('SignUp') : t("Next")}
                />
            </FormControl>
            <Box textAlign={"center"}>
                {t("Not_a_Member")}
                <Typography
                    onClick={() => history.push(Path.SIGNIN)}
                    color={"primary"}
                    component={"a"}
                    href={"#"}
                    variant={"h6"}
                >
                    {t("SignIN")}
                </Typography>
            </Box>
        </>
    );
};

export default UserInfo;
