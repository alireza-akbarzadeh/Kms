import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import documentRequirement from "Hook/useDocumentRequirement";
import {Box, Container, Grid, Stack, Typography} from "@mui/material";
import {CustomInput} from "components";
import Select from "react-select";
import {Alert} from "@mui/lab";
import {CheckRole} from "helper";

const KnowledgeForm = ({errors, register, docData, setDocData}) => {

    let adminsData = [];
    const {t} = useTranslation()
    const requiredData = documentRequirement({});

    useEffect(() => {
        if (requiredData?.users?.length > 0) {
            requiredData?.users?.map((item) => {
                if (CheckRole({roles: item?.type, page: 'admin', part: 'check'})) {
                    adminsData.push(item)
                }
            })
        }
    }, [requiredData])

    return (<Container maxWidth={'xl'}>

        <Alert severity="success">{t('knowledgeDocAlert')}</Alert>

        <Grid container gap={2}>
            <Grid item xs={12} md={6}>
                <CustomInput
                    errors={errors}
                    register={register}
                    title={t('Title')}
                    field={'docTitle'}
                    required={true}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Box>
                    <Typography mb={1}>
                        {t("advanced") + ' * '}
                    </Typography>
                    <Select
                        className="React_select"
                        value={docData.admin}
                        onChange={(e) => setDocData({...docData, admin: e})}
                        options={adminsData}
                        placeholder={t("Select")}
                    />
                </Box>
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
                            value={docData.categories}
                            onChange={(e) => setDocData({...docData, categories: e})}
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
                            value={docData.tags}
                            onChange={(e) => setDocData({...docData, tags: e})}
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
                            value={docData.visibility}
                            onChange={(e) => setDocData({...docData, visibility: e})}
                            options={requiredData.visibility}
                            placeholder={t("Select")}
                        />
                        {docData.visibility?.value === 'members' && (<Box mt={2}>
                            <Select
                                isMulti
                                className="React_select"
                                value={docData.users}
                                onChange={(e) => setDocData({...docData, users: e})}
                                options={requiredData.users}
                                placeholder={t("Users")}
                            />
                        </Box>)}
                        {docData.visibility?.value === 'teams' && (<Box mt={2}>
                            <Select
                                isMulti
                                className="React_select"
                                value={docData.teams}
                                onChange={(e) => setDocData({...docData, teams: e})}
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
                            value={docData.tasks}
                            onChange={(e) => setDocData({...docData, tasks: e})}
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
                            value={docData.drives}
                            onChange={(e) => setDocData({...docData, drives: e})}
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
                            value={docData.projects}
                            onChange={(e) => setDocData({...docData, projects: e})}
                            options={requiredData.projects}
                            placeholder={t("Select")}
                        />
                    </Box>
                </Stack>
            </Grid>
        </Grid>
    </Container>);
}

export default KnowledgeForm