import React, {useEffect, useState} from "react";
import {Box, Button, Container, Fab, Grid, Paper, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {CustomInput, CustomText, Editor} from "components";
import {useDispatch, useSelector} from "react-redux";
import documentRequirement from "Hook/useDocumentRequirement";
import Select from "react-select";
import CoreBTN from "core/CoreBTN";
import {useHistory, useLocation} from "react-router-dom";
import {storeArticle} from "redux/features/document/article/storeArticleSlice";
import {MarkDownEditor} from "components"

const StoreArticle = ({categoryId = null, fromTask = false, setShowForm}) => {
    const [categories, setCategories] = useState(null)
    const [tags, setTags] = useState(null)
    const [projects, setProjects] = useState(null)
    const [tasks, setTasks] = useState(null)
    const [drives, setDrives] = useState(null)
    const [users, setUsers] = useState(null)
    const [teams, setTeams] = useState(null)
    const [visibility, setVisibility] = useState(null)
    const [edit, setEdit] = useState({value: null});
    const [submit, setSubmit] = useState(false);
    const [disable, setDisable] = useState(true);
    const [chooseEditor, setChooseEditor] = useState(0);
    const [value, setValue] = React.useState("");
    const {data: response} = useSelector((state) => state.storeArticleSlice);


    const {t} = useTranslation()
    const history = useHistory()
    const dispatch = useDispatch()
    const requiredData = documentRequirement({});
    const location = useLocation();

    useEffect(() => {
        setCategories({
            label: location?.state?.category?.title, value: location?.state?.category?.id
        })
    }, [])

    useEffect(() => {
        if (categories === null || visibility === null || (visibility?.value === 'members' && (users?.length === 0 || users?.length === undefined)) || (visibility?.value === 'teams' && (teams?.length === 0 || teams?.length === undefined))) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [categories, visibility, users, teams])

    useEffect(() => {
        if (submit && response?.data?.id !== undefined) {
            history.push(`/document/article/${response?.data?.id}`)
        }
    }, [response, submit])

    const {
        register, handleSubmit, formState: {errors},
    } = useForm();
    const onSubmit = (data) => {
        const totalData = {
            category_id: categories?.value,
            type: "article",
            body_type: chooseEditor === 0 ? "html" : "markdown",
            visibility: visibility?.value,
            title: data?.title,
            description: data?.description,
            body: chooseEditor === 0 ? edit : value,
            value: 'value',
            users: users?.map((item) => {
                return item.value
            }) ?? [],
            tags: tags?.map((item) => {
                return item.value
            }) ?? [],
            teams: teams?.map((item) => {
                return item.value
            }) ?? [],
            projects: projects?.map((item) => {
                return item.value
            }) ?? [],
            tasks: tasks?.map((item) => {
                return item.value
            }) ?? [],
            drives: drives?.map((item) => {
                return item.value
            }) ?? [],
        }
        dispatch(storeArticle(totalData)).then(res => setSubmit(true))
        setSubmit(false)
    }


    return (
        <Container sx={{margin: "20px auto", padding: "17px 15px"}} maxWidth={'xl'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container gap={2}>
                    <Grid item xs={12} md={4}>
                        <CustomInput
                            errors={errors}
                            register={register}
                            title={t('Title')}
                            field={'title'}
                            required={true}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                        <Stack direction={'column'} gap={4} mt={5}>
                            <Box>
                                <Typography mb={1}>
                                    {t("DocCategory") + ' * '}
                                </Typography>
                                <Select
                                    className="React_select"
                                    value={categories}
                                    onChange={setCategories}
                                    options={requiredData.categories}
                                    placeholder={t("Select")}
                                />
                            </Box>
                            <Box>
                                <Typography mb={1}>
                                    {t("DocTags")}
                                </Typography>
                                <Select
                                    className="React_select"
                                    isMulti
                                    value={tags}
                                    onChange={setTags}
                                    options={requiredData.tags}
                                    placeholder={t("Select")}
                                />
                            </Box>
                            <Box>
                                <Typography mb={1}>
                                    {t("visibility") + ' * '}
                                </Typography>
                                <Select
                                    className="React_select"
                                    value={visibility}
                                    onChange={setVisibility}
                                    options={requiredData.visibility}
                                    placeholder={t("Select")}
                                />
                                {visibility?.value === 'members' && (<Box mt={2}>
                                    <Select
                                        isMulti
                                        className="React_select"
                                        value={users}
                                        onChange={setUsers}
                                        options={requiredData.users}
                                        placeholder={t("Users")}
                                    />
                                </Box>)}
                                {visibility?.value === 'teams' && (<Box mt={2}>
                                    <Select
                                        isMulti
                                        className="React_select"
                                        value={teams}
                                        onChange={setTeams}
                                        options={requiredData.teams}
                                        placeholder={t("Teams")}
                                    />
                                </Box>)}
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack direction={'column'} gap={4} mt={5}>
                            <Box>
                                <Typography mb={1}>
                                    {t("DocTasks")}
                                </Typography>
                                <Select
                                    className="React_select"
                                    isMulti
                                    value={tasks}
                                    onChange={setTasks}
                                    options={requiredData.tasks}
                                    placeholder={t("Select")}
                                />
                            </Box>
                            <Box>
                                <Typography mb={1}>
                                    {t("DocDrives")}
                                </Typography>
                                <Select
                                    className="React_select"
                                    isMulti
                                    value={drives}
                                    onChange={setDrives}
                                    options={requiredData.drives}
                                    placeholder={t("Select")}
                                />
                            </Box>
                            <Box>
                                <Typography mb={1}>
                                    {t("DocProjects")}
                                </Typography>
                                <Select
                                    className="React_select"
                                    isMulti
                                    value={projects}
                                    onChange={setProjects}
                                    options={requiredData.projects}
                                    placeholder={t("Select")}
                                />
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <CustomText
                            errors={errors}
                            register={register}
                            title={t('Description')}
                            field={'description'}
                            required={true}
                        />
                    </Grid>
                </Grid>
                <Box sx={{display: "inline-flex", gap: 1, my: 3}}>
                    <Button onClick={() => setChooseEditor(0)} variant={chooseEditor === 0 ? "contained" : "outlined"}>
                        TextEditor
                    </Button>
                    <Button onClick={() => setChooseEditor(1)} variant={chooseEditor === 1 ? "contained" : "outlined"}>
                        MarkdownEditor
                    </Button>
                </Box>
                <Box mt={2}>
                    {chooseEditor === 0 ? (<Editor edit={edit} setEdit={setEdit}/>) : (
                        <MarkDownEditor value={value} setValue={setValue}/>)}
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    alignItems={"end"}
                    mt={4}
                >
                    <Box sx={{maxWidth: 300, width: "100%"}}>
                        <CoreBTN
                            sx={{borderRadius: 15, padding: "5px 12px", width: "100%"}}
                            variant={"contained"}
                            color={"primary"}
                            title={t("Confirmation")}
                            type={"submit"}
                            disabled={disable}
                        />
                    </Box>
                    <Box sx={{maxWidth: 300, width: "100%"}}>
                        <Button
                            sx={{borderRadius: 15, padding: "5px 12px", margin: "0 15px"}}
                            variant={"contained"}
                            color={"secondary"}
                            fullWidth
                            onClick={() => history.push('/document')}
                        >
                            {t("Back")}
                        </Button>
                    </Box>
                </Box>
            </form>
        </Container>
    );
}

export default StoreArticle