import React, {memo, useState} from "react";
import {
    TableRow, TableCell, Box, Typography, IconButton, useTheme, Tooltip,
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {StatusCore} from "core";
import {CommentBank, OpenInNew, ThumbDown, ThumbUp} from "@mui/icons-material";
import LeaveRequestCommentModal from "../LeaveRequestCommentModal";

const VacationTableBody = ({data, handleStatus}) => {
    const {t} = useTranslation();
    let dir = t("direction") === "rtl";
    const theme = useTheme();
    const border = theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";

    const [openModal, setOpenModal] = useState(false)
    const [req, setReq] = useState({id: null, type: null})

    return (<>
        {data?.map((row, i) => (<TableRow
            key={i}
            sx={{
                "&:last-child td, &:last-child th": {
                    border: 0, borderColor: border,
                },
            }}
        >
            <TableCell scope={"row"} align={dir ? "right" : "left"}>
                <Box
                    sx={{
                        marginTop: 1, fontSize: 12, color: "#666",
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
                        marginTop: 1, fontSize: 14, color: "#444", display: "block",
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
                        marginTop: 1, display: "inline-block", fontSize: 13,
                    }}
                >
                    {row?.arrival === null ? "روزانه" : " از ساعت " + row?.arrival + " الی " + row?.out}
                </Typography>
            </TableCell>
            <TableCell align={dir ? "right" : "left"}>
                {row?.type === "earned_leave" ? t("Earned") : t("Sickness")}
            </TableCell>
            <TableCell align={dir ? "right" : "left"}>
                <Tooltip title={row?.description} arrow>
                    <Typography>
                        {row?.description?.substring(0, 10)}
                    </Typography>
                </Tooltip>
            </TableCell>
            <TableCell align="right">
                {row?.file === null ? (<Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography color={'error'}>
                        {t('withoutFile')}
                    </Typography>
                </Box>) : (<a href={row?.file} target={'_blank'}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <OpenInNew color={'primary'}/>
                        <Typography>
                            {t('withFile')}
                        </Typography>
                    </Box>
                </a>)}
            </TableCell>
            <TableCell align={dir ? "right" : "left"}>
                <Box display={"flex"}>
                    {row.status === "accept" && <StatusCore success/>}
                    {row.status === "reject" && <StatusCore danger/>}
                    {row.status === "waiting" && <StatusCore warning/>}
                    <Typography
                        color={row.status === "accept" ? "#1ce087" : row.status === "waiting" ? "#0fcece" : row.status === "reject" ? "#ce1440" : "#333"}
                        sx={{margin: "0px 4px"}}
                    >
                        {row.status === "accept" ? (row.accepted_at) : row.status === "waiting" ? (<>{t("wating")}</>) : row.status === "reject" ? (row.rejected_at) : null}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell scope={"row"} align={dir ? "right" : "left"}>
                <Box
                    sx={{
                        marginTop: 1, fontSize: 11, color: "#666", display: 'flex', flexDirection: 'column'
                    }}
                    gap={1}
                >
                    <Typography component={"span"}>{row?.hr?.first_name + ' ' + row?.hr?.last_name}</Typography>
                </Box>
            </TableCell>
            <TableCell>
                {row?.comment === null ? (<>
                    ---
                </>) : (<Tooltip title={row?.comment}>
                    <typography>
                        {row?.comment?.substring(0, 10)}
                    </typography>
                </Tooltip>)}
            </TableCell>
            <TableCell scope={"row"} align={dir ? "right" : "left"}>
                <Box>
                    <IconButton
                        sx={{
                            border: "1px solid #1ce087", borderRadius: "100%",
                        }}
                        disabled={row?.status === "accept"}
                        onClick={() => {
                            setOpenModal(true)
                            setReq({id: row?.id, type: 'accept'})
                        }}
                    >
                        <ThumbUp
                            sx={row?.status === "accept" ? {color: "#777 !important"} : {color: "#1ce087"}}
                        />
                    </IconButton>
                    <IconButton
                        sx={{
                            border: "1px solid #ce1440", borderRadius: "100%", margin: "0 10px",
                        }}
                        disabled={row?.status === "reject"}
                        onClick={() => {
                            setOpenModal(true)
                            setReq({id: row?.id, type: 'reject'})
                        }}
                    >
                        <ThumbDown
                            sx={row?.status === "reject" ? {color: "#777 !important"} : {color: "#ce1440"}}
                        />
                    </IconButton>
                </Box>
            </TableCell>
        </TableRow>))}
        {openModal && <LeaveRequestCommentModal openModal={openModal}
                                                setOpenModal={setOpenModal}
                                                id={req?.id}
                                                handleStatus={handleStatus}
                                                type={req?.type}/>}
    </>);
};

export default memo(VacationTableBody);
