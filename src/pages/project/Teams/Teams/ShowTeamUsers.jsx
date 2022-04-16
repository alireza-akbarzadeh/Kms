import {
    Box,
    IconButton, MenuItem, Select,
    Stack,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    useTheme
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Avatar} from "components";
import _ from 'lodash'
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {UpdateTeamMemberRole} from "redux/features/project/Teams/UpdateTeamMemberRoleSlice";
import {DeleteMember} from "redux/features/project/Teams/DeleteMemberSlice";
import {CheckRole} from "../../../../helper";

const ShowTeamUsers = ({data, id, roles, user}) => {
    const [users, setUsers] = useState([])
    const {t} = useTranslation();
    let dir = t("direction") === "rtl";
    const theme = useTheme();
    const border =
        theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";
    const dispatch = useDispatch();

    useEffect(() => {
        setUsers(data)
    }, [data])


    const handleChange = (event, userId) => {
        const req = {
            team_id: id,
            user_id: userId,
            role_id: event.target.value
        }
        const newData = _.cloneDeep(data)
        const index = newData?.findIndex((item) => item.user_id === userId);
        newData[index].role_id = event.target.value
        dispatch(UpdateTeamMemberRole({data: req}))
            .then(res => {
                setUsers(newData)
            })
    };

    const handleDelete = (userId) => {
        const req = {
            team_id: id,
            user_id: userId,
        }
        const newData = _.remove(_.cloneDeep(data), function (x) {
            return x?.user_id !== userId
        })
        dispatch(DeleteMember({data: req}))
            .then(res => {
                setUsers(newData)
            })
    }

    return (
        <TableBody>
            {users?.map((row, i) => (
                <TableRow
                    name={row.id}
                    key={i}
                    sx={{
                        "&:last-child td, &:last-child th": {
                            border: 0,
                            borderColor: border,
                        },

                    }}
                >

                    <TableCell align={dir ? "right" : "left"}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Avatar address={row?.avatar} size={'sm'}/>
                            <Typography sx={{margin: '0 5px'}}>
                                {row?.first_name + ' ' + row?.last_name}
                            </Typography>
                        </Box>
                    </TableCell>
                    <TableCell align={dir ? "right" : "left"}>{row?.email}</TableCell>
                    <TableCell align={dir ? "right" : "left"}>
                        <Select
                            variant={'standard'}
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={row?.role_id}
                            onChange={(e) => handleChange(e, row.user_id)}
                            label="Age"
                        >
                            {roles?.map((roleOption) => (
                                <MenuItem value={roleOption.id}>
                                    {roleOption?.title}
                                </MenuItem>
                            ))}
                        </Select>

                    </TableCell>
                    <TableCell align={"center"}>
                        <Stack direction={"row"} spacing={1} justifyContent={"center"}>
                            {CheckRole({
                                roles: user?.data?.type,
                                page: 'projects',
                                part: 'update'
                            }) && (
                                <IconButton onClick={() => handleDelete(row?.user_id)}>
                                    <Delete aria-label="delete" sx={{color: "#ce1440", cursor: "pointer"}}/>
                                </IconButton>
                            )}
                        </Stack>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default ShowTeamUsers