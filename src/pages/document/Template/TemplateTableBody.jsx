import React from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  useTheme,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Edit, Visibility, Delete } from "@mui/icons-material";
import * as moment from "jalali-moment";
import { useDispatch } from "react-redux";
import { deleteTemplate } from "redux/features/document/template/deleteSlice";
import * as _ from "lodash";
const VacationTableBody = ({
  data,
  setTemplate,
  mainData,
  setSaveID,
  setOpenModal,
  setOpenTab
}) => {
  const { t } = useTranslation();
  let dir = t("direction") === "rtl";
  const theme = useTheme();
  const dispatch = useDispatch();

  //  functionalyti delete
  const handleDeleteTemplateArticel = (id) => {
    let newState = _.cloneDeep(mainData);
    const newData = _.remove(newState?.data?.data, function (x) {
      return x?.id !== id;
    });
    newState.data.data = newData;
    dispatch(deleteTemplate(id)).then((res) => {
      setTemplate(newState);
    });
  };

  const handleEditArticleTemplate = (id) => {
    setSaveID(id);
    setOpenModal(true);
  };

  const handleViewArticleTemplate = (id) => {
    setSaveID(id);
    setOpenTab(3);
  };

  const border =
    theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";
  moment.locale("fa");
  return (
    <>
      {data?.map((row, i) => (
        <TableRow
          key={i}
          sx={{
            "&:last-child td, &:last-child th": {
              border: 0,
              borderColor: border,
            },
          }}
        >
          <TableCell align={dir ? "right" : "left"}>{row?.title}</TableCell>
          <TableCell align={"center"}>
            {moment(row?.created_at, "YYYY/MM/DD HH:mm:ss")
              .locale("fa")
              .format("YYYY/MM/DD HH:mm:ss")}
          </TableCell>

          <TableCell scope={"row"} align={"center"}>
            {moment
              .from(row?.updated_at, "fa", "YYYY/M/D HH:mm:ss")
              .format("YYYY/M/D HH:mm:ss")}
          </TableCell>
          <TableCell scope={"row"} align={"center"}>
            {row?.type}
          </TableCell>
          <TableCell scope={"row"} align={"center"}>
            <Stack direction={"row"} gap={2} justifyContent={"center"}>
              <IconButton
                onClick={() => handleViewArticleTemplate(row.id)}
                color="secondary"
              >
                <Visibility />
              </IconButton>
              <IconButton
                onClick={() => handleEditArticleTemplate(row.id)}
                color="info"
              >
                <Edit />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteTemplateArticel(row.id)}
                color="error"
              >
                <Delete />
              </IconButton>
            </Stack>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default VacationTableBody;
