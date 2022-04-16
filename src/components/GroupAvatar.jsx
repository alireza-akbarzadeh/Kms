import React from 'react';
import {Avatar, AvatarGroup} from "@mui/material";

const GroupAvatar = ({count = 2, data, variant, space}) => {
    return (
        <div>
            <AvatarGroup spacing={space} variant={variant} max={count}>
                {data?.map((item, i) => {
                    return <Avatar ket={i} src={item.avatar} alt={item.first_name}/>
                })}
            </AvatarGroup>
        </div>
    );
};

export default GroupAvatar;
