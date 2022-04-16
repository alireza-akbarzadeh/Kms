import * as React from "react";
import {
    Popover,
    Typography,
    ListItemText,
    ListItemIcon,
    MenuItem,
    MenuList,
    Paper,
    Divider,
    Box
} from "@mui/material";
import {Avatar} from "components";
import {Mail, AssignmentInd, MobileFriendly, PowerSettingsNew} from '@mui/icons-material';
import {useTranslation} from "react-i18next";
import SignOutModal from "../components/sidebar/SignOutModal";
import {useState} from "react";


const UserInfo = ({data}) => {
    const [openModal, setOpenModal] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "userInfo" : undefined;
    const {t} = useTranslation();


    return (
        <>
            <Box
                sx={{margin: "0 6px 5px 6px"}}
                aria-describedby={id}
                onClick={handleClick}
            >
                <Avatar address={data?.data?.customer?.logo} size={'sm'}/>
            </Box>
            <Typography color={'white'} sx={{display: 'flex', alignItems: 'center'}}>
                {data?.data?.customer?.title}
            </Typography>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                sx={{minWidth: "200px", minHeight: "200px"}}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Paper sx={{ width: 320, maxWidth: '100%', padding: '10px' }} dir={'rtl'}>
                    <MenuList>
                        <MenuItem>
                            <ListItemIcon>
                                <Avatar address={data?.data?.avatar}/>
                            </ListItemIcon>
                            <ListItemText>{data?.data?.username}</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <AssignmentInd fontSize="small" color='primary' />
                            </ListItemIcon>
                            <ListItemText>{data?.data?.first_name + ' ' + data?.data?.last_name}</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Mail fontSize="small" color='primary'/>
                            </ListItemIcon>
                            <ListItemText>{data?.data?.email}</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <MobileFriendly fontSize="small" color='primary'/>
                            </ListItemIcon>
                            <ListItemText>{data?.data?.mobile}</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => setOpenModal(!openModal)}>
                            <ListItemIcon>
                                <PowerSettingsNew fontSize="small" color='primary'/>
                            </ListItemIcon>
                            <ListItemText>{t('SignOut')}</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Popover>
            {openModal && (
                <SignOutModal openModal={openModal} setOpenModal={setOpenModal} />
            )}
        </>
    );
};

export default UserInfo;
