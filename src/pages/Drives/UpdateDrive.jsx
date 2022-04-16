import * as React from "react";
import {Box, Button, Grid, InputLabel, Typography} from "@mui/material";
import Select from "react-select";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {CustomInput, CustomText} from "components";
import CoreBTN from "core/CoreBTN";
import {ModalCore} from "core";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateDrive} from "redux/features/drive/updateDrive";
import {useDocumentRequirement} from "Hook";
import {getDriveList} from "redux/features/drive/getDriveList";
import {myDriveList} from "../../redux/features/drive/MyDrives";

const UpdateDrive = ({openModal, setOpenModal, id, data, mine = false}) => {
    const [select, setSelected] = React.useState([]);
    const [submit, setSubmit] = React.useState(false);
    const [state, setState] = React.useState([]);
    const {isSuccess, loading} = useSelector((state) => state.updateDrive);
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const requireData = useDocumentRequirement({
        categoriesStatus: false,
        tagsSStatus: false,
        usersStatus: true,
        teamsSStatus: true,
        projectsSStatus: false,
        tasksSStatus: false,
        drivesSStatus: false,
    });

    useEffect(() => {
        if (isSuccess && submit) {
            setOpenModal(false);
        }
    }, [isSuccess, submit]);

    const {
        register, handleSubmit, formState: {errors}, setValue,
    } = useForm();

    useEffect(() => {
        setState([]);
        if (data?.visibility_type === "members") {
            const ids = [];
            data?.users?.map((item) => {
                return ids.push({
                    value: item.id, label: item.first_name + " " + item.last_name,
                });
            });
            setState(ids);
        } else if (data?.visibility_type === "teams") {
            const ids = [];
            data?.teams?.map((item) => {
                return ids.push({
                    label: item.title, value: item.id,
                });
            });
            setState(ids);
        }
    }, [select, data]);

    useEffect(() => {
        setSelected({
            label: data?.visibility, value: data?.visibility_type,
        });
    }, [data]);

    const handleStoreDrive = (req) => {
        let ids = [];
        if (select?.value === "members" || select?.value === "teams") {
            state?.map((item) => {
                return ids.push(item.value);
            });
        }

        dispatch(updateDrive({
            id: id, data: {
                title: req?.title,
                description: req?.description,
                visibility: select?.value,
                users: select?.value === "members" ? ids : [],
                teams: select?.value === "teams" ? ids : [],
            },
        })).then((res) => {
            setSubmit(true);
            if (mine){
                dispatch(myDriveList());
            }else{
                dispatch(getDriveList({}));
            }
        });
        setSubmit(false);
    };

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    const setData = (id) => {
        const newState = [...state, id];
        setState(newState);
    };

    useEffect(() => {
        setValue("title", data?.title);
        setValue("id", data?.unique);
        setValue("description", data?.description);
    }, [data]);

    return (<ModalCore
        title={t("Edit")}
        open={openModal}
        setOpen={setOpenModal}
        size={"1000px"}
    >
        <form onSubmit={handleSubmit(handleStoreDrive)}>
            <Grid container spacing={4} alignItems={"center"}>
                <Grid item xs={12} md={6}>
                    <CustomInput
                        errors={errors}
                        register={register}
                        title={t("Title")}
                        field="title"
                        placeholder={t("Please_Enter_Your_Drive_Title")}
                        required={true}
                    />
                    <CustomText
                        maxRow={5}
                        errors={errors}
                        register={register}
                        title={t("Description")}
                        field="description"
                        type="text"
                        required={true}
                    />

                    <InputLabel sx={{mb: 1}} id="demo-multiple-name-label">
                        {t("visibility")}
                    </InputLabel>
                    <Select
                        className="React_select"
                        value={select}
                        defaultValue={data?.visibility}
                        onChange={setSelected}
                        options={requireData?.visibility}
                        placeholder={t("Select")}
                    />
                    {select?.value === "members" && (<>
                        <InputLabel id="demo-multiple-name-label">
                            {t("members")}
                        </InputLabel>
                        <Select
                            className="React_select"
                            value={state}
                            isMulti
                            onChange={setState}
                            options={requireData?.users}
                            placeholder={t("Select")}
                        />
                    </>)}
                    {select?.value === "teams" && (<>
                        <InputLabel id="demo-multiple-name-label">
                            {t("teams")}
                        </InputLabel>
                        <Select
                            className="React_select"
                            value={state}
                            isMulti
                            onChange={setState}
                            options={requireData?.teams}
                            placeholder={t("Select")}
                        />
                    </>)}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100px",
                            height: "100px",
                            margin: "0 auto",
                        }}
                    >
                        <img
                            width={"100%"}
                            height={"100%"}
                            style={{objectFit: "contain"}}
                            src={"/assets/images/" + data.type + ".png"}
                            alt="drive"
                        />
                    </Box>
                    <Typography align={"center"}>{data.unique}</Typography>
                </Grid>
            </Grid>
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                mt={4}
            >
                <CoreBTN
                    sx={{borderRadius: 15, padding: "5px 12px", width: "100%"}}
                    variant={"contained"}
                    color={"primary"}
                    title={t("Confirmation")}
                    type={"submit"}
                    loading={loading}
                />
                <Button
                    sx={{borderRadius: 15, padding: "5px 12px", margin: "0 15px"}}
                    variant={"contained"}
                    color={"secondary"}
                    fullWidth
                    onClick={() => setOpenModal(false)}
                >
                    {t("Cancel")}
                </Button>
            </Box>
        </form>
    </ModalCore>);
};

export default UpdateDrive;
