import React, {useEffect} from "react";
import {Breadcrumbs, Typography, Container} from "@mui/material";
import {useLocation, useParams} from "react-router-dom";

import VacationTabs from "./VacationTabs";
import {useTranslation} from "react-i18next";
import VacationDetailsList from "./VacationDetailsList/VacationDetailsList";
import VacationCeiling from "./VacationCeiling";
import CheckLeaveRequest from "./checkLeaveRequest/checkLeaveRequest";
import UserCalender from "./userCalender";
import RequestStudyTime from "./RequstStudyTIme/RequstStudyTIme"
import {Divider, Box} from "@mui/material";
import {Person} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {leaveRequestDetailsList} from "../../redux/features/mange/LeaveRequsetDetailstSlice";

const VacationDetails = () => {
    const [tabs, setTabs] = React.useState(0);
    const {t} = useTranslation();
    let dispatch = useDispatch();
    const {id} = useParams();

    const {data, loading} = useSelector((state) => state.leaveRequestDetails);


    React.useEffect(() => {
        dispatch(leaveRequestDetailsList({id: id, perPage: 10, page: 1}));
    }, [dispatch]);


    return (<>
        <Container maxWidth={"2xl"}>
            <Box sx={{display: 'flex', alignItems: 'center'}} gap={1}>
                <Person/>
                <Typography my={5} fontWeight={'bold'}>
                    {t('UserName')}
                </Typography>
                <Typography my={5} fontWeight={'bold'}>
                    :
                </Typography>
                <Typography my={5} fontWeight={'bold'}>
                    {data?.data?.data[0]?.user?.first_name + ' ' + data?.data?.data[0]?.user?.last_name}
                </Typography>
            </Box>

            <Divider/>
            <VacationTabs
                setTabs={setTabs}
                tabs={tabs}
            />
            {tabs === 0 && <VacationDetailsList data={data} loading={loading} setTabs={setTabs}/>}
            {tabs === 1 && <CheckLeaveRequest/>}
            {tabs === 2 && <UserCalender/>}
            {tabs === 4 && <RequestStudyTime/>}

        </Container>
    </>);
};

export default VacationDetails;
