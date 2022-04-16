import {Chip} from "@mui/material";
import React from "react";

const getDocStatus = (status, string, pointer = false) => {
    switch (status) {
        case 'reject':
            return <Chip color={'error'} label={string} sx={pointer && {cursor: 'pointer'}}/>
        case 'writing':
            return <Chip color={'warning'} label={string} sx={pointer && {cursor: 'pointer'}}/>
        case 'accept':
            return <Chip color={'success'} label={string} sx={pointer && {cursor: 'pointer'}}/>
        case 'published':
            return <Chip color={'primary'} label={string} sx={pointer && {cursor: 'pointer'}}/>
        case 'waiting':
            return <Chip color={'secondary'} label={string} sx={pointer && {cursor: 'pointer'}}/>
        case 'need_review':
            return <Chip color={'warning'} label={string} sx={pointer && {cursor: 'pointer'}}/>
        case 'draft':
            return <Chip label={string} sx={pointer && {cursor: 'pointer'}}/>
        default:
            return <Chip label='---' sx={pointer && {cursor: 'pointer'}}/>
    }
}
export default getDocStatus