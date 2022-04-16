import React, {useContext} from "react";
import VacationUsers from "./VacationUsers/VacationUsers";
import {Container, Grid, Box, Tabs, Tab, Paper} from "@mui/material";
import {AppContext} from "context/AppContext";
import {useTranslation} from "react-i18next";
import HrStudyTime from "./HrStudyTime/HrStudyTime";
import RequsetWorkingOurs from "./RequsetWorkingOurs/RequsetWorkingOurs";
import VcationUserList from "./VcationUserList";

const Vacation = () => {
    const {openTab} = useContext(AppContext);
    const {t} = useTranslation();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{marginTop: 3}}>
            <Container maxWidth={"2xl"}>
                <Grid justifyContent={"flex-end"} container>
                    <Grid xs={12} sm={9}>
                        <Paper elevation={3} sx={{margin: "10px 0"}}>
                            <Tabs value={value} onChange={handleChange}>
                                <Tab label={t("VacationList")}/>
                                <Tab label={t("ArrivalList")}/>
                                <Tab label={t("StudyList")}/>
                            </Tabs>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {openTab && (
                        <Grid item xs={12} lg={3}>
                            <VcationUserList/>
                        </Grid>
                    )}
                    <Grid item xs={12} lg={openTab ? 9 : 12}>
                        {value === 0 && <VacationUsers/>}
                        {value === 1 && <RequsetWorkingOurs/>}
                        {value === 2 && <HrStudyTime/>}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
export default Vacation;
