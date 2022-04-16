import React from "react";
import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";

const Item = ({children, isActive, components, ...rest}) => {
    const JSX = styled(`div`)(({theme}) => ({
        ...theme.typography.body2,
        display: "flex",
        padding: "6px 8.5px",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: 'rgb(255, 255, 255, 0.3)'
        }
    }));
    return (
        <>
            {isActive ? (
                <JSX {...rest}>
                    <Typography sx={{borderBottom: "1px solid #fff"}}>
                        {children}
                    </Typography>
                </JSX>
            ) : (
                <JSX {...rest}>{children}</JSX>
            )}
        </>
    );
};

export default Item;
