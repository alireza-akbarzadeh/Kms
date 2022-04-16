import React, { useContext } from "react";
import {ChevronLeft, Group} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { AppContext } from "context/AppContext";
import {SidebarItem} from "../index";
import {Divider} from "@mui/material";

const VacationSide = () => {
  const { openTab, setOpenTab } = useContext(AppContext);
  const { t } = useTranslation();
  const handleOpenTabUser = () => {
    setOpenTab(!openTab);
  };
  return (
    <>
      <Divider sx={{margin: '5px 0 7px 0'}}/>
        <SidebarItem text={t("User_List")} icon={<Group/>} onClick={handleOpenTabUser} secondIcon={<ChevronLeft/>}/>
    </>
  );
};

export default VacationSide;
