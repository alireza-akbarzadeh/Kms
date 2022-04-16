import React, {useEffect, useState} from "react";
import { ModalCore, LoadingCore } from "core";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const RulesUpdateModal = ({ openModal, setOpenModal, mainData }) => {
  const { t } = useTranslation();
  const dir = t("direction") === "rtl";
  return (
    <>
      <ModalCore size={700} title={t("View_Rules")} open={openModal} setOpen={setOpenModal}>
        <Box>
          <Box sx={{ display: 'flex', flexDirection: "column", height: "400px", overflowY: "scroll", padding: "15px" }}>
            <Typography variant="h5" sx={{ color: "#8005d8" }} align={dir ? "right" : "left"}>
              {mainData?.title}
            </Typography>

            <Typography align={dir ? "right" : "left"} sx={{ lineHeight: 2, fontSize: 14, marginTop: 2, textTransform: "capitalize", letterSpacing: "0.6px" }}>
              {mainData?.body}
            </Typography>
          </Box>
          <Button
            fullWidth
            sx={{ borderRadius: 15, padding: "5px 12px", marginTop: 2 }}
            variant={"contained"}
            color={"secondary"}
            onClick={() => setOpenModal(false)}
          >
            {t("Close")}
          </Button>
        </Box>
      </ModalCore>
    </>
  );
};

export default RulesUpdateModal;
