import React from "react";
import {Box} from "@mui/material";

const PaginetCore = ({children}) => {
    return (
        <>
            <Box sx={{display: "flex", justifyContent: 'center'}}>
                <Box
                    sx={{
                        display: "flex",
                        textAlign: "center",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "3px",
                    }}
                >
                    <div className="dataTables_info"/>
                    <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example5_paginate"
                    >
                        <Box
                            sx={{
                                display: "inline-block",
                                paddingBottom: "3px",
                                direction: "ltr",
                            }}
                        >
                            {children}
                        </Box>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default PaginetCore;
