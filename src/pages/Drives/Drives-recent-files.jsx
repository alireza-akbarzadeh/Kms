import React, {useEffect, useState} from "react";
import {ViewList, Apps, AllInbox, Cancel} from "@mui/icons-material";
import DrivesTables from "./Drives-tables";
import DriveLists from "./Drives-lists";
import {Box, Divider} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getDriveList} from "redux/features/drive/getDriveList";

const DrivesRecentFiles = ({type, mainData, user}) => {
    const [changeListView, setChangeListView] = useState("list");

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const getAll =() => {
        dispatch(getDriveList({}))
    }
    function createData(data) {
        return {...data};
    }

    const rows = [];
    mainData?.data?.data?.map((item) => {
        rows.push(createData(item))
    });
    return (<Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
                alignSelf: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
                }}
            >
                <Box sx={{fontSize: "30px", display: 'flex', alignItems: 'center'}} gap={2}>
                    {(type === null || type === undefined) ? (<span>{t("Recent_Items")}</span>) : (
                        <>
                            <AllInbox onClick={() => getAll()} sx={{cursor: 'pointer'}}/>
                            <span>{t(type)}</span>
                        </>
                    )}

                </Box>
                <Box>
                    <Apps
                        style={{cursor: "pointer"}}
                        onClick={() => setChangeListView("table")}
                    />
                    <ViewList
                        style={{cursor: "pointer"}}
                        onClick={() => setChangeListView("list")}
                    />
                </Box>
            </Box>
            <Divider sx={{width: "100%"}}/>
            {changeListView === "table" ? (<DriveLists list={rows}/>) : (<DrivesTables user={user} rows={rows}/>)}
        </Box>);
};

export default DrivesRecentFiles;
