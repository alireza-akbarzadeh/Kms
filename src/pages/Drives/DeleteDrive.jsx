import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ModalCore from "core/ModalCore";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { deleteDriveList } from "redux/features/drive/deleteDrives";
import { getDriveList } from "redux/features/drive/getDriveList";

const DelelteOutModal = ({ setOpenDeleteModal, openDeleteModal }) => {
  const { t } = useTranslation();
  const [submit, setSubmit] = useState(false);
  let dispatch = useDispatch();

  const { isSuccess } = useSelector((state) => state.deleteDriveListSlice);

  console.log(isSuccess, "isSuccess");
  useEffect(() => {
    if (isSuccess && submit) {
      setOpenDeleteModal({ modal: false });
    }
  }, [submit, isSuccess]);

  const handleDeleteDrive = () => {
    const id = openDeleteModal.modalId;
    dispatch(deleteDriveList({ id })).then((res) => {
      setSubmit(true);
      dispatch(getDriveList({}));
    });
    setSubmit(false);
  };

  return (
    <ModalCore
      title={t("Logout")}
      open={openDeleteModal.modal}
      setOpen={setOpenDeleteModal}
    >
      <Typography align={"center"}>
        {t("Areـyouـsureـyouـwantـtoـleave")}
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={4}
      >
        <Button
          sx={{ borderRadius: 15, padding: "5px 12px" }}
          variant={"contained"}
          color={"primary"}
          onClick={handleDeleteDrive}
        >
          {t("Confirmation")}
        </Button>
        <Button
          sx={{ borderRadius: 15, padding: "5px 12px", margin: "0 15px" }}
          variant={"contained"}
          color={"secondary"}
          onClick={() => setOpenDeleteModal({ modal: false })}
        >
          {t("Cancel")}
        </Button>
      </Box>
    </ModalCore>
  );
};

export default DelelteOutModal;
