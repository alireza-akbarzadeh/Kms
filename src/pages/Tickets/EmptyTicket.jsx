import React from "react";
import {
    useMediaQuery,
    Typography,
    Button,
    Box,
    useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { AddBtn } from "./Tickets.styled";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const EmptyTicket = ({ showForm }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const { t } = useTranslation();


    return (
        <Box
            sx={{
                padding: " 10px 16px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <img src="/assets/images/2992775.png" alt="question" />
            <Typography variant="p" component="p" margin="15px 0">
                سوالات خود را با ما در میان بگذارید .و اولین تیکت خود را ایجاد کنید
            </Typography>
            <AddBtn>
                <Button variant="text" onClick={() => showForm(true)}>
                    <AddBoxOutlinedIcon sx={{
                        marginLeft: !matches && "24px"
                    }} />
                    {!matches && <span>{t("Add_New_Ticket")}</span>}
                </Button>
            </AddBtn>
        </Box>
    );
};

export default EmptyTicket;
