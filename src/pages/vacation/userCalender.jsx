import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Calendar } from "@amir04lm26/react-modern-calendar-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { userArrivalCalender } from "redux/features/mange/userCalenderSlice";
import { useParams } from "react-router-dom";
import { LoadingCore } from "core";
import { useTheme } from "@mui/material/styles";
import { Check, Close } from "@mui/icons-material";
import CalenderModal from "./CalenderModal";

const UserCalender = () => {
  const [dataValue, setDataValue] = React.useState(null);
  const [days, setDays] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const { data, loading } = useSelector((state) => state.userArrivalCalender);

  const { t } = useTranslation();

  let LocaleDate = t("lng") === "fa" ? "fa-IR" : "en";
  const theme = useTheme();
  let dispatch = useDispatch();
  let { id } = useParams();

  const handleCalender = (e) => {
    const select = e;
    let monthNum =
      select.month.toString().length === 1 ? "0" + select.month : select.month;
    let dayNum =
      select.day.toString().length === 1 ? "0" + select.day : select.day;
    let day = select.year + "/" + monthNum + "/" + dayNum;
    setDays(day);
    const pickDate = data?.data[day];
    setDataValue(pickDate);
  };

  let today = new Date().toLocaleDateString(LocaleDate);

  React.useEffect(() => {
    dispatch(userArrivalCalender(id));
  }, [dispatch]);

  React.useEffect(() => {
    const obj = data?.data;
    const dates = [];
    if (obj) {
      for (let key in obj) {
        let value = obj[key];
        if (value["arrival"] !== null || value["out"] !== null) {
          let date = key?.split("/");
          dates.push({
            year: parseInt(date[0]),
            month: parseInt(date[1]),
            day: parseInt(date[2]),
            className: "purpleDay",
          });
        }
        if (value['today']){
          setDataValue(value)
          setDays(key)
        }
      }
    }
    setSelectedDayRange(dates);
  }, [dispatch, data?.data]);


  const [selectedDayRange, setSelectedDayRange] = React.useState(null);
  if (loading) {
    return <LoadingCore loading={loading} />;
  }
  return (
    <>
      <Container maxWidth={"xl"}>
        <Box sx={{ marginTop: 5, marginBottom: 2.5 }}>
          {t("Click_on_the_comment_date_to_view_past_statuses")}
        </Box>
        <Grid container spaceing={4}>
          <Grid item xs={12} sx={12} md={6}>
            {data?.data !== undefined && (
              <>
                <Box>
                  <Box
                    sx={{
                      background: "rgba(128, 5, 216, 0.9)",
                      padding: 2,
                      color: "#fff",
                      width: "20.7em",
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                      textAlign: "center",
                    }}
                  >
                    <Box sx={{ marginTop: 1 }}>{today}</Box>
                  </Box>
                  <Calendar
                    value={null}
                    onChange={(e) => handleCalender(e)}
                    shouldHighlightWeekends
                    calendarClassName="custom-calendar"
                    calendarTodayClassName="custom-today-day"
                    locale={"fa"}
                    customDaysClassName={selectedDayRange}
                  />
                </Box>
              </>
            )}
          </Grid>
          <Grid item xs={12} sx={12} md={6}>
            {dataValue && (
              <Box marginTop={1} maxWidth={"350px"}>
                <Typography
                  variant={"h4"}
                  fontSize={14}
                  align={"center"}
                  color={"#ce1440"}
                >
                  {t("Status")}
                </Typography>
                <Box
                  sx={{
                    margin: "25px 0",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  <Typography component={"span"}>{days}</Typography>
                  <Typography sx={{ margin: "0 5px" }} component={"span"}>
                    {dataValue?.day}
                  </Typography>
                </Box>
                <Box sx={{ margin: "30px 0" }}>
                  <Box
                    sx={{
                      background:
                        theme.palette.mode === "dark" ? "#1e1e1e" : "#e3e8ec",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    <Box>
                      <Typography component={"span"} sx={{ margin: "0 5px" }}>
                        {t("From_Hour")}
                      </Typography>
                      <Typography component={"span"}>
                        {dataValue?.arrival === null
                          ? "______"
                          : dataValue?.arrival}
                      </Typography>
                    </Box>
                    <Typography>تا</Typography>
                    <Box>
                      <Typography component={"span"} sx={{ margin: "0 5px" }}>
                        {t("Hour")}
                      </Typography>
                      <Typography component={"span"}>
                        {dataValue?.out === null ? "______" : dataValue?.out}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>{t("Status")} :</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {dataValue?.status === "accept" ? (
                      <Check sx={{ margin: "0 2px", color: "#1ce087" }} />
                    ) : (
                      <Close sx={{ margin: "0 2px", color: "#ce1440" }} />
                    )}
                    <Typography
                      color={
                        dataValue?.status === "accept" ? "#1ce087" : "#ce1440"
                      }
                    >
                      {dataValue?.status === "accept"
                        ? t("Approved")
                        : t("Not_approved")}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ margin: "15px 0" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>{t("Total_Working_Minutes")}</Typography>
                    <Typography
                      color={dataValue?.count === null ? "#ce1440" : "#1ce087"}
                    >
                      {dataValue?.count === null ? "0" : dataValue?.count}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "center", marginTop: 2 }}>
                  <Button
                    onClick={() => setOpenModal(true)}
                    sx={{ background: "#ce1440" }}
                    variant="contained"
                  >
                    {t("Edit")}
                  </Button>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
      {openModal && (
        <CalenderModal
          days={days}
          time={data?.data[days]}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

export default UserCalender;
