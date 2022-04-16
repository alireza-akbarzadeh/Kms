import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import {Button, Chip, Container, Divider, Paper} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {showProject} from "redux/features/project/showPorjectSlice";
import {useParams} from "react-router-dom";
import {FirstLoadingCore, LoadingCore} from "core";
import BadgeAvatars from "components/avatar";
import {Edit} from "@mui/icons-material";
import UpdateProject from "./UpdateProject";
import ShowTeam from "./Teams/Teams/ShowTeam";
import ShowResourcesList from "./resources/ShowResourcesList";
import DateResources from "./resources/DateResources";
import GetCategoryLIst from "./task/category/GetCategoryLIst";
import {log} from "@craco/craco/lib/logger";
import {useEffect, useRef} from "react";
import {AppContext} from "../../context/AppContext";
import {CheckRole} from "../../helper";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const ShowProject = () => {
    const [value, setValue] = React.useState(0);
    const [openModal, setOpenModal] = React.useState(false);
    const [openDateModal, setDateOpenModal] = React.useState(false);
    const {t} = useTranslation();
    const ref = useRef(false)
    const {data, loading} = useSelector((state) => state.showPorject);
    const {data: user} = useSelector((state) => state.user);
    const {setProjectTaskPage} = React.useContext(AppContext);
    const handleOpenModal = () => setOpenModal(!openModal);

    const dispatch = useDispatch();
    const {id} = useParams();
    React.useEffect(() => {
        dispatch(showProject(id));
    }, [dispatch, id]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 2) {
            return setDateOpenModal(true)
        } else {
            return setDateOpenModal(false)
        }
    };

    useEffect(() => {
        if (value === 0){
            setProjectTaskPage(id)
        }else{
            setProjectTaskPage(false)
        }
    }, [value])


    useEffect(() => {
        if (data?.id !== undefined){
            ref.current = true;
        }
    }, [ref, data])
   return (!ref.current && data?.id === undefined) ? <FirstLoadingCore loading={loading}/> : (
        <>
            {loading && <LoadingCore loading={loading}/>}
            <Box
                sx={{
                    backgroundImage: `url(${data?.header})`,
                    height: 250,
                    width: "100%",
                    backgroundPosition: "top center",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        background: "rgba(0,0,0,0.2)",
                        width: "100%",
                        height: "100%",
                        right: 0,
                        top: 0,
                        position: "absolute",
                        zIndex: 1,
                    }}
                />
                <Container maxWidth={"xl"}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            zIndex: 3,
                            position: "relative",
                        }}
                    >
                        <Paper
                            sx={{padding: 3, margin: "35px 0", width: 350, height: 200, overflowY: "scroll"}}
                            elevation={4}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{display: "inline-flex", gap: 2, alignItems: "center"}}
                                >
                                    <BadgeAvatars address={data?.avatar} size="sm"/>
                                    <Typography>{data?.title}</Typography>
                                </Box>
                                <Box>
                                    <Chip
                                        label={data?.active ? t("Active") : "DeActive"}
                                        sx={
                                            data?.active
                                                ? {background: "#1ce087", color: "#fff", padding: 1}
                                                : {background: "#ce1440", color: "#fff", padding: 1}
                                        }
                                    />
                                </Box>
                            </Box>
                            <Divider sx={{margin: "25px 0"}}/>
                            <Typography
                                fontSize={15}
                                fontWeight={600}
                                component={"p"}
                                marginTop={2}
                                align="justify"
                            >
                                {data?.description}
                            </Typography>
                        </Paper>
                        {CheckRole({roles: user?.data?.type, page: 'projects', part: 'update'}) && (
                            <Button onClick={handleOpenModal} variant="contained">
                                <Edit fontSize="16px" sx={{margin: "0 3px"}}/>
                                {t("Edit")}
                            </Button>
                        )}
                    </Box>
                </Container>
            </Box>
            <Divider/>
            <Box sx={{width: "100%"}}>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <Tabs value={value}>
                        <Box
                            sx={{width: "50%", alignItems: "center", textAlign: "center"}}
                        >
                            <Tab
                                label={t("Tasks")}
                                {...a11yProps(0)}
                                onClick={(event) => handleChange(event, 0)}
                            />
                        </Box>
                        <Box
                            sx={{width: "50%", alignItems: "center", textAlign: "center"}}
                        >
                            <Tab
                                label={t("Team")}
                                {...a11yProps(1)}
                                onClick={(event) => handleChange(event, 1)}
                            />
                        </Box>
                        <Box
                            sx={{width: "50%", alignItems: "center", textAlign: "center"}}
                        >
                            <Tab
                                label={t("Timing")}
                                {...a11yProps(2)}
                                onClick={(event) => handleChange(event, 2)}
                            />
                        </Box>
                        <Box
                            sx={{width: "50%", alignItems: "center", textAlign: "center"}}
                        >
                            <Tab
                                label={t("Source")}
                                {...a11yProps(3)}
                                onClick={(event) => handleChange(event, 3)}
                            />
                        </Box>
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <GetCategoryLIst id={id} users={data?.team?.users}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ShowTeam teamData={data?.team} id={id} showHeader={false}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {openDateModal &&
                        <DateResources data={data} setOpenModal={setDateOpenModal} openModal={openDateModal}/>}
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <ShowResourcesList id={id}/>
                </TabPanel>
            </Box>
            <UpdateProject data={data} openModal={openModal} setOpenModal={setOpenModal} projectId={id}/>
        </>
    );
};

export default ShowProject;
