import React, {useEffect} from "react";
import {
    Box, Button, useTheme, useMediaQuery, InputLabel, Grid,
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {createDrive} from "redux/features/drive/craeteDrive"
import {CustomInput, CustomText} from "components";
import CoreBTN from "core/CoreBTN";
import {ModalCore} from "core";
import {Dropzone, FileItem} from "@dropzone-ui/react";
import _ from "lodash"
import {CloudUpload} from '@mui/icons-material';
import {getDriveList} from "redux/features/drive/getDriveList";
import {useDocumentRequirement} from "Hook";
import Select from "react-select";

const DriveAddFile = ({openModal, setOpenModal}) => {

    const [files, setFiles] = React.useState([]);
    const [select, setSelected] = React.useState([]);
    const [state, setState] = React.useState([]);
    const [submit, setSubmit] = React.useState(false);
    const {isSuccess, loading} = useSelector((state) => state.createDriveFile);

    const requireData = useDocumentRequirement({
        categoriesStatus: false,
        tagsSStatus: false,
        usersStatus: true,
        teamsSStatus: true,
        projectsSStatus: false,
        tasksSStatus: false,
        drivesSStatus: false,
    })

    const theme = useTheme();
    const {t} = useTranslation();
    const dir = t("direction") === "rtl" ? "rtl" : "ltr";
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const dispatch = useDispatch()

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    const {
        register, handleSubmit, formState: {errors},
    } = useForm();

    useEffect(() => {
        if (isSuccess && submit) {
            setOpenModal(false)
        }
    }, [submit, isSuccess])


    const updateFiles = (incomingFiles) => {
        const newFiles = _.last(incomingFiles)
        setFiles([newFiles]);
    };

    const handleStoreDrive = (req) => {
        let formData = new FormData();
        if (files !== null) {
            formData.append("file", files[0]?.file);
        }
        if (select?.value === 'members') {
            state?.map((item) => {
                formData.append("users[]", item?.value);
            })
        }
        if (select?.value === 'teams') {
            state?.map((item) => {
                formData.append("teams[]", item?.value);
            })
        }
        formData.append("title", req.title);
        formData.append("description", req.description);
        formData.append("visibility", select?.value);

        dispatch(createDrive(formData))
            .then(res => {
                setSubmit(true)
                dispatch(getDriveList({}))
            })
        setSubmit(false)
    };

    const setData = (id) => {
        const newState = [...state, id]
        setState(newState)
    }
    return (<ModalCore
        title={t("Add_Files_To_Drives")}
        open={openModal}
        setOpen={setOpenModal}
        size={'1000px'}
    >
        <form onSubmit={handleSubmit(handleStoreDrive)}>
            <Grid
                container
                spacing={4}
                alignItems={'center'}
            >
                <Grid item xs={12} md={6}>
                    <CustomInput
                        errors={errors}
                        register={register}
                        title={t('Title')}
                        field='title'
                        placeholder={t("Please_Enter_Your_Drive_Title")}
                        required={true}
                    />
                    <InputLabel sx={{mb: 1}} id="demo-multiple-name-label">
                        {t("visibility")}
                    </InputLabel>
                    <Select
                        className="React_select"
                        value={select}
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
                    <CustomText
                        maxRow={5}
                        errors={errors}
                        register={register}
                        title={t('Description')}
                        field='description'
                        type='text'
                        required={true}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Dropzone
                        footer={false}
                        header={false}
                        label={<CloudUpload sx={{
                            fontSize: '100px'
                        }}/>}
                        onChange={updateFiles}
                        value={files}>
                        {files.map((file) => (<FileItem {...file} preview/>))}
                    </Dropzone>
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
}

export default DriveAddFile;
