import React from "react";
import {
    TableRow,
    TableCell,
    Typography,
    useTheme, Chip,
} from "@mui/material";
import {useTranslation} from "react-i18next";
import BadgeAvatars from "components/avatar";

const ShowTeamTableBody = ({data}) => {
    const {t} = useTranslation();
    let dir = t("direction") === "rtl";
    const theme = useTheme();
    const border =
        theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";
    return (
        <>
            <TableRow
                sx={{
                    "&:last-child td, &:last-child th": {
                        border: 0,
                        borderColor: border,
                    },
                }}
            >
                <TableCell dir={dir ? "right" : "left"}>
                    <BadgeAvatars align={"flex-start"} address={data?.avatar} size={"md"}/>
                </TableCell>
                <TableCell align={dir ? "right" : "left"}>{data?.title}</TableCell>
                <TableCell align={dir ? "right" : "left"}>
                    <Chip
                        sx={data?.active === 1 ? {background: "#1ce087", color: "#fff"} : {
                            background: "#ce1440",
                            color: "#fff"
                        }}
                        label={data?.active === 1 ? t("Active") : t("DeActive")}/>
                </TableCell>
                <TableCell align={dir ? "right" : "left"}>
                    <Typography
                        sx={{color: "#696969", fontSize: 14}}
                        component={"p"}
                        lineHeight={2}
                    >
                        {data?.description}
                    </Typography>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ShowTeamTableBody;
