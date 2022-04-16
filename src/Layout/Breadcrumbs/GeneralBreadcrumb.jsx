import * as React from 'react';
import {Typography, Box} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Link} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';
import {useTranslation} from 'react-i18next';
import BreadcrumbData from './BreadcrumbData'
import {ArrowLeft, ArrowRight} from "@mui/icons-material";

function handleClick(event) {
    event.preventDefault();
}

const GeneralBreadcrumb = ({path}) => {
    const {t} = useTranslation();
    const dir = t("direction") === "rtl"

    return (<Box sx={{margin: '0 5px'}} role="presentation" onClick={handleClick}>
        <Breadcrumbs separator={dir ? <ArrowLeft sx={{color: 'white', marginTop: "-6px"}} fontSize={'small'}/> :
            <ArrowRight sx={{color: 'white', marginTop: "-6px"}} fontSize={'small'}/>} aria-label="breadcrumb">
            <Link
                underline="hover"
                style={{color: 'white'}}
                to='/'
            >
                <Box sx={{display: 'flex'}}>
                    <HomeIcon sx={{margin: '0 5px'}} fontSize="inherit"/>
                    <Typography sx={{marginBottom: '2px'}}>
                        {t("Home")}
                    </Typography>
                </Box>
            </Link>
            <Link
                underline="hover"
                style={{color: 'white'}}
                to='/dashboard'
                disabled={true}
            >
                <Box sx={{display: 'flex'}}>
                    <DashboardSharpIcon sx={{margin: '0 5px'}} fontSize="inherit"/>
                    <Typography sx={{marginBottom: '2px'}}>
                        {t("Dashboard")}
                    </Typography>
                </Box>
            </Link>
            <BreadcrumbData page={path}/>
        </Breadcrumbs>
    </Box>);
};

export default GeneralBreadcrumb
