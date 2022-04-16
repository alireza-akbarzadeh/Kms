import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import _ from "lodash";
import {
    Button,
    Container,
    Divider,
    Grid,
    Stack, Switch,
    TextField, Typography,
} from "@mui/material";
import {CustomInput, CustomText} from "components";
import Box from "@mui/material/Box";
import CoreBTN from "core/CoreBTN";
import Select from "react-select";
import DatePicker, {
    Calendar,
} from "@amir04lm26/react-modern-calendar-date-picker";
import {LocalizationProvider, StaticTimePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import CheckBox from "components/CheckBox";
import {Add, DeleteForever, OpenInNew} from "@mui/icons-material";
import moment from "jalali-moment";
import {StoreTask} from "redux/features/project/task/StoreTask";
import {showProjectTasks} from "redux/features/project/task/category/ShowProjectTaskSlice";
import {UpdateTask} from "redux/features/project/task/UpdateTask";
import {CheckRole} from "../../../../helper";
import KnowledgeForm from "./KnowledgeForm";
import knowledgeForm from "./KnowledgeForm";
import {useHistory} from "react-router-dom";

const StoreTasks = ({data, users, setShowForm}) => {
    const [checked, setChecked] = React.useState(false);
    const [isKnowledge, setIsKnowledge] = useState(false);
    const [disable, setDisable] = useState(true);
    const [lastInputCheckBox, setLastInputCheckBox] = useState("");
    const [selectedDay, setSelectedDay] = React.useState(null);
    const [removedDetail, setRemovedDetail] = React.useState(null);
    const [timeValue, setTimeValue] = React.useState(null);
    const [checkBox, setCheckBox] = React.useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [docData, setDocData] = useState({
        admin: null,
        categories: null,
        tags: null,
        projects: null,
        tasks: null,
        drives: null,
        users: null,
        teams: null,
        visibility: null,
    })
    const {data: user} = useSelector((state) => state.user)
    const {t} = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const dir = t("direction") === "rtl";

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        if (!CheckRole({
            roles: user?.data?.type,
            page: 'projects',
            part: 'update'
        })) {
            setDisable(true);
        } else {
            if (
                selectedUsers.length > 0 &&
                selectedDay !== null &&
                timeValue !== null
            ) {
                setDisable(false);
            } else {
                setDisable(true);
            }
            if (checked) {
                if (docData.visibility === null || docData.categories === null || docData.admin === null) {
                    setDisable(true)
                }
                if (docData.visibility?.value === 'members' && docData.users === null) {
                    setDisable(true)
                }
                if (docData.visibility?.value === 'teams' && docData.teams === null) {
                    setDisable(true)
                }
            }
        }
    }, [selectedUsers, selectedDay, timeValue, docData, checked]);

    useEffect(() => {
        if (data.type === "update") {
            setValue("title", data.body.title);
            setValue("description", data.body.description);
            const date = data.body.estimated_date.split("/");
            if (date[0] !== undefined) {
                setSelectedDay({
                    year: parseInt(date[0]),
                    month: parseInt(date[1]),
                    day: parseInt(date[2]),
                });
            }
            let newUsers = [];
            data.body.users.map((item) => {
                if (selectedUsers.findIndex((user) => user.value === item.id) === -1) {
                    newUsers.push({
                        label: item.first_name + " " + item.last_name,
                        value: item.id,
                    });
                }
            });
            setSelectedUsers(newUsers);
            setTimeValue(createDateFromTextValue(data.body.estimated_time));
            const newCheckbox = [];
            data.body.detail?.map((item) => {
                newCheckbox.push({
                    id: item?.id,
                    label: item?.title,
                    isChecked: item?.done,
                    exists: true,
                });
            });
            setCheckBox(newCheckbox);
        }
    }, [data]);

    const createDateFromTextValue = (value) => {
        const splitParts = value.split(":");
        return new Date(1970, 1, 1, splitParts[0], splitParts[1]);
    };

    const {isSuccess, loading} = useSelector((state) => state.StoreTaskSlice);

    const userData = users?.map((item) => {
        return {
            label: item.first_name + " " + item.last_name,
            value: item.user_id,
        };
    });

    const removeCheckBox = (id) => {
        let newRemoveState = null;
        let newData = _.remove(_.cloneDeep(checkBox), function (x) {
            if (x.id === id) {
                newRemoveState = x;
            }
            return x.id !== id;
        });
        setCheckBox(newData);

        if (removedDetail === null) {
            setRemovedDetail([newRemoveState]);
        } else {
            let cloneRemoved = [...removedDetail, newRemoveState];
            setRemovedDetail(cloneRemoved);
        }
    };

    const handleCheckBox = (id, value) => {
        let newData = _.cloneDeep(checkBox);
        const index = newData.findIndex((item) => item.id === id);
        newData[index].isChecked = value;
        setCheckBox(newData);
    };

    const addCheckBox = () => {
        if (lastInputCheckBox !== "" || null) {
            let newData = _.cloneDeep(checkBox);
            newData.push({
                id: _.last(checkBox)?.id === undefined ? 1 : _.last(checkBox)?.id + 1,
                label: lastInputCheckBox,
                isChecked: false,
                exists: false,
            });

            setLastInputCheckBox("");
            setCheckBox(newData);
        }
    };

    const back = () => {
        setSelectedDay(null);
        setTimeValue(null);
        setSelectedUsers([]);
        setShowForm(false);
    };

    const onSubmit = (req) => {

        req.users = selectedUsers?.map((user) => {
            return user.value;
        });
        req.detail = checkBox?.map((detail) => {
            if (detail.exists) {
                return {
                    title: detail?.label,
                    done: detail?.isChecked,
                    id: detail?.id,
                };
            } else {
                return {
                    title: detail?.label,
                    done: detail?.isChecked,
                };
            }
        });

        if (removedDetail !== null) {
            req.deletedDetail = removedDetail;
        }
        req.estimated_date =
            selectedDay["year"] +
            "/" +
            selectedDay["month"] +
            "/" +
            selectedDay["day"];
        req.estimated_time = moment(timeValue).format("HH:mm:ss");
        req.is_knowledge = isKnowledge;
        req.document = {};

        if (data.type === "store") {
            if (checked) {
                req.is_knowledge = true;
                req.document.title = req.docTitle
                req.document.category = docData?.categories?.value
                req.document.visibility = docData?.visibility?.value
                req.document.admin = docData?.admin?.value
                req.document.users = docData?.users?.map((item) => {
                    return item.value;
                });
                req.document.teams = docData?.teams?.map((item) => {
                    return item.value;
                });
                req.document.drives = docData?.drives?.map((item) => {
                    return item.value;
                });
                req.document.tasks = docData?.tasks?.map((item) => {
                    return item.value;
                });
                req.document.projects = docData?.projects?.map((item) => {
                    return item.value;
                });
                req.document.tags = docData?.tags?.map((item) => {
                    return item.value;
                });
            }
            req.task_category_id = data.id;
            dispatch(StoreTask(req)).then((res) => {
                dispatch(showProjectTasks({id: data.projectId, archive: 0}));
                back();
            });
        } else {
            dispatch(UpdateTask({id: data.id, data: req})).then((res) => {
                dispatch(showProjectTasks({id: data.projectId, archive: 0}));
                back();
            });
        }
    };


    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Container maxWidth={"xl"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={5}>
                        <Box maxWidth={400}>
                            <CustomInput
                                errors={errors}
                                register={register}
                                title={t("Title")}
                                field="title"
                                required={true}
                            />
                            {t("Users")}
                            <Select
                                isMulti
                                className="React_select"
                                value={selectedUsers}
                                onChange={setSelectedUsers}
                                options={userData}
                                placeholder={t("Select")}
                            />
                        </Box>
                        <CustomText
                            errors={errors}
                            register={register}
                            title={t("Description")}
                            field="description"
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} lg={7}>
                        <Grid container spacing={7}>
                            <Grid item xs={12} md={12} lg={6}>
                                <Calendar
                                    value={selectedDay}
                                    onChange={setSelectedDay}
                                    shouldHighlightWeekends
                                    calendarClassName="custom-calendar"
                                    colorPrimary="rgba(128, 5, 216, 0.9)"
                                    colorPrimaryLight="rgba(128, 5, 216, 0.2)"
                                    calendarTodayClassName="custom-today-day"
                                    locale={"fa"}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <StaticTimePicker
                                        displayStaticWrapperAs="mobile"
                                        label={t("deadlineTime")}
                                        ampm={false}
                                        value={timeValue}
                                        onChange={(newValue) => {
                                            setTimeValue(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                sx={{
                                                    direction: "rtl",
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
                                                }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider sx={{margin: "5px 0 7px 0"}}/>

                <Box sx={{display: "flex", alignItems: "flex-end", mb: "20px"}}>
                    <Add
                        sx={{color: "#8005d8", mr: 1, my: 0.5, cursor: "pointer"}}
                        onClick={addCheckBox}
                    />
                    <TextField
                        id="input-with-sx"
                        label={t("addDetail")}
                        variant="standard"
                        color="primary"
                        value={lastInputCheckBox}
                        onChange={(e) => setLastInputCheckBox(e.target.value)}
                        sx={{
                            "&>label": {
                                right: 10,
                            },
                        }}
                    />
                </Box>
                <Grid container spacing={2}>
                    {checkBox?.map((checkItem) => (
                        <Grid item xs={12} md={4}>
                            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                                <DeleteForever
                                    sx={{color: "#8005d8", mr: 1, my: 0.5, cursor: "pointer"}}
                                    onClick={() => removeCheckBox(checkItem.id)}
                                />
                                <CheckBox
                                    label={checkItem.label}
                                    check={checkItem.isChecked}
                                    setCheck={handleCheckBox}
                                    id={checkItem.id}
                                />
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
                <Divider sx={{margin: "10px 0 10px 0"}}/>

                {data?.type === 'store' ? (
                    <Stack direction={'column'} spacing={5}>
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} gap={2}>
                            <Typography>
                                {t('knowledgeTask')}
                            </Typography>
                            <Switch
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{'aria-label': 'controlled'}}
                            />
                        </Box>
                        {checked &&
                            <KnowledgeForm errors={errors} register={register} docData={docData}
                                           setDocData={setDocData}/>}
                    </Stack>
                ): (
                    <>
                        {data?.body?.is_knowledge && (
                            <>
                                <Box
                                    sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer', justifyContent: 'center'}}
                                    onClick={() => history.push(`/document/article/${data?.body?.document_id}`)}
                                     gap={2}>
                                    <OpenInNew color={'primary'}/>
                                    <Typography color={'success'}>
                                        {t('knowledgeTaskTrue')}
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </>
                )}

                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mt={10}
                >
                    <CoreBTN
                        loading={loading}
                        sx={{borderRadius: 15, padding: "5px 12px", width: "100%"}}
                        variant={"contained"}
                        color={"primary"}
                        title={t("Confirmation")}
                        type={"submit"}
                        disabled={disable}
                    />
                    <Button
                        sx={{borderRadius: 15, padding: "5px 12px", margin: "0 15px"}}
                        variant={"contained"}
                        color={"secondary"}
                        fullWidth
                        onClick={back}
                    >
                        {t("Back")}
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default StoreTasks;
