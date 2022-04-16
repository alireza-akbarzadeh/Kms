import React from "react";
import {
    TableRow,
    TableCell,
    Box,
    Typography,
    IconButton,
    useTheme,
} from "@mui/material";
import {StatusCore} from "core";
import {ThumbDown, ThumbUp} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

const VacationWorkingTabel = ({handleStatus, data}) => {
    const {t} = useTranslation();
    let dir = t("direction") === "rtl";
    const theme = useTheme();
    const border =
        theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";

    return (
        <>
            {data?.map((row) => (
                <TableRow
                    key={row?.id}
                    sx={{
                        "&:last-child td, &:last-child th": {
                            border: 0,
                            borderColor: border,
                        },
                    }}
                >
                    <TableCell scope={"row"} align={dir ? "right" : "left"}>
                        <Box
                            sx={{
                                marginTop: 1,
                                fontSize: 12,
                                color: "#666",
                            }}
                        >
                            <Typography component={"span"}>
                                {row?.user?.first_name}
                            </Typography>
                            <Typography
                                component={"span"}
                                sx={{margin: "0 4px", display: "inline-block"}}
                            >
                                {row?.user?.last_name}
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                marginTop: 1,
                                fontSize: 14,
                                color: "#444",
                                display: "block",
                            }}
                            component={"span"}
                        >
                            {row?.user?.email}
                        </Typography>
                    </TableCell>
                    <TableCell align={dir ? "right" : "left"}>
                        <Typography color={"#777"} component={"span"}>
                            {row?.date}
                        </Typography>
                        <br/>
                        <Typography
                            component={"span"}
                            sx={{
                                marginTop: 1,
                                display: "inline-block",
                                fontSize: 13,
                            }}
                        >
                            {row?.arrival === null
                                ? "روزانه"
                                : " از ساعت " + (row?.arrival === null ? '__' :  row?.arrival) + " الی " + (row?.out === null ? '__' :  row?.out)}
                        </Typography>
                    </TableCell>
                    <TableCell align={dir ? "right" : "left"}>
                        {row?.description}
                    </TableCell>
                    <TableCell align={dir ? "right" : "left"}>
                        <Box display={"flex"}>
                            {row.status === "accept" && <StatusCore success/>}
                            {row.status === "reject" && <StatusCore danger/>}
                            {row.status === "waiting" && <StatusCore warning/>}
                            <Typography
                                color={
                                    row.status === "accept"
                                        ? "#1ce087"
                                        : row.status === "waiting"
                                            ? "#0fcece"
                                            : row.status === "reject"
                                                ? "#ce1440"
                                                : "#333"
                                }
                                sx={{margin: "0px 4px"}}
                            >
                                {row.status === "accept" ? (
                                    row.accepted_at
                                ) : row.status === "waiting" ? (
                                    <>{t("wating")}</>
                                ) : row.status === "reject" ? (
                                    row.rejected_at
                                ) : null}
                            </Typography>
                        </Box>
                    </TableCell>
                    <TableCell scope={"row"} align={dir ? "right" : "left"}>
                        <Box
                            sx={{
                                marginTop: 1,
                                fontSize: 11,
                                color: "#666",
                            }}
                        >
                            <Typography component={"span"}>{row?.hr?.first_name}</Typography>
                            <Typography
                                component={"span"}
                                sx={{margin: "0 4px", display: "inline-block"}}
                            >
                                {row?.hr?.last_name}
                            </Typography>
                        </Box>
                    </TableCell>
                    <TableCell scope={"row"} align={dir ? "right" : "left"}>
                        <Box>
                            <IconButton
                                sx={{
                                    border: "1px solid #1ce087",
                                    borderRadius: "100%",
                                }}
                                disabled={row?.status === "accept"}
                                onClick={() => handleStatus(row?.id, "accept")}
                            >
                                <ThumbUp
                                    sx={
                                        row?.status === "accept"
                                            ? {color: "#777 !important"}
                                            : {color: "#1ce087"}
                                    }
                                />
                            </IconButton>
                            <IconButton
                                sx={{
                                    border: "1px solid #ce1440",
                                    borderRadius: "100%",
                                    margin: "0 10px",
                                }}
                                disabled={row?.status === "reject"}
                                onClick={() => handleStatus(row?.id, "reject")}
                            >
                                <ThumbDown
                                    sx={
                                        row?.status === "reject"
                                            ? {color: "#777 !important"}
                                            : {color: "#ce1440"}
                                    }
                                />
                            </IconButton>
                        </Box>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};

export default VacationWorkingTabel;
