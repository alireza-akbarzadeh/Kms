import React from 'react'
import { Box, TableCell, TableRow, Typography } from '@mui/material'
import { StatusCore } from "core";
import { useTranslation } from 'react-i18next';
import {Avatar} from 'components'


const StudyTimeTableBody = ({ data }) => {
    const { t } = useTranslation();

    return (
        <>
            {data?.map((row, i) => (
                <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <TableCell align="right">
                        {row.arrival} __{row.out}
                    </TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">
                        <Box display={"flex"}>
                            {row.status === "accept" && <StatusCore success />}
                            {row.status === "reject" && <StatusCore danger />}
                            {row.status === "waiting" && <StatusCore warning />}
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
                                sx={{ margin: "0px 4px" }}
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
                    <TableCell scope={"row"} align="right">
                        <Box display={"flex"}>
                            <Box>
                                {row?.hr?.id > 0 && (
                                    <Avatar address={row?.hr?.avatar} size="sm" />
                                )}
                            </Box>
                            <Box display={"flex"} marginRight={'sm'}>
                                <Typography> {row?.hr?.first_name}</Typography>
                                <Typography> {row?.hr?.last_name}</Typography>
                            </Box>
                        </Box>
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}

export default StudyTimeTableBody
