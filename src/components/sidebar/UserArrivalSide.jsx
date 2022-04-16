import { useTheme } from '@mui/material/styles';
import {Button, Divider, Typography} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { userExitTime } from "redux/features/users/userExitSlice";
import { userArrivalTime } from "redux/features/users/setArrivalTimeSlice";
import { getUserInfo } from 'redux/features/users/userSlice';
import Avatar from "../avatar";
const UserArrivalSide = () => {
    const { data } = useSelector((state) => state.user);

    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const dir = t("direction") === "rtl";
    const HandleArrivalUser = async () => {
        dispatch(userExitTime());
        dispatch(getUserInfo());
    };
    const HandleExitUser = async () => {
        dispatch(userArrivalTime());
        dispatch(getUserInfo());
    };
    return (
        <>
            <Avatar
                address={data?.data?.avatar}
                size={"xl"}
                badge={true}
                badgeColor={data?.data?.today_arrival}
            />

            <Box display={"flex"} justifyContent={"center"}>
                <Typography
                    mt={2}
                    component={"span"}
                    color={
                        theme.palette.mode === "dark"
                            ? "primary.dark"
                            : "secondary"
                    }
                >
                    {data?.data?.first_name}
                </Typography>
                <Typography
                    mt={2}
                    style={dir ? { marginRight: 4 } : { marginLeft: 4 }}
                    component={"span"}
                    color={
                        theme.palette.mode === "dark"
                            ? "primary.dark"
                            : "secondary"
                    }
                >
                    {data?.data?.last_name}
                </Typography>
            </Box>
            <Typography mt={2} component={"p"} color={"primary"}>
                {t("Your_user_status")}
            </Typography>
            {data?.data?.today_arrival ? (
                <Button
                    sx={{
                        width: "100%",
                        borderRadius: 4,
                        margin: "15px 0",
                        borderColor: "#1ce087",
                        color: "#fff",
                        background: "#1ce087",
                        ":hover": {
                            background: "#fff",
                            color: "#1ce087",
                            borderColor: "#1ce087",
                        },
                    }}
                    variant={"outlined"}
                    onClick={HandleArrivalUser}
                >
                    {t("Active")}
                </Button>
            ) : (
                <Button
                    sx={{
                        width: "100%",
                        borderRadius: 4,
                        margin: "15px 0",
                        borderColor: "#ce1440",
                        color: "#fff",
                        background: "#ce1440",
                        ":hover": {
                            background: "#fff",
                            color: "#ce1440",
                            borderColor: "#ce1440",
                        },
                    }}
                    variant={"outlined"}
                    onClick={HandleExitUser}
                >
                    {t("DeActive")}
                </Button>
            )}
        </>
    )
}

export default UserArrivalSide
