import {Box, Grid, Button} from '@mui/material';
import {CustomText} from 'components';
import CoreBTN from 'core/CoreBTN';
import ModalCore from 'core/ModalCore';
import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Calendar} from '@amir04lm26/react-modern-calendar-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {CustomInput} from 'components';
import {getTeamsList} from "redux/features/project/Teams/getTeamList";
import {DateInput} from 'components';
import {storeProject} from 'redux/features/project/storePorjectSlice';
import Select from "react-select";
import {FileUploader} from "../../helper";
import {UploadBtn} from "../Tickets/Tickets.styled";
import {getProjectList} from "../../redux/features/project/ProjectListSlice";

const StoreProject = ({openModal, setOpenModal}) => {

    const [selectedDayRange, setSelectedDayRange] = React.useState({from: null, to: null});
    const [selectedDay, setSelectedDay] = React.useState(null);
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [submit, setSubmit] = React.useState(false);
    const [avatar, setAvatar] = React.useState(null);
    const [header, setHeader] = React.useState(null);
    const dispatch = useDispatch();
    const {t} = useTranslation()
    const {data: teamData} = useSelector((state) => state.TeamsList);
    const {loading, isSuccess} = useSelector((state) => state.storeProjectSlice);


    let LocaleDate = t("lng") === "fa" ? "fa-IR" : "en";
    let today = new Date().toLocaleDateString(LocaleDate);

    React.useEffect(() => {
        dispatch(getTeamsList({isPaginate: false}));
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess && submit) {
            setOpenModal(false)
        }
    }, [isSuccess, submit])

    const startDate = selectedDayRange.from?.year + '/' + selectedDayRange.from?.month + '/' + selectedDayRange.from?.day;
    const estimatedTime = selectedDayRange.to?.year + '/' + selectedDayRange.to?.month + '/' + selectedDayRange.to?.day;
    const endTime = selectedDay?.year + '/' + selectedDay?.month + '/' + selectedDay?.day;
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = (data) => {
        let formData = new FormData();
        if (avatar !== null) {
            formData.append('avatar', avatar[0])
        }
        if (header !== null) {
            formData.append('header', header[0])
        }
        formData.append('title', data?.title)
        formData.append('description', data?.description)
        formData.append('team_id', selectedOption.value)
        formData.append('start_time', startDate)
        formData.append('estimated_time', estimatedTime)
        formData.append('end_time', endTime)

        dispatch(storeProject(formData))
            .then(res => {
                setSubmit(true)
                dispatch(getProjectList({perPage: 10, page: 1}))
            })
        setSubmit(false)
    };

    const options = teamData?.data?.data?.map((item) => {
        return {label: item.title, value: item.id}
    })

    return (
        <>
            <ModalCore
                title={t("Submnit_project")}
                size="900px"
                open={openModal}
                setOpen={setOpenModal}
            >
                <Box sx={{height: 600, overflowY: "scroll"}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{
                            display: "flex",
                            marginTop: 4,
                            justifyContent: "space-between",
                            marginLeft: 4,
                            marginRight: 4
                        }}>
                            <Grid container spacing={4}>
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
                                            shouldHighlightWeekends
                                            calendarClassName="custom-calendar"
                                            colorPrimary="rgba(128, 5, 216, 0.9)"
                                            colorPrimaryLight="rgba(128, 5, 216, 0.2)"
                                            calendarTodayClassName="custom-today-day"
                                            locale={"fa"}
                                        />
                                    </Box>

                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomInput
                                        errors={errors}
                                        register={register}
                                        title={t('Title')}
                                        field='title'
                                        type='text'
                                        required={true}
                                    />
                                    <DateInput selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
                                    <Select
                                        className="React_select"
                                        value={selectedOption}
                                        onChange={setSelectedOption}
                                        options={options}
                                        placeholder={t("Select")}
                                    />
                                    <CustomText
                                        errors={errors}
                                        register={register}
                                        title={t('Description')}
                                        field='description'
                                        type='text'
                                        required={true}
                                    />
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
                            </Grid>
                        </Box>
                        <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            mt={4}
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
                                sx={{borderRadius: 15, padding: "5px 12px", margin: "0 15px"}}
                                variant={"contained"}
                                color={"secondary"}
                                onClick={() => setOpenModal(false)}
                            >
                                {t("Cancel")}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </ModalCore>
        </>
    )
}

export default StoreProject
