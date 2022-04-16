import React from "react";
import {ModalCore} from "../../core";
import {Box, Button, FormControl, InputLabel, Input, Grid} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Dropzone, FileItem} from "@dropzone-ui/react";
import {CloudUpload} from '@mui/icons-material';
import {ERROR} from "pages/Login/Styled_Login";
import {restUserNameAction} from "redux/features/users/resetUserNameSlice";
import {getUserInfo} from "redux/features/users/userSlice";
import {CoreBTN} from "core";
import _ from "lodash"

const SettingPassword = ({openModal, setOpenModal}) => {
    const [file, setFile] = React.useState([]);
    const {t} = useTranslation();
    let dir = t("direction") === "rtl";
    const {loading, error, isSuccess} = useSelector(
        (state) => state.resetUserName
    );

    React.useEffect(() => {
        if (isSuccess) {
            setOpenModal(false);
        }
    }, [isSuccess])

    const {data} = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const updateFiles = (incomingFiles) => {
        const newFiles = _.last(incomingFiles)
        setFile([newFiles]);
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    React.useEffect(() => {
        if (data?.data) {
            setValue("first_name", data.data.first_name);
            setValue("last_name", data.data.last_name);
            setValue("username", data.data.username);
            setValue("email", data.data.email);
            setValue("mobile", data.data.mobile);
        }
    }, [data]);

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("mobile", data.mobile);
        if (file.length !== 0) {
            formData.append("file", file[0].file);
        }
        dispatch(restUserNameAction(formData));
        dispatch(getUserInfo())
    };


    return (
        <>
            <ModalCore
                title={t("Edit_Account")}
                open={openModal}
                size="900px"
                setOpen={setOpenModal}
            >
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={4} alignItems={"center"}>
                            <Grid item xs={12} md={6}>
                                <FormControl sx={{margin: "10px 0", width: "100%"}}>
                                    <InputLabel
                                        sx={dir && {right: 14, left: "unset", fontSize: 14}}
                                    >
                                        {t("FirstName")}
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        className={`left_Radius`}
                                        id="first_name"
                                        variant="contained"
                                        {...register("first_name", {required: true})}
                                    />
                                    {errors.first_name && <ERROR>{t("Requierd")}</ERROR>}
                                </FormControl>
                                <FormControl sx={{margin: "10px 0", width: "100%"}}>
                                    <InputLabel
                                        sx={dir && {right: 14, left: "unset", fontSize: 14}}
                                    >
                                        {t("LastName")}
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        className={`left_Radius`}
                                        id="last_name"
                                        variant="outlined"
                                        {...register("last_name", {required: true})}
                                    />
                                    {errors.last_name && <ERROR>{t("Requierd")}</ERROR>}
                                </FormControl>
                                <FormControl sx={{margin: "10px 0", width: "100%"}}>
                                    <InputLabel
                                        sx={dir && {right: 14, left: "unset", fontSize: 14}}
                                    >
                                        {t("UserName")}
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        className={`left_Radius`}
                                        id="username"
                                        variant="outlined"
                                        {...register("username", {required: true})}
                                    />
                                    {errors.username && <ERROR>{t("Requierd")}</ERROR>}
                                    {error?.username && <ERROR>{error.username[0]}</ERROR>}
                                </FormControl>
                                <FormControl sx={{margin: "10px 0", width: "100%"}}>
                                    <InputLabel
                                        sx={dir && {right: 14, left: "unset", fontSize: 14}}
                                    >
                                        {t("Mobile")}
                                    </InputLabel>
                                    <Input
                                        disabled
                                        type="text"
                                        className={`left_Radius`}
                                        id="mobile"
                                        variant="outlined"
                                        {...register("mobile", {required: true})}
                                    />
                                </FormControl>
                                <FormControl sx={{margin: "10px 0", width: "100%"}}>
                                    <InputLabel
                                        sx={dir && {right: 14, left: "unset", fontSize: 14}}
                                    >
                                        {t("Email")}
                                    </InputLabel>
                                    <Input
                                        disabled
                                        type="text"
                                        className={`left_Radius`}
                                        id="Email"
                                        variant="outlined"
                                        {...register("email", {required: true})}
                                    />
                                </FormControl>
                                <Box
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    mt={4}
                                >
                                    <CoreBTN
                                        loading={loading}
                                        sx={{borderRadius: 15, padding: "5px 12px"}}
                                        variant={"contained"}
                                        color={"primary"}
                                        title={t("Confirmation")}
                                        type={"submit"}
                                    />
                                    <Button
                                        sx={{borderRadius: 15, padding: "5px 12px", margin: "0 15px"}}
                                        variant={"contained"}
                                        color={"secondary"}
                                        onClick={() => setOpenModal(false)}
                                    >
                                        {t("Cancel")}
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <Dropzone
                                        footer={false}
                                        header={false}
                                        label={<CloudUpload sx={{
                                            fontSize: '100px'
                                        }}/>}
                                        onChange={updateFiles}
                                        value={file}>
                                        {file.map((itemFile) => (
                                            <FileItem {...itemFile} preview/>
                                        ))}
                                    </Dropzone>
                                </Box>
                            </Grid>
                        </Grid>

                    </form>
                </Box>
            </ModalCore>
        </>
    );
};
export default SettingPassword;