import {Box, TableCell, TableRow, Typography, Tooltip, Button} from "@mui/material";
import {StatusCore} from "core";
import React from "react";
import {useTranslation} from "react-i18next";
import {Avatar} from 'components'
import {Block, OpenInNew} from "@mui/icons-material";


const MyVacationTableBody = ({data}) => {
    const {t} = useTranslation();
    return (
        <>
            {data?.map((row, i) => (
                <TableRow
                    key={row.id}
                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                >
                    <TableCell align="right">
                        {row?.type === "earned_leave" ? t("Earned") : t("Sickness")}
                    </TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    {row.arrival === null ? (
                        <TableCell align="right">
                            {t('Daily')}
                        </TableCell>
                    ) : (
                        <TableCell align="right">
                            {row.arrival} __ {row.out}
                        </TableCell>
                    )}
                    <TableCell align="right">
                        <Tooltip title={row.description} arrow>
                            <div>
                                {row.description.substring(0, 10)} ...
                            </div>
                        </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                        {row?.file === null ? (
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Typography color={'error'}>
                                    {t('withoutFile')}
                                </Typography>
                            </Box>
                        ) : (
                            <a href={row?.file} target={'_blank'}>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <OpenInNew color={'primary'}/>
                                    <Typography>
                                        {t('withFile')}
                                    </Typography>
                                </Box>
                            </a>
                        )}
                    </TableCell>
                    <TableCell align="right">
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
                                                ? "#ce1f34"
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
                    <TableCell>
                        {row?.comment === null ? (<>
                            ---
                        </>) : (<Tooltip title={row?.comment}>
                            <typography>
                                {row?.comment?.substring(0, 10)}
                            </typography>
                        </Tooltip>)}
                    </TableCell>
                    <TableCell scope={"row"} align="right">
                        {row?.hr !== null ? (
                            <Box display={"flex"}>
                                <Box>
                                    <Avatar address={row?.hr?.avatar} sizes="sm"/>
                                </Box>
                                <Box display={"flex"} marginRight={'5px'}>
                                    <Typography> {row?.hr?.first_name}</Typography>
                                    <Typography> {row?.hr?.last_name}</Typography>
                                </Box>
                            </Box>
                        ) : (
                            <Box>----</Box>
                        )}

                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};

export default MyVacationTableBody;
