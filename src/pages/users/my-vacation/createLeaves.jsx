import React, {useEffect} from "react";
import {ModalCore} from "core";
import {
    Box,
    Button,
    Switch,
    Typography,
    Grid,
    TextField,
    Divider,
    Alert
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {CoreBTN} from "core";
import {CustomText} from "components";
import {Calendar} from "@amir04lm26/react-modern-calendar-date-picker";
import {LocalizationProvider, TimePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {userSubmitSickLaeve} from "redux/features/users/Submit-leaves/userSubmitSicekLeave";
import {userSubmitLaeve} from "redux/features/users/Submit-leaves/userSubmitLeave";

import * as moment from "jalali-moment";
import {FileUploader} from "../../../helper";
import {UploadBtn} from "../../Tickets/Tickets.styled";

const CreateLeaves = ({openModal, setOpenModal, id}) => {
    const {t} = useTranslation();
    const [file, setFile] = React.useState(null);
    const [checked, setChecked] = React.useState(true);
    const [submit, setSubmit] = React.useState(false);
    const [checkedSick, setCheckedSick] = React.useState(false);
    const [selectedDayRange, setSelectedDayRange] = React.useState(null);
    let dir = t('direction') === "rtl" ? "unset !important" : "0 !important"
    const {error, isSuccess} = useSelector((state) => state.userSubmitSickLaeve)
    const [OutValue, setOutValue] = React.useState(null);
    const [arrivalValue, setArrivalValue] = React.useState(null);
    const dispatch = useDispatch();
    let LocaleDate = t("lng") === "fa" ? "fa-IR" : "en";
    let today = new Date().toLocaleDateString(LocaleDate);


    const handleCheckLeaves = (event) => {
        setChecked(event.target.checked);
        setCheckedSick(false)
        setSelectedDayRange(null)
    };

    const handleCheckSickness = (event) => {
        setCheckedSick(event.target.checked);
        setChecked(false)
        setSelectedDayRange({
            from: null,
            to: null
        })
    };

    useEffect(() => {
        if (isSuccess && submit){
            setOpenModal(false)
        }
    }, [isSuccess, submit])

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();


    const onSubmit = (data) => {
        if (checked) {
            const date = selectedDayRange?.year + '/' + selectedDayRange?.month + '/' + selectedDayRange?.day;
            let type = 'day'
            const arrival = moment(arrivalValue, "HH:mm:ss").locale("fa").format("HH:mm:ss");
            const out = moment(OutValue, "HH:mm:ss").locale("fa").format("HH:mm:ss");
            if (arrival !== 'Invalid date' && out !== 'Invalid date') {
                type = 'hour'
            }
            const totalData = {
                type: type,
                date: moment(date, "jYYYY-jMM-jDD").locale("en").format("YYYY-MM-DD"),
                start: arrival,
                end: out,
                active: checked,
                description: data.description,
            }
            dispatch(userSubmitLaeve(totalData))
                .then(res => {
                    setSubmit(true)
                })
            setSubmit(false)
        } else if (checkedSick) {
            const formData = new FormData();
            if (file !== null) {
                formData.append('file', file[0]);
            }
            const fromDate = selectedDayRange?.from?.year + '/' + selectedDayRange?.from?.month + '/' + selectedDayRange?.from?.day;
            const toDate = selectedDayRange?.to?.year + '/' + selectedDayRange?.to?.month + '/' + selectedDayRange?.to?.day;
            formData.append('start_date',  moment(fromDate, "jYYYY-jMM-jDD").locale("en").format("YYYY-MM-DD"))
            formData.append('end_date', moment(toDate, "jYYYY-jMM-jDD").locale("en").format("YYYY-MM-DD"))
            formData.append('active', checked)
            formData.append('description', data.description)

            dispatch(userSubmitSickLaeve(formData))
                .then(res => {
                    setSubmit(true)
                })
            setSubmit(false)
        }
    };

    return (
        <>
            <ModalCore
                title={t("Submit_Leaves")}
                size="800px"
                open={openModal}
                setOpen={setOpenModal}
            >
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{display: "flex", marginTop: 4, justifyContent: "space-between"}}>
                            <Box sx={{display: "inline-flex", alignItems: "center"}}>
                                <Switch
                                    checked={checked}
                                    onChange={handleCheckLeaves}
                                    inputProps={{'aria-label': 'controlled'}}
                                />
                                <Typography>{t("Daily")}</Typography>
                            </Box>
                            <Box sx={{display: "inline-flex", alignItems: "center"}}>
                                <Switch
                                    checked={checkedSick}
                                    onChange={handleCheckSickness}
                                    inputProps={{'aria-label': 'controlled'}}
                                />
                                <Typography>{t("Sickness")}</Typography>
                            </Box>
                        </Box>
                        <Grid container spacing={4} alignItems={"center"}>
                            <Grid item xs={12} md={6}>
                                <Box>
                                    <Box
                                        sx={{
                                            background: "rgba(128, 5, 216, 0.9)",
                                            padding: 2,
                                            color: "#fff",
                                            width: "20.7em",
                                            borderTopRightRadius: 10,
                                            borderTopLeftRadius: 10,
                                            textAlign: "center",
                                            marginTop: 5
                                        }}
                                    >
                                        <Box sx={{marginTop: 1}}>{today}</Box>
                                    </Box>
                                    <Calendar
                                        value={selectedDayRange}
                                        onChange={setSelectedDayRange}
                                        shouldHighlightWeekends={false}
                                        calendarClassName="custom-calendar"
                                        colorPrimary="rgba(128, 5, 216, 0.9)"
                                        colorPrimaryLight="rgba(128, 5, 216, 0.2)"
                                        calendarTodayClassName="custom-today-day"
                                        locale={"fa"}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomText
                                    errors={errors}
                                    register={register}
                                    title={t('Description')}
                                    field='description'
                                    type='text'
                                    required={true}
                                />
                                {checked ? (
                                    <Box sx={{margin: "20px 0"}}>
                                        <Divider variant="middle"/>
                                        <Alert severity="info">{t('createLeaveAlert')}</Alert>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <TimePicker

                                                label={t("start")}
                                                ampm={false}
                                                value={arrivalValue}
                                                onChange={(newValue) => {
                                                    setArrivalValue(newValue);
                                                }}
                                                renderInput={(params) => <TextField sx={{
                                                    direction: 'rtl',
                                                    marginTop: " 30px !important",
                                                    fontsSize: 18,
                                                    width: "100%",
                                                    color: "#444",
                                                    "& label": {
                                                        transformOrigin: "top left",
                                                        color: "#555",
                                                        fontSize: "14px",
                                                        top: "0 !important",
                                                        right: "23px !important",
                                                        left: dir,
                                                    },
                                                }} fullWidth {...params} />}
                                            />
                                            <TimePicker
                                                label={t("end")}
                                                ampm={false}
                                                value={OutValue}
                                                onChange={(newValue) => {
                                                    setOutValue(newValue);
                                                }}
                                                renderInput={(params) => <TextField sx={{
                                                    direction: 'rtl',
                                                    marginTop: " 30px !important",
                                                    fontsSize: 18,
                                                    width: "100%",
                                                    color: "#444",
                                                    "& label": {
                                                        transformOrigin: "top left",
                                                        color: "#555",
                                                        fontSize: "14px",
                                                        top: "0 !important",
                                                        right: "23px !important",
                                                        left: dir,
                                                    },
                                                }} fullWidth {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                ) : (
                                    <FileUploader
                                        src={file}
                                        onFileUpload={setFile}
                                        uploadMultiple={false}
                                        showPreview={true}
                                    >
                                        <UploadBtn variant="contained" component="label">
                                            {t("withFile")}
                                            <input type="file" hidden />
                                        </UploadBtn>
                                    </FileUploader>
                                )}
                                <Box
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    mt={4}
                                >
                                    <CoreBTN
                                        fullWidth
                                        // loading={loading}
                                        sx={{borderRadius: 15, padding: "5px 12px"}}
                                        variant={"contained"}
                                        color={"primary"}
                                        type={"submit"}
                                        title={t("Confirmation")}
                                    />
                                    <Button
                                        fullWidth
                                        sx={{borderRadius: 15, padding: "5px 12px", margin: "0 15px"}}
                                        variant={"contained"}
                                        color={"secondary"}
                                        onClick={() => setOpenModal(false)}
                                    >
                                        {t("Cancel")}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </ModalCore>
        </>
    );
};

export default CreateLeaves;
