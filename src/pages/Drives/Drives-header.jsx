import React, { useState } from "react";
import { AddBoxOutlined } from "@mui/icons-material";
import {
    useTheme,
    Typography,
    Button,
    useMediaQuery, Input,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { DrivesHeaders } from "./Drives-styled";
import DriveAddFile from "./Drive-Add-File";

const DrivesHeader = ({ setSearchTerm }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [openModal, setOpenModal] = useState(false);
    const matches = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <DrivesHeaders
                style={
                    theme.palette.mode === "dark"
                        ? { background: "#2E3139" }
                        : { background: "#dac1f3" }
                }
            >
                <div className={"Table_Headers"}>
                    <Typography variant="h4" component="h4">
                        {t("AllDrives")}
                    </Typography>
                    <div className={"SearchBar"}>
                        <Input
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoComplete="off"
                            sx={{
                                padding: "0 6px",
                                borderRadius: 2,
                                color: "#000",
                            }}
                            type={"search"}
                            placeholder={t("search")}
                        />
                        <Button sx={{ margin: "0 8px" }} variant="contained" onClick={() => setOpenModal(true)}>
                            <AddBoxOutlined sx={{ marginLeft: !matches && "24px" }} />
                            {!matches && <span>{t("Add_File")}</span>}
                        </Button>
                    </div>
                </div>
            </DrivesHeaders>
            <DriveAddFile
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </>
    );
};

export default DrivesHeader;
