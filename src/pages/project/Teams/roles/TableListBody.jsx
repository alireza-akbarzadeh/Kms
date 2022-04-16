import * as React from "react";
import { Button, Chip, TableCell, TableRow, useTheme } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";

import UpdateTeamRoles from "./UpdateTeamRoles";
import {CheckRole} from "../../../../helper";
const TableListBody = ({ data, updateData, user}) => {
  const [saveId, setSaveId] = React.useState("");
  const [saveData, setSaveData] = React.useState([]);

  const [openUpdateTeam, setOpenUpdateTeam] = React.useState(false);

  const { t } = useTranslation();
  let dir = t("direction") === "rtl";

  const handleUpdate = (id, title, active) => {
    setSaveId(id);
    setSaveData({
      title: title,
      active: active
    })
    setOpenUpdateTeam(true);
  };

  const theme = useTheme();
  const border =
    theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";

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
          <TableCell align={dir ? "right" : "left"}>{row.title}</TableCell>
          <TableCell align={dir ? "right" : "left"}>
            <Chip
              label={row?.active === 1 ? t("Active") : t("DeActive")}
              color={row?.active === 1 ? "success" : "error"}
            />
          </TableCell>
          {CheckRole({roles: user?.data?.type, page: 'projects', part: 'update'}) && (
          <TableCell align={"center"}>

            <Button variant="text" color="secondary">
              <EditIcon onClick={() => handleUpdate(row?.id, row?.title, row?.active)} />
            </Button>
          </TableCell>
              )}
        </TableRow>
      ))}
      {openUpdateTeam && (
        <UpdateTeamRoles
          id={saveId}
          title={saveData?.title}
          active={saveData?.active}
          openModal={openUpdateTeam}
          setOpenModal={setOpenUpdateTeam}
          updateData={updateData}
          mainData={data}
        />
      )}
    </>
  );
};

export default TableListBody;
