import React from "react";
import {useTranslation} from "react-i18next";
import {TableRow, TableCell, Box, Typography, Button, Stack} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Avatar} from "components";
import {CheckRole} from "helper";


const UserTableBody = ({data, HandleUpdateUser, user}) => {
    const {t} = useTranslation();
    const dir = t("direction") === "rtl";
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
                    <TableCell scope={"row"} align={dir ? "right" : "left"}>
                        <Box display={"flex"}>
                            <Box sx={{gap: 2}}>
                                <Avatar address={row?.avatar} size={'sm'}/>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', margin: '0 5px'}}>
                                <Typography component={"span"}>{row?.first_name}</Typography>
                                <Typography
                                    component={"span"}
                                    sx={{margin: "0 4px", display: "inline-block"}}
                                >
                                    {row?.last_name}
                                </Typography>
                            </Box>
                        </Box>
                    </TableCell>
                    <TableCell align={dir ? "right" : "left"}>{row?.username}</TableCell>
                    <TableCell align={dir ? "right" : "left"}>{row?.email}</TableCell>
                    <TableCell align={dir ? "right" : "left"}>{CheckRole({
                        roles: user?.data?.type,
                        page: 'users',
                        part: 'updateRole'
                    }) ? row?.mobile : '----'}</TableCell>
                    <TableCell align={dir ? "right" : "left"}>
                        <Stack spacing={1} direction={'column'}>
                            {row?.type?.map((item) => (
                                <Typography>
                                    {t(item)}
                                </Typography>
                            ))}
                        </Stack>
                    </TableCell>
                    <TableCell align={dir ? "right" : "left"}>
                        <Button
                            color={"primary"}
                            variant={"contained"}
                            disabled={row?.type?.includes('manager')  || !CheckRole({
                                roles: user?.data?.type,
                                page: 'users',
                                part: 'updateRole'
                            })}
                            onClick={() => HandleUpdateUser(row)}
                        >
                            {t("Edit_Roles")}
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};

export default UserTableBody;
