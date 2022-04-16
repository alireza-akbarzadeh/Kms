import * as React from "react";
import {Box, Grid, Typography, useMediaQuery} from "@mui/material";
import {HeadrAuth} from "components";
import {
    Divider,
    FormBG,
    FormContainer,
    ImageControl,
} from "./Styled_Register";
import UserInfo from "./UserInfo";
import AgencyInfo from "./AgencyInfo";
import {Business, Person} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {getCustomerTypes} from "redux/features/Auth/checkTypeSlice";
import {SingUp} from "redux/features/Auth/singupSlice";

const Register = () => {
    const [mobileCheck, setMobileCheck] = React.useState("");
    const [userNameCheck, setUserNameCheck] = React.useState("");
    const [EmailCheck, setMEmailCheck] = React.useState("");
    const [tabs, setTabs] = React.useState(0);
    const [file, setFile] = React.useState(null);
    const [logoPic, setLogoPic] = React.useState(null);

    const {data} = useSelector((state) => state.getCustomer);
    const {loading} = useSelector((state) => state.SignUp);
    const matches = useMediaQuery("(min-width:800px)");
    const mobile = useMediaQuery("(max-width:780px)");

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const handleSignUp = (data) => {
        const formData = new FormData();
        if (file !== null) {
            formData.append("avatar", file[0]);
        }
        formData.append("logo", logoPic[0]);
        formData.append("description", data.description);
        formData.append("title", data.title);
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("password", data.password);
        formData.append("email", EmailCheck);
        formData.append("mobile", mobileCheck);
        formData.append("username", userNameCheck);
        formData.append("customer_type_id", data.agency);
        dispatch(SingUp(formData));
    };

    React.useEffect(() => {
        dispatch(getCustomerTypes());
    }, [dispatch]);
    return (
        <>
            <HeadrAuth/>
            <Grid spacing={0} container>
                {matches ? (
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
                ) : null}
                <Grid item md={7} xs={12}>
                    <FormBG elevation={mobile ? 3 : 0}>
                        <FormContainer>
                            <Box sx={{marginBottom: 1}} textAlign={"center"}>
                                <Typography
                                    mt={7}
                                    color={"#707070"}
                                    component={"h4"}
                                    variant={"h5"}
                                >
                                    {t("SignUp")}
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
                                    color={tabs === 1 && "#8005d8"}
                                >
                                    <Business/>
                                    <Typography
                                        sx={{marginTop: 1, paddingRight: 1, whiteSpace: "nowrap"}}
                                        component={"span"}
                                    >
                                        {t("Organization_information")}
                                    </Typography>
                                </Typography>
                            </Box>
                            <form onSubmit={handleSubmit(handleSignUp)}>
                                {tabs === 0 && (
                                    <UserInfo
                                        loading={loading}
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
                                )}
                                {tabs === 1 && (
                                    <AgencyInfo
                                        logoPic={logoPic}
                                        setLogoPic={setLogoPic}
                                        data={data.data}
                                        register={register}
                                        errors={errors}
                                        tabs={tabs}
                                        setTabs={setTabs}
                                    />
                                )}
                            </form>
                        </FormContainer>
                    </FormBG>
                </Grid>
            </Grid>
        </>
    );
};
export default Register;
