import React from "react";
import {useTranslation} from "react-i18next";
import {
    InsertDriveFile,
    Collections,
    Newspaper,
    Audiotrack,
    VideoLibrary,
    AltRoute
} from '@mui/icons-material';
import {Box, Button, Grid} from "@mui/material"


const DriveCategory = ({type, FilterCategory}) => {
    const {t} = useTranslation();
    let itemDetails = [
        {
            id: 1,
            bgColor: "#DAC1F3",
            translate: t("Pics"),
            icon: <Collections/>,
            type: 'picture'
        },
        {
            id: 2,
            bgColor: "#BDF3F8",
            translate: t("Contents"),
            icon: <Newspaper/>,
            type: 'word'
        },
        {
            id: 3,
            bgColor: "#9CEDC8",
            translate: t("Visuals"),
            icon: <VideoLibrary/>,
            type: 'video'
        },
        {
            id: 4,
            bgColor: "#FADD75",
            translate: t("Files"),
            icon: <InsertDriveFile/>,
            type: 'file'
        },
        {
            id: 5,
            bgColor: "#E492A6",
            translate: t("Sounds"),
            icon: <Audiotrack/>,
            type: 'voice'
        },
        {
            id: 6,
            bgColor: "#9FA1A4",
            translate: t("Other_Formats"),
            icon: <AltRoute/>,
            type: 'other'
        },
    ];

    return (
        <Grid container margin={"15px 0"} spacing={2}>
            {itemDetails.map((item) => (
                <Grid item xs={12} md={4}
                      key={item.id}
                >
                    <Button
                        onClick={() => FilterCategory(item.type)}
                        fullWidth
                        sx={{backgroundColor: item.bgColor, height: "80px", borderRadius: "35px"}}>
                        {item.icon}
                        <Box sx={{fontSize: "20px", color: "#2E3139", margin: "0 5px"}}>
                            {item.translate}
                        </Box>
                    </Button>
                </Grid>
            ))
            }
        </Grid>
    );
};

export default DriveCategory;
