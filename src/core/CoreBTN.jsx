import React from "react";
import {Button, CircularProgress} from "@mui/material";

const CoreBTN = ({loading, title, ...rest}) => {
    return (
        <>
            <Button {...rest}>
                {title}
                {loading && (
                    <CircularProgress
                        sx={{
                            color: "#fff",
                            width: "18px !important",
                            height: "18px !important",
                            marginRight: 1,
                        }}
                    />
                )}
            </Button>
        </>
    );
};

export default CoreBTN;

