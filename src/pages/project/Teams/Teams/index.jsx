import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TeamRoleList from '../roles/TeamRolesList'
import TeamList from './TeamList'
import {useTranslation} from "react-i18next";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Teams = () => {
    const [value, setValue] = React.useState(0);
    const {t} = useTranslation();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value}>
                    <Box sx={{width: '50%', alignItems: 'center', textAlign: 'center'}}>
                        <Tab label={t('teams')} {...a11yProps(1)} onClick={(event) => handleChange(event, 0)}/>
                    </Box>
                    <Box sx={{width: '50%', alignItems: 'center', textAlign: 'center'}}>
                        <Tab label={t('roles')} {...a11yProps(0)} onClick={(event) => handleChange(event, 1)}/>
                    </Box>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TeamList/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TeamRoleList/>
            </TabPanel>
        </Box>
    );
}

export default Teams;
