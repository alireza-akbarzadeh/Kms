import {Box, Button, Container, Grid, Stack, Typography} from "@mui/material";
import CoreBTN from "../../../core/CoreBTN";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useHistory, useLocation} from "react-router-dom";
import {CustomInput, CustomText, Editor} from "components";
import Select from "react-select";
import documentRequirement from "Hook/useDocumentRequirement";
import {storeArticle} from "redux/features/document/article/storeArticleSlice";
import {useDispatch, useSelector} from "react-redux";
import {MarkDownEditor} from "components";

const StoreWiki = () => {
    const [disable, setDisable] = useState(true);
    const [edit, setEdit] = useState({value: null});
    const [categories, setCategories] = useState(null)
    const [submit, setSubmit] = useState(false);

    const [chooseEidtor, setChooseEidtor] = useState(0);
    const [value, setValue] = React.useState("");

    const {data: response} = useSelector((state) => state.storeArticleSlice);

    const {t} = useTranslation()
    const history = useHistory()
    const dispatch = useDispatch()
    const requiredData = documentRequirement({});
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        setCategories({
            label: location?.state?.category?.title,
            value: location?.state?.category?.id
        })
    }, [])

    useEffect(() => {
        if (categories === null) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [categories])


    useEffect(() => {
        if (submit && response?.data?.id !== undefined) {
            history.push(`/document/wiki/${response?.data?.id}`)
        }
    }, [response, submit])


    const onSubmit = (data) => {
        const totalData = {
            category_id: categories?.value,
            type: "wiki",
            value: 'value',
            body_type: chooseEidtor === 0 ? "html" : "markdown",
            visibility: 'everyone',
            title: data?.title,
            description: data?.description,
            body: chooseEidtor === 0 ? edit : value,
        }
        dispatch(storeArticle(totalData)).then(res => setSubmit(true))
        setSubmit(false)
    }

    return (<Container sx={{margin: "20px auto", padding: "17px 15px"}} maxWidth={'xl'}>
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
                    <Button onClick={() => setChooseEidtor(0)} variant={chooseEidtor === 0 ? "contained" : "outlined"}>
                        TextEditor
                    </Button>
                    <Button onClick={() => setChooseEidtor(1)} variant={chooseEidtor === 1 ? "contained" : "outlined"}>
                        MarkupEditro
                    </Button>
                </Box>
                <Box mt={2}>
                    {chooseEidtor === 0 ? (<Editor edit={edit} setEdit={setEdit}/>) : (
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
    )
}
export default StoreWiki