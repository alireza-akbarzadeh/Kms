import * as React from "react";
import {
  IconButton,
  Badge,
  Divider,
  Box,
  Typography,
  Popover,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { getUserMessages } from "redux/features/users/notification";
import { useTranslation } from "react-i18next";
import { MessageLink } from "./Noti-styled";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Http } from "helper/Http";
import { PaginateCore } from "core";
import Pagination from "@mui/lab/Pagination";
import { getUserInfo } from "redux/features/users/userSlice";
import Skeleton from "@mui/material/Skeleton";
import * as moment from "jalali-moment";
import { Path } from "constant/Path";

const StyledBadge = styled(Badge)`
  & > .MuiBadge-badge: {
    right: -3,
    top: 3,
    padding: "0 4px",
  },
`;
const Notification = ({ data: count }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [perPage, setPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [messageList, setMessageList] = React.useState([]);
  const [seen, setSeen] = React.useState(0);
  const { data, loading } = useSelector((state) => state.Notification);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let dir = t("direction") === "rtl";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(getUserMessages({ seen, perPage, page }));
    dispatch(getUserInfo());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  React.useEffect(() => {
    setMessageList(data);
  }, [data]);

  const handlePageChange = async (event, value) => {
    setPage(value);
    const page = value;
    const res = await Http(`user/messages?perPage=${perPage}&page=${page}`, {
      method: "get",
    });
    if (res.status === 200) {
      setMessageList(res?.data);
    }
  };

  return (
    <>
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <StyledBadge badgeContent={count?.data?.message_count} color="primary">
          <NotificationsIcon
            style={
              theme.palette.mode === "dark"
                ? { color: "#fff" }
                : { color: "#fff" }
            }
          />
        </StyledBadge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ height: "400px" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {loading ? (
          <Box sx={{ width: 300 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        ) : data?.data?.length === 0 ? (
          <Box>
            <Typography component={"p"} padding={"20px"}>
              پیامی برای شما ارسال نشده است
            </Typography>
          </Box>
        ) : (
          messageList?.data?.data?.map((message, i) => (
            <Box padding={"20px"} sx={{}} key={i}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>
                  {moment
                    .from(message.created_at, "en", "YYYY/M/D HH:mm")
                    .format("YYYY-M-D HH:mm:ss")}
                </Typography>
                <Typography sx={{ fontSize: "14px" }} color={"secondary"}>
                  {message.title}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "13px", marginTop: "4px" }}>
                {message.text}
              </Typography>
              <Divider sx={{ marginTop: 2 }} />
            </Box>
          ))
        )}
        <Box>
          {messageList?.data?.total > 10 && (
            <PaginateCore>
              <Pagination
                dir={dir ? "rtl" : "ltr"}
                page={page}
                onChange={handlePageChange}
                count={Math.ceil(
                  messageList?.data?.total / messageList?.data?.per_page
                )}
                variant="outlined"
                color="primary"
                disabled={messageList?.data?.total < 11}
              />
            </PaginateCore>
          )}
        </Box>
        <MessageLink>
          <Link onClick={handleClose} to={Path.Notification}>
            {t("View_ALL_Messages")}
          </Link>
        </MessageLink>
      </Popover>
    </>
  );
};

export default Notification;
