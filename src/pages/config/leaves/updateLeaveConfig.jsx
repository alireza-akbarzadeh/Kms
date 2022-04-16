import React from "react";
import { CoreBTN, ModalCore } from "core";
import { Box, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import * as moment from "jalali-moment";
import { updateConfigLeave } from "redux/features/customer-cnfig/updateConfigLeave";
import _ from "lodash";

const UpdateLeaveConfig = ({
  openModal,
  setOpenModal,
  DateNumber,
  mainData,
  updateList,
}) => {
  const { t } = useTranslation();
  const { loading, error, isSuccess } = useSelector(
    (state) => state.updateConfigLeave
  );
  const [Aarrivalvalue, setArrivalValue] = React.useState(null);
  const [Outvalue, setOutValue] = React.useState(null);
  const isFirstRender = React.useRef(true);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const Arrival = moment(Aarrivalvalue, "HH:mm:ss")
      .locale("fa")
      .format("HH:mm:ss");

    const Out = moment(Outvalue, "HH:mm:ss").locale("fa").format("HH:mm:ss");
    let request = {
      work_time: {},
    };
    const Date = {
      arrival: Arrival === "Invalid date" ? null : Arrival,
      out: Out === "Invalid date" ? null : Out,
    };
    request.work_time[DateNumber.toString()] = Date;

    let newData = _.cloneDeep(mainData);
    newData[DateNumber - 1] = { ...Date, weekNumber: DateNumber.toString() };
    dispatch(updateConfigLeave(request));
    updateList(newData);
  };

  const dir = t("direction") === "rtl";
  React.useEffect(() => {
    if (isSuccess && !isFirstRender.current) {
      setOpenModal(false);
    } else {
      isFirstRender.current = false;
    }
  }, [isSuccess]);

  return (
    <>
      <ModalCore
        title={t("Changeـworkingـhours")}
        open={openModal}
        setOpen={setOpenModal}
      >
        <form onSubmit={onSubmit}>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label={t("User_arrival")}
                value={Aarrivalvalue}
                ampm={false}
                onChange={(newValue) => {
                  setArrivalValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    sx={{
                      direction: "rtl",
                      marginTop: " 30px !important",
                      fontsSize: 18,
                      width: "100%",
                      color: "#444",
                      "& label": {
                        transformOrigin: "top left",
                        color: "#555",
                        fontSize: "14px",
                        top: "0 !important",
                        right: "23px !important",
                        left: dir,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Box sx={{ margin: "20px 0" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label={t("User_Out")}
                ampm={false}
                value={Outvalue}
                onChange={(newValue) => {
                  setOutValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    sx={{
                      direction: "rtl",
                      marginTop: " 30px !important",
                      fontsSize: 18,
                      width: "100%",
                      color: "#444",
                      "& label": {
                        transformOrigin: "top left",
                        color: "#555",
                        fontSize: "14px",
                        top: "0 !important",
                        right: "23px !important",
                        left: dir,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CoreBTN
              fullWidth
              sx={{ borderRadius: 15, padding: "5px 12px" }}
              variant={"contained"}
              type={"submit"}
              loading={loading}
              color={"primary"}
              disabled={Aarrivalvalue === null && Outvalue === null}
              title={t("Confirmation")}
            />
            <span style={{ width: "20px" }} />
            <Button
              fullWidth
              sx={{ borderRadius: 15, padding: "5px 12px" }}
              variant={"contained"}
              color={"secondary"}
              onClick={() => setOpenModal(false)}
            >
              {t("Cancel")}
            </Button>
          </Box>
        </form>
      </ModalCore>
    </>
  );
};

export default UpdateLeaveConfig;
