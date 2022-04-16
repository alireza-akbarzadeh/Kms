import noFoundImage from "../assets/noData.png";
import {Box, Typography} from "@mui/material";
import * as React from "react";
import {useTranslation} from "react-i18next";


const NoData = ({mt = '50px'}) => {
    const {t} = useTranslation()
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: mt
        }}>
            <img src={noFoundImage} alt={'noData'}/>
            <Typography>
                {t('noDataFound')}
            </Typography>
        </Box>
    )
}

export default NoData