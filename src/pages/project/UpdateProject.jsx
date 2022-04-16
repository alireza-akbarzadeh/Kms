import React, {useEffect} from "react";
import {Box, Button, Container, Grid, Switch, Typography} from "@mui/material";
import {CustomText, CustomInput} from "components";
import {CoreBTN, ModalCore} from "core";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {changeUpdateProject, updateProject} from "redux/features/project/UpdateProjectSlice";
import {Calendar} from "@amir04lm26/react-modern-calendar-date-picker";
import {DateInput} from "components";
import Select from "react-select";
import {getTeamsList} from "redux/features/project/Teams/getTeamList";
import {FileUploader} from "../../helper";
import {UploadBtn} from "../Tickets/Tickets.styled";
import {showProject} from "../../redux/features/project/showPorjectSlice";

const UpdateProject = ({openModal, setOpenModal, data, projectId: id}) => {
    const [selectedDayRange, setSelectedDayRange] = React.useState({
        from: null, to: null,
    });
    const [submit, setSubmit] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    const [selectedDay, setSelectedDay] = React.useState(null);
    const [avatar, setAvatar] = React.useState(null);
    const [header, setHeader] = React.useState(null);
    const [selectedOption, setSelectedOption] = React.useState(null);
    const {t} = useTranslation();
    const {loading, isSuccess} = useSelector((state) => state.updateProject);
    const {data: teamdata} = useSelector((state) => state.TeamsList);

    let LocaleDate = t("lng") === "fa" ? "fa-IR" : "en";
    let today = new Date().toLocaleDateString(LocaleDate);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTeamsList({isPaginate: false}));
    }, [dispatch]);


    const handleCheckLeaves = (event) => {
        setChecked(event.target.checked);
    };


    useEffect(() => {
        if (isSuccess && submit) {
            setOpenModal(false)
        }
    }, [isSuccess,submit])

    useEffect(() => {
        setValue("title", data?.title);
        setValue("description", data.description);
        setSelectedDayRange({
            from: {
                day: parseInt(data?.start_time?.split('-')[2]),
                month: parseInt(data?.start_time?.split('-')[1]),
                year: parseInt(data?.start_time?.split('-')[0]),
            }, to: {
                day: parseInt(data?.estimated_time?.split('-')[2]),
                month: parseInt(data?.estimated_time?.split('-')[1]),
                year: parseInt(data?.estimated_time?.split('-')[0]),
            }
        })
        setSelectedDay({
            day: parseInt(data?.end_time?.split('-')[2]),
            month: parseInt(data?.end_time?.split('-')[1]),
            year: parseInt(data?.end_time?.split('-')[0]),
        })
        setSelectedOption({
            label: data?.team?.title, value: data?.team?.id
        })
        setChecked(data?.active);
    }, [data]);

    const {
        register, handleSubmit, setValue, formState: {errors},
    } = useForm();

    const startDate = selectedDayRange.from?.year + "/" + selectedDayRange.from?.month + "/" + selectedDayRange.from?.day;
    const estimatedTime = selectedDayRange.to?.year + "/" + selectedDayRange.to?.month + "/" + selectedDayRange.to?.day;
    const endTime = selectedDay?.year !== undefined ? selectedDay?.year + "/" + selectedDay?.month + "/" + selectedDay?.day : null;


    const onSubmit = (req) => {
        let formData = new FormData();
        if (avatar !== null) {
            formData.append('avatar', avatar[0])
        }
        if (header !== null) {
            formData.append('header', header[0])
        }
        if (endTime !== null) {
            formData.append('end_time', endTime)
        }
        formData.append('title', req?.title)
        formData.append('description', req?.description)
        formData.append('team_id', selectedOption?.value === null ? data?.team?.id : selectedOption?.value)
        formData.append('start_time', startDate)
        formData.append('estimated_time', estimatedTime)
        formData.append(' active', checked ? "1" : 0)

        dispatch(updateProject({
            data: formData, id: id
        })).then(res => {
            setSubmit(true)
            dispatch(showProject(id));
        })
        setSubmit(false)
    };

    const options = teamdata?.data?.data?.map((item) => {
        return {label: item.title, value: item.id};
    });

    return (<>
        <ModalCore
            title={t("Edit_project")}
            size="900px"
            open={openModal}
            setOpen={setOpenModal}
        >
            <Box sx={{height: 600, overflowY: "scroll"}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        sx={{
                            display: "flex",
                            marginTop: 4,
                            justifyContent: "space-between",
                            marginLeft: 4,
                            marginRight: 4
                        }}
                    >
                        <Grid container spacing={2}>
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
                                            marginTop: 5,
                                        }}
                                    >
                                        <Box sx={{marginTop: 1}}>{today}</Box>
                                    </Box>
                                    <Calendar
                                        value={selectedDayRange}
                                        onChange={setSelectedDayRange}
                                        shouldHighlightWeekends
                                        calendarClassName="custom-calendar"
                                        colorPrimary="rgba(128, 5, 216, 0.9)"
                                        colorPrimaryLight="rgba(128, 5, 216, 0.2)"
                                        calendarTodayClassName="custom-today-day"
                                        locale={"fa"}
                                    />
                                </Box>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <FileUploader
                                            src={avatar}
                                            onFileUpload={setAvatar}
                                            uploadMultiple={false}
                                            showPreview={true}
                                        >
                                            <UploadBtn variant="contained" component="label">
                                                {t("Avatar")}
                                                <input type="file" hidden/>
                                            </UploadBtn>
                                        </FileUploader>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FileUploader
                                            src={header}
                                            onFileUpload={setHeader}
                                            uploadMultiple={false}
                                            showPreview={true}
                                        >
                                            <UploadBtn variant="contained" component="label">
                                                {t("Header")}
                                                <input type="file" hidden/>
                                            </UploadBtn>
                                        </FileUploader>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomInput
                                    errors={errors}
                                    register={register}
                                    title={t("Title")}
                                    field="title"
                                    type="text"
                                    required={true}
                                />
                                <DateInput
                                    selectedDay={selectedDay}
                                    setSelectedDay={setSelectedDay}
                                />
                                <Select
                                    className="React_select"
                                    value={selectedOption}
                                    defaultInputValue={data?.team?.title}
                                    onChange={setSelectedOption}
                                    options={options}
                                    placeholder={t("Select")}
                                />
                                <CustomText
                                    errors={errors}
                                    register={register}
                                    title={t("Description")}
                                    field="description"
                                    type="text"
                                    required={true}
                                />
                                <Box sx={{display: "inline-flex", alignItems: "center"}}>
                                    <Switch
                                        checked={checked}
                                        onChange={handleCheckLeaves}
                                        inputProps={{"aria-label": "controlled"}}
                                    />
                                    <Typography>
                                        {checked ? t("Active") : t("DeActive")}
                                    </Typography>
                                </Box>

                                <Box
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    mt={6}
                                >
                                    <CoreBTN
                                        fullWidth
                                        loading={loading}
                                        sx={{borderRadius: 15, padding: "5px 12px"}}
                                        variant={"contained"}
                                        color={"primary"}
                                        type={"submit"}
                                        title={t("Confirmation")}
                                    />
                                    <Button
                                        fullWidth
                                        sx={{
                                            borderRadius: 15, padding: "5px 12px", margin: "0 15px",
                                        }}
                                        variant={"contained"}
                                        color={"secondary"}
                                        onClick={() => setOpenModal(false)}
                                    >
                                        {t("Cancel")}
                                    </Button>

                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Box>
        </ModalCore>
    </>);
};

export default UpdateProject;
