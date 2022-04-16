import NoData from "components/NoData";
import LoadingCore from "core/LoadingCore";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { saveDocumentList } from "redux/features/document/save-document/saveDocumnetList";
import {
  Box,
  Container,
  Input,
  Pagination,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Table,
  Typography,
} from "@mui/material";
import { Http } from "helper";
import { Filter } from "components";
import { PaginateCore } from "core";
import BookMarkTableBody from "./BookMarkTableBody";
const BookmarkIndex = () => {
  const [template, setTemplate] = React.useState([]);
  const [templateClone, setTemplateClone] = React.useState([]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const [page, setPage] = React.useState(1);
  const perPage = 10;

  const { data, loading } = useSelector((state) => state.saveDocumentListSlice);

  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const firstRequest = useRef(false);

  React.useEffect(() => {
    setTemplate(data);
    setTemplateClone(data);
  }, [data]);

  //handle Search
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm !== "") {
        const res = await Http(`document/saved/index?search=${searchTerm}`, {
          method: "get",
        });
        if (res.status === 200) {
          setTemplate(res?.data?.data);
        }
      } else {
        if (firstRequest.current) {
          setTemplate(templateClone);
        } else {
          firstRequest.current = true;
        }
      }
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  ////Page Change
  const handlePageChange = async (event, value) => {
    setPage(value);
    let page = value;
    const res = await Http(
      `document/saved/index?page=${page}&perPage=${perPage}`,
      {
        method: "get",
      }
    );
    if (res.status === 200) {
      setTemplateClone(res?.data?.data);
    }
  };

  let dir = t("direction") === "rtl";
  const border =
    theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";

  const handleFilterChange = async (queryString) => {
    const res = await Http(`document/saved/index?${queryString}`, {
      method: "get",
    });
    if (res.status === 200) {
      setTemplateClone(res?.data?.data);
    }
  };

  useEffect(() => {
    dispatch(saveDocumentList());
  }, [dispatch]);

  if (loading) return <LoadingCore loading={loading} />;

  return (
    <>
      <Box mt={3}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(128, 5, 216, 0.9)",
              padding: "14px 10px",
              flexWrap: "wrap",
              backdropFilter: "blur(5px)",
            }}
            style={{ borderTopLeftRadius: 9, borderTopRightRadius: 9 }}
          >
            <Typography sx={{ color: "#fff" }}>
              {t("savedDocuments")}
            </Typography>
            <Box>
              <Input
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete="off"
                sx={{
                  padding: "0 6px",
                  borderRadius: 2,
                  color: "#fff",
                }}
                type={"search"}
                placeholder={t("search")}
              />
              <Filter
                data={template?.filters}
                handleChange={handleFilterChange}
              />
            </Box>
          </Box>
          {template?.data?.data?.length > 0 ? (
            <TableContainer sx={{ border: border }} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align={dir ? "right" : "left"}>
                      {t("Title")}
                    </TableCell>
                    <TableCell align={dir ? "right" : "left"}>
                      {t("Description")}
                    </TableCell>
                    <TableCell align={dir ? "right" : "left"}>
                      {t("Author")}
                    </TableCell>
                    <TableCell align={dir ? "right" : "left"}>
                      {t("visibility")}
                    </TableCell>
                    <TableCell align={dir ? "right" : "left"}>
                      {t("status")}
                    </TableCell>
                    <TableCell align={dir ? "right" : "left"}>
                      {t("Actions")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <BookMarkTableBody data={template?.data?.data} />
                </TableBody>
              </Table>
              {template?.data?.total > 10 && (
                <PaginateCore>
                  <Pagination
                    dir={dir ? "rtl" : "ltr"}
                    page={page}
                    onChange={handlePageChange}
                    count={Math.ceil(
                      template?.data?.total / template?.data?.per_page
                    )}
                    variant="outlined"
                    color="primary"
                    disabled={template?.data?.total < 11}
                  />
                </PaginateCore>
              )}
            </TableContainer>
          ) : (
            <NoData />
          )}
        </Container>
      </Box>
    </>
  );
};

export default BookmarkIndex;
