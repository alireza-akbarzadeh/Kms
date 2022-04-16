import {Fab, Typography} from "@mui/material";
import * as React from "react";
import {useLocation} from "react-router-dom";

const SidebarItem = ({text, icon, onClick, secondIcon, color = 'primary'}) => {
    let {pathname} = useLocation();
    return (
        <Fab
            variant="extended"
            size="small"
            aria-label="add"
            sx={{
                width: "100%",
                height: 43,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
            }} color={color}
            onClick={onClick}
        >
            {icon}
            <Typography fontSize={13} sx={{margin: '0 5px'}} bgcolor='primary'>
                {text}
            </Typography>
            {secondIcon}
        </Fab>
    )
}

export default SidebarItem