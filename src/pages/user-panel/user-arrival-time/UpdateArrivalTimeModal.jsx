import React, { useEffect } from "react";
import { CoreBTN, ModalCore } from "core";
import { Box, Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import * as moment from "jalali-moment";
import { updateUserArrivalTimes } from "redux/features/users/updateUserTimesSlice";

const UpdateArrivalTimeModal = ({ openModal, setOpenModal, days, time }) => {
  const { t } = useTranslation();
  const { isSuccess, loading } = useSelector((state) => state.updateUserTimes);
  const [ArrivalValue, setArrivalValue] = React.useState(null);
  const [OutValue, setOutValue] = React.useState(null);
  const isFirstRender = React.useRef(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (time?.arrival !== null) {
      setArrivalValue(createDateFromTextValue(time?.arrival));
    }
    if (time?.out !== null) {
      setOutValue(createDateFromTextValue(time?.out));
    }
  }, [days, time]);

  const createDateFromTextValue = (value) => {
    const splitParts = value.split(":");
    return new Date(1970, 1, 1, splitParts[0], splitParts[1]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const Arrival = moment(ArrivalValue, "HH:mm:ss")
      .locale("fa")
      .format("HH:mm:ss");

    const Out = moment(OutValue, "HH:mm:ss").locale("fa").format("HH:mm:ss");
    const totalData = {
      date: days,
      arrival: Arrival === "Invalid date" ? null : Arrival,
      out: Out === "Invalid date" ? null : Out,
    };
    dispatch(updateUserArrivalTimes(totalData));
  };

  let dir = t('direction') === "rtl" ? "unset !important" : "0 !important"


  React.useEffect(() => {
    if (isSuccess && !isFirstRender.current) {
      setOpenModal(false);
    } else {
      isFirstRender.current = false;
    }
  }, [isSuccess]);

  return (
    <div>
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
                value={ArrivalValue}
                ampm={false}
                onChange={(newValue) => {
                  setArrivalValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
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
                    fullWidth
                    {...params}
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
                value={OutValue}
                onChange={(newValue) => {
                  setOutValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
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
                    fullWidth
                    {...params}
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
              disabled={ArrivalValue === null && OutValue === null}
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
    </div>
  );
};

export default UpdateArrivalTimeModal;
