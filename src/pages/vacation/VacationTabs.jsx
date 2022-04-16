import React from "react";
import {Box, Grid, Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Arrow} from "core";
import {useDispatch} from "react-redux";
import {leaveRequestDetailsList} from "redux/features/mange/LeaveRequsetDetailstSlice";
import {useParams} from "react-router-dom";
import {checkLeaveReq} from "redux/features/mange/checkLeaveRequestSlice";
import {userArrivalCalender} from "redux/features/mange/userCalenderSlice";

const TabBTN = ({title, color, ...rest}) => {
    return (
        <Button
            sx={{
                background: color,
                color: "#2e3139",
                padding: 3,
                borderRadius: 14,
                "&:hover": {background: "unset", boxShadow: "unset"},
                borderColor: color,
                fontSize: 13,
                border: `1px solid ${color}`,
            }}
            fullWidth
            variant={"contained"}
            {...rest}
        >
            {title}
        </Button>
    );
};
const VacationTabs = ({tabs, setTabs}) => {
    const {t} = useTranslation();
    const [perPage, setPerPage] = React.useState(10);
    const [page, setPage] = React.useState(1);
    let {id} = useParams();
    const dispatch = useDispatch();
    const handleVacation = () => {
        dispatch(leaveRequestDetailsList({id, perPage, page}));
        setTabs(0);
    };
    const handleCheckReqTab = () => {
        dispatch(checkLeaveReq(id));
        setTabs(1);
    };
    const handleUserWork = () => {
        dispatch(userArrivalCalender(id));
        setTabs(2);
    };
    const handleHrRequsetStudyTime = () => {
        setTabs(4);
    };


    return (
        <>
            <Box sx={{margin: "45px 0"}}>
                <Grid spacing={4} alignItems={"center"} container>
                    <Grid item xs={12} sx={4} md={6} lg={3}>
                        {tabs === 0 && <Arrow color={"rgba(255, 200, 0, 0.52)"}/>}
                        <TabBTN
                            onClick={handleVacation}
                            title={t("vacation")}
                            color={"#f2d56d"}
                        />
                    </Grid>
                    <Grid item xs={12} sx={4} md={6} lg={3}>
                        {tabs === 1 && <Arrow color={"rgba(12, 234, 254, 0.24)"}/>}
                        <TabBTN
                            onClick={handleCheckReqTab}
                            title={t("Check_the_request_to_change_working_hours")}
                            color={"rgba(12, 234, 254, 0.24)"}
                        />
                    </Grid>
                    <Grid item xs={12} sx={4} md={6} lg={3}>
                        {tabs === 4 && <Arrow color={"#c0c0c0"}/>}
                        <TabBTN
                            onClick={handleHrRequsetStudyTime}
                            title={t("Request_For_Study_Time")}
                            color={"#c0c0c0"}
                        />
                    </Grid>
                    <Grid item xs={12} sx={4} md={6} lg={3}>
                        {tabs === 2 && <Arrow color={"rgba(8, 224, 135, 0.41)"}/>}
                        <TabBTN
                            onClick={handleUserWork}
                            title={t("User_work_calendar")}
                            color={"rgba(28, 224, 135, 0.41)"}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default VacationTabs;
