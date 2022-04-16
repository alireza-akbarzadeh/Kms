import React, { useEffect } from 'react'
import { Button, Grid, TextField, Box } from '@mui/material';
import { CustomText } from 'components';
import { CoreBTN } from 'core';
import ModalCore from 'core/ModalCore';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Calendar } from '@amir04lm26/react-modern-calendar-date-picker';
import { useSelector, useDispatch } from 'react-redux';
import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import * as moment from "jalali-moment";
import { createSubmitStudyTime } from "redux/features/users/study-time/createStudyTime"
import {getStudyTime} from "../../../redux/features/users/study-time/getStudyTimeSlice";
const CreateStudyTime = ({ openModal, setOpenModal }) => {
    const { t } = useTranslation();
    const [ArrivalValue, setArrivalValue] = React.useState(null);
    const [OutValue, setOutValue] = React.useState(null);
    const [submit, setSubmit] = React.useState(false);
    const { error, loading, isSuccess } = useSelector(state => state.createSubmitStudyTime)

    const dispatch = useDispatch()
    let LocaleDate = t("lng") === "fa" ? "fa-IR" : "en";
    let today = new Date().toLocaleDateString(LocaleDate);
    const dir = t("direction") === "rtl"
    const [selectedDayRange, setSelectedDayRange] = React.useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = (data) => {
        const Arrival = moment(ArrivalValue, "HH:mm:ss")
            .locale("fa")
            .format("HH:mm:ss");

        const Out = moment(OutValue, "HH:mm:ss").locale("fa").format("HH:mm:ss");
        const totalDate = `${selectedDayRange?.year}/${selectedDayRange?.month}/${selectedDayRange?.day}`
        const totalData = {
            date: totalDate,
            arrival: Arrival === "Invalid date" ? null : Arrival,
            out: Out === "Invalid date" ? null : Out,
            description: data.description
        };

        dispatch(createSubmitStudyTime(totalData))
            .then(res => {
                setSubmit(true)
                dispatch(getStudyTime())
            })
        setSubmit(false)
    };

    useEffect(() => {
        if (isSuccess, submit) {
            return setOpenModal(false)
        } 
    }, [isSuccess, submit])

    return (
        <div>
            <ModalCore
                title={t("Submit_StudyTime")}
                size="800px"
                open={openModal}
                setOpen={setOpenModal}
            >
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                        <Box sx={{ marginTop: 1 }}>{today}</Box>
                                    </Box>
                                    <Calendar
                                        value={selectedDayRange}
                                        onChange={setSelectedDayRange}
                                        calendarClassName="custom-calendar"
                                        colorPrimary="rgba(128, 5, 216, 0.9)"
                                        colorPrimaryLight="rgba(128, 5, 216, 0.2)"
                                        calendarTodayClassName="custom-today-day"
                                        locale={"fa"}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ margin: "20px 0" }}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <TimePicker
                                            label={t("User_arrival")}
                                            value={ArrivalValue}
                                            ampm={false}
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
                                                    transformOrigin: dir ? "top right" : "top left",
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
                                <Box sx={{ margin: "20px 0" }}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <TimePicker
                                            label={t("User_Out")}
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
                                                    transformOrigin: dir ? "top right" : "top left",
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
                                <CustomText
                                    errors={error}
                                    register={register}
                                    title={t('Description')}
                                    field='description'
                                    type='text'
                                    required={true}
                                />

                                <Box
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    mt={4}
                                >
                                    <CoreBTN
                                        fullWidth
                                        loading={loading}
                                        sx={{ borderRadius: 15, padding: "5px 12px" }}
                                        variant={"contained"}
                                        color={"primary"}
                                        type={"submit"}
                                        title={t("Confirmation")}
                                    />
                                    <Button
                                        fullWidth
                                        sx={{ borderRadius: 15, padding: "5px 12px", margin: "0 15px" }}
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
        </div>
    )
}

export default CreateStudyTime
