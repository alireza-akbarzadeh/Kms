import React from "react";
import {Link} from 'react-router-dom';
import {Typography, Box, Breadcrumbs} from '@mui/material';
import BreadcrumbDetail from './BreadcrumbDetail'
import {ArrowLeft, ArrowRight} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

const BreadcrumbData = ({page}) => {
    const [data, setData] = React.useState();
    const {t} = useTranslation();
    const dir = t("direction") === "rtl"
    React.useEffect(() => {
        setData(BreadcrumbDetail(page.substr(1)))
    }, [page])
    return (
        <Breadcrumbs separator={dir ? <ArrowLeft sx={{color: 'white'}} fontSize={'small'}/> :
            <ArrowRight sx={{color: 'white'}} fontSize={'small'}/>} aria-label="breadcrumb">
            {data?.map((row) => (
                <Link
                    underline="hover"
                    key={row.title}
                    style={row.active ? {color: 'white'} : {
                        color: 'white',
                        pointerEvents: 'none',
                        cursor: 'default',
                        opacity: 0.5
                    }}
                    to={row.link}
                >
                    <Box sx={{display: 'flex'}}>
                        {row.icon}
                        <Typography sx={{marginBottom: '2px'}}>
                            {row.title}
                        </Typography>
                    </Box>
                </Link>
            ))}
        </Breadcrumbs>
    );
};

export default BreadcrumbData;