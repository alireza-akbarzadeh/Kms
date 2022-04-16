import noAccessImage from "../assets/noAccess.png";
import {Box, Typography} from "@mui/material";
import * as React from "react";
import {useTranslation} from "react-i18next";


const NoAccess = ({mt = '200px'}) => {
    const {t} = useTranslation()
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: mt
        }}>
            <img src={noAccessImage} alt={'noAccess'}/>
            <Typography>
                {t('noAccess')}
            </Typography>
        </Box>
    )
}

export default NoAccess