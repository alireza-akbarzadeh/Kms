import * as React from "react";
import { LoadingCore, ModalCore } from "core";
import { Button, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userVacationCeiling } from "redux/features/mange/vacationCeiling";
import { useParams } from "react-router-dom";

const VacationCeiling = ({ openModal, setOpenModal }) => {
  const { t } = useTranslation();
  const { data, loading } = useSelector((state) => state.userVacation);

  let dispatch = useDispatch();
  let { id } = useParams();
  React.useEffect(() => {
    return dispatch(userVacationCeiling(id));
  }, []);
  const userName = data?.first_name + ' ' + data?.last_name;

  return (
    <>
      <ModalCore title={userName} open={openModal} setOpen={setOpenModal}>
        <Item color="#dac1f3">
          <Typography component={"p"}>{t("Earned")}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <Typography>{data?.earned_leave}</Typography>
            <Typography sx={{ margin: "0 5px" }}>{t("Hour")}</Typography>
          </Box>
        </Item>
        <Item color="rgba(255, 200, 0, 0.52)">
          <Typography component={"p"}> {t("Sickness")}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <Typography>{data?.sick_leave}</Typography>
            <Typography sx={{ margin: "0 5px" }}>{t("Day")}</Typography>
          </Box>
        </Item>
        <Box sx={{ text: "center" }}>
          <Button
            fullWidth
            sx={{ borderRadius: 15, padding: "5px 12px" }}
            variant={"contained"}
            color={"primary"}
            onClick={() => setOpenModal(false)}
          >
            {t("Confirmation")}
          </Button>
        </Box>
      </ModalCore>
    </>
  );
};

export default VacationCeiling;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 25px;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: ${({ color }) => color && color};
`;
