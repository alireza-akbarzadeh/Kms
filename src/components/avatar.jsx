import * as React from 'react';
import {styled} from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const avatarSize = (value) => {
    if (value === 'xl') {
        return {
            width: 125, height: 125
        }
    } else if (value === 'lg') {
        return {
            width: 100, height: 100
        }
    } else if (value === 'md') {
        return {
            width: 60, height: 60
        }
    } else if (value === 'sm') {
        return {
            width: 40, height: 40
        }
    } else {
        return {
            width: 25, height: 25
        }
    }
}
const BadgeAvatars = ({address, size, badge = false, badgeColor, align}) => {

    const StyledBadge = styled(Badge)(({theme}) => ({
        '& .MuiBadge-badge': {
            backgroundColor: badgeColor ? '#44b700' : "#ce1440",
            color: badgeColor ? '#44b700' : "#ce1440",
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));
    return (
        <>
            {badge ? (<Stack direction="row" justifyContent="center" alignContent="center" spacing={5}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        variant="dot"
                    >
                        <Avatar alt="avatar" src={address} sx={avatarSize(size)}/>
                    </StyledBadge>
                </Stack>) :
                (<Stack direction="row" justifyContent={align ? align : "center"} alignContent="center" spacing={5}>
                    <Avatar src={address} sx={avatarSize(size)}/>
                </Stack>)
            }
        </>
    );
}
export default BadgeAvatars;

// '/assets/images/unknownUser.jpg'