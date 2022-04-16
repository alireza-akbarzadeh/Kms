import {Box, TableCell, TableRow, Typography} from "@mui/material";
import React from "react";
import {Avatar} from "../../../components";
import {getDocStatus} from "../../../helper";
import {Edit, Update, Visibility} from "@mui/icons-material";

const ContributeRow = ({data, dir, setOpenEditModal, setShowData}) => {

    return (
        <TableRow>
            <TableCell align={dir ? "right" : "left"}>
                {data?.title}
            </TableCell>
            <TableCell align={dir ? "right" : "left"}>
                {data?.description?.substring(0, 25)} ...
            </TableCell>
            <TableCell align={dir ? "right" : "left"}>
                <Box sx={{display: 'inline-flex'}} gap={1}>
                    <Avatar address={data?.user?.avatar}/>
                    <Typography>
                        {data?.user?.first_name + ' ' + data?.user?.last_name}
                    </Typography>
                </Box>
            </TableCell>

            <TableCell dir={'ltr'} align={dir ? "right" : "left"}>
                {data?.date}
            </TableCell>
            <TableCell align={'center'}>
                {getDocStatus(data?.status_type, data?.status, false)}
            </TableCell>
            <TableCell align={'center'}>
                <Box sx={{display: 'inline-flex'}} gap={1}>
                    <Visibility sx={{cursor: 'pointer'}} color={'primary'} onClick={() => setShowData(data)}/>
                    <Edit sx={{cursor: 'pointer'}} color={'primary'} onClick={() => setOpenEditModal(data)}/>
                </Box>
            </TableCell>
        </TableRow>
    );
}

export default ContributeRow