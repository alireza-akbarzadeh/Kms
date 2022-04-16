import {useParams} from "react-router-dom";
import {CustomInput, HeadrAuth, NoAccess, RegisterExpired} from "components";
import * as React from "react";
import {Box, Grid, Typography} from "@mui/material";
import {Divider, FormBG, FormContainer, ImageControl} from "./Styled_Register";
import {useTranslation} from "react-i18next";
import {Workspaces, Person} from "@mui/icons-material";
import UserInfo from "./UserInfo";
import {useForm} from "react-hook-form";
import {SingUpEmployee} from "../../redux/features/Auth/singupEmployeeSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {CheckInviteLink} from "../../redux/features/Auth/CheckInviteLink";
import {FirstLoadingCore} from "../../core";

const RegisterEmployee = () => {
    const [mobileCheck, setMobileCheck] = React.useState("");
    const [userNameCheck, setUserNameCheck] = React.useState("");
    const [EmailCheck, setMEmailCheck] = React.useState("");
    const [file, setFile] = React.useState(null);
    const [tabs, setTabs] = React.useState(0);
    const [logoPic, setLogoPic] = React.useState(null);
    let {type, unique} = useParams();
    const {data, loading, isSuccess} = useSelector((state) => state.CheckInviteLinkSlice);
    const {loading: mainLoading} = useSelector((state) => state.signUpEmployee);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    useEffect(() => {
        dispatch(CheckInviteLink({unique}))
    }, [dispatch])

    useEffect(() => {
        setValue('email', data?.data?.email)
    }, [data])

    const {
        register,
        setValue,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const handleSignUp = (req) => {
        const formData = new FormData();
        formData.append("first_name", req.first_name);
        formData.append("last_name", req.last_name);
        formData.append("password", req.password);
        formData.append("email", data?.data?.email);
        formData.append("mobile", mobileCheck);
        formData.append("username", userNameCheck);
        if (file !== null) {
            formData.append("avatar", file[0]);
        }
        dispatch(SingUpEmployee({
            data: formData,
            type: type,
            unique: unique
        }));
    };

    if (loading) {
        return  <FirstLoadingCore loading={loading}/>;
    }else{
        if (isSuccess){
            return (
                <>
                    <HeadrAuth/>
                    <Grid spacing={0} container>
                        <Grid item md={5} xs={12}>
                            <ImageControl>
                                <Typography component={"h3"} color={"secondary.dark"}>
                                    {t("Resources_your_knowledge")}
                                    <br/>
                                    {t("Share_with_others")}
                                </Typography>
                                <img
                                    className={"w-full h-full"}
                                    src="/assets/images/Group 131.svg"
                                    alt=""
                                />
                            </ImageControl>
                        </Grid>

                        <Grid item md={7} xs={12}>
                            <FormBG elevation={0}>
                                <FormContainer>
                                    <Box sx={{
                                        marginBottom: 1,
                                        alignItems: 'center'
                                    }}>
                                        <Typography
                                            mt={7}
                                            color={"#707070"}
                                            component={"h4"}
                                            variant={"h5"}
                                        >
                                            {t("SignUp")} ({data?.data?.workspace})
                                        </Typography>
                                    </Box>
                                    <Box
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                        sx={{display: "flex", width: "100%"}}
                                    >
                                        <Typography
                                            sx={{display: "flex", alignItems: "center"}}
                                            color={"#8005d8"}
                                        >
                                            <Person/>
                                            <Typography
                                                sx={{marginTop: 1, paddingRight: 1, whiteSpace: "nowrap"}}
                                                component={"span"}
                                            >
                                                {t("UserInfo")}
                                            </Typography>
                                        </Typography>
                                        <Divider/>
                                        <Typography
                                            sx={{display: "flex", alignItems: "center"}}
                                            color={"#8005d8"}
                                        >
                                            <Workspaces/>
                                            <Typography
                                                sx={{marginTop: 1, paddingRight: 1, whiteSpace: "nowrap"}}
                                                component={"span"}
                                            >
                                                {t(type)}
                                            </Typography>
                                        </Typography>
                                    </Box>

                                    <form onSubmit={handleSubmit(handleSignUp)}>
                                        <UserInfo
                                            loading={mainLoading}
                                            emailDisabled={true}
                                            errors={errors}
                                            register={register}
                                            setTabs={setTabs}
                                            mobileCheck={mobileCheck}
                                            setMobileCheck={setMobileCheck}
                                            userNameCheck={userNameCheck}
                                            EmailCheck={EmailCheck}
                                            setUserNameCheck={setUserNameCheck}
                                            setMEmailCheck={setMEmailCheck}
                                            file={file}
                                            setFile={setFile}
                                        />
                                    </form>

                                </FormContainer>
                            </FormBG>
                        </Grid>
                    </Grid>
                </>
            )
        }else{
            return <RegisterExpired/>
        }
    }

}

export default RegisterEmployee