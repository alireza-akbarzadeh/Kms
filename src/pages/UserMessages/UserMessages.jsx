import * as React from "react";
import { Wrapper } from "./user-styled";
import { getUserMessagesList } from "redux/features/users/getnotificationList";
import { Box, Divider, Typography, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { LoadingCore, PaginateCore } from "core";
import { useTheme } from "@mui/material/styles";
import Pagination from "@mui/lab/Pagination";
import { Http } from "helper/Http";
import * as moment from "jalali-moment";
moment.locale("fa");
const UserMessages = () => {
  const { data, loading } = useSelector((state) => state.getNotification);
  const [perPage, setPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [messageList, setMessageList] = React.useState([]);
  const theme = useTheme();

  let dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    setMessageList(data);
  }, [data]);

  let dir = t("direction") === "rtl"
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

  React.useEffect(() => {
    dispatch(getUserMessagesList({ perPage, page }));
  }, [dispatch]);

  if (loading) {
    return <LoadingCore loading={loading} />;
  }
  return (
    <Container maxWidth={"lg"} sx={{ margin: "30px auto" }}>
      <Wrapper elevation={4}>
        <Box>
          {data?.data?.length === 0 ? (
            <Typography component={"p"} padding={"20px"}>
              {t("No_message_was_sent_to_you")}
            </Typography>
          ) : (
            messageList?.data?.data?.map((message, i) => (
              <>
                <Box
                  padding={"20px"}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                  className={"content"}
                  key={i}
                >
                  <Box>
                    <Typography
                      sx={{ fontSize: "14px" }}
                      color={
                        theme.palette.mode === "dark"
                          ? "primary.dark"
                          : "primary"
                      }
                    >
                      {message.title}
                    </Typography>
                    <Typography
                      component={"p"}
                      sx={{
                        fontSize: "13px",
                        marginTop: "6px",
                        lineHeight: "1.5rem",
                      }}
                    >
                      {message.text}
                    </Typography>
                  </Box>
                  <Box>
                    {moment
                      .from(message.created_at, "en", "YYYY/M/D HH:mm")
                      .format("YYYY-M-D HH:mm:ss")}
                  </Box>
                </Box>
                <Divider sx={{ marginTop: 2, width: "100%" }} />
              </>
            ))
          )}
        </Box>
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
      </Wrapper>
    </Container>
  );
};

export default UserMessages;
