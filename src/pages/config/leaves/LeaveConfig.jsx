import * as React from "react";
import * as _ from "lodash";
import {
  DateRange,
  Edit,
  ShieldOutlined,
  CloseSharp,
  CalendarTodayOutlined,
  Add,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import LoadingCore from "core/LoadingCore";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { gteConfigLeaveList } from "redux/features/customer-cnfig/configLeaveList";
import UpdateLeaveConfig from "./updateLeaveConfig";
import { updateConfigLeave } from "redux/features/customer-cnfig/updateConfigLeave";
import { Item } from "core";
import UpdateLeaveData from "./updateLeaveData";

const LeaveConfig = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [dateNumber, setDateNumber] = React.useState("false");
  const [weekData, setWeekData] = React.useState([]);
  const { data, loading } = useSelector((state) => state.configLeaveList);

  let dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(gteConfigLeaveList());
  }, [dispatch]);

  React.useEffect(() => {
    setWeekData(createData(data?.work_time));
  }, [data]);

  const updateData = async (data) => {
    const newStateData = createData(data);
    await setWeekData(newStateData);
  };

  const createData = (data) => {
    const firstKey = _.get(_.keys(data), 0);
    let dates = [];
    for (let i in data) {
      let key = i;
      if (firstKey !== "1") {
        key = (parseInt(i) + 1).toString();
      }
      if (data[i] === null) {
        dates.push({
          arrival: null,
          out: null,
          weekNumber: key,
        });
      } else {
        dates.push({
          ...data[i],
          weekNumber: key,
        });
      }
    }
    return dates;
  };

  const handleUpdateCaldnder = (key) => {
    setDateNumber(key);
    setOpenModal(true);
  };
  const handleremoveCaldnder = (key) => {
    setDateNumber(key);
    const newData = _.cloneDeep(weekData);
    const index = newData.findIndex((item) => item?.weekNumber === key);
    const indexData = {
      arrival: null,
      out: null,
      weekNumber: key,
    };
    _.merge(newData[index], indexData);
    let request = {
      work_time: {},
    };
    request.work_time[key] = indexData;
    dispatch(updateConfigLeave(request));
    setWeekData(newData);
  };

  return (
    <>
      {loading && <LoadingCore loading={loading} />}
      <Container sx={{ marginTop: 7 }} maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                letterSpacing: "1.3px",
              }}
            >
              <Typography sx={{ color: "#8005d8" }}>
                <DateRange sx={{ margin: "0 5px" }} />
              </Typography>
              {data?.sick}
              {t("Day_Leaves_sicknes_in_monht")}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                letterSpacing: "1.3px",
              }}
            >
              <Typography sx={{ color: "#8005d8" }}>
                <ShieldOutlined sx={{ margin: "0 5px" }} />
              </Typography>
              {data?.earned}
              {t("Day_Leaves_earnded_in_monht")}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                letterSpacing: "1.3px",
              }}
            >
              <Typography sx={{ color: "#8005d8" }}>
                <CalendarTodayOutlined sx={{ margin: "0 5px" }} />
              </Typography>
              {data?.start_month}
              {t("Startـtheـbusinesـdayـon")}
            </Box>
          </Box>
          <Box>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={() => setOpenEditModal(true)}
            >
              <Edit />
              {t("Edit")}
            </Button>
          </Box>
        </Box>
        <Paper sx={{ marginTop: 3, padding: 2 }} elevation={1}>
          <Typography align="center" sx={{ color: "#322740" }}>
            {t("Work_Week_time")}
          </Typography>
          <Grid marginTop={3} container spacing={2}>
            {weekData?.map((date, key) => (
              <Grid key={key} item xs={12} md={6}>
                <Item>
                  <Chip
                    label={
                      date?.weekNumber === "1"
                        ? t("Saturday")
                        : date?.weekNumber === "2"
                        ? t("Sunday")
                        : date?.weekNumber === "3"
                        ? t("Monday")
                        : date?.weekNumber === "4"
                        ? t("Tuesday")
                        : date?.weekNumber === "5"
                        ? t("Wednesday")
                        : date?.weekNumber === "6"
                        ? t("Thursday")
                        : date?.weekNumber === "7"
                        ? t("Fraiday")
                        : null
                    }
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>
                      {(date?.arrival !== null || date?.out !== null) && " از "}
                      {date?.arrival}
                    </Typography>
                    <Typography sx={{ margin: "0 5px" }}>
                      {(date?.arrival !== null || date?.out !== null) &&
                        " الی "}{" "}
                      {date?.out}
                    </Typography>
                    {(date?.arrival === null || date?.out === null) && (
                      <Chip
                        label="روز غیرکاری"
                        color="error"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <Box>
                    <Button
                      onClick={() => handleUpdateCaldnder(date?.weekNumber)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      onClick={() => handleremoveCaldnder(date?.weekNumber)}
                    >
                      <CloseSharp />
                    </Button>
                  </Box>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
      {openModal && (
        <UpdateLeaveConfig
          DateNumber={dateNumber}
          openModal={openModal}
          setOpenModal={setOpenModal}
          mainData={weekData}
          updateList={updateData}
        />
      )}
      {openEditModal && (
        <UpdateLeaveData
          openModal={openEditModal}
          setOpenModal={setOpenEditModal}
          data={{
            sick: data?.sick,
            earned: data?.earned,
            startMonth: data?.start_month,
          }}
        />
      )}
    </>
  );
};
export default LeaveConfig;
