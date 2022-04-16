import NoData from "components/NoData";
import LoadingCore from "core/LoadingCore";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Input,
  Pagination,
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
import MyDocumnetTableBody from "./MyKnowledgeDocumentsTableBody";
import { ownIndexDocumnet } from "redux/features/document/ownIndexSlice";
import {
  ownKnowledgeIndexDocument,
  ownKnowledgeIndexDocumnet
} from "../../../redux/features/document/ownKnowledgeIndexSlice";
const MyKnowledgeDocuments = () => {
  const [knowledgeData, setKnowledgeData] = React.useState([]);
  const [knowledgeDataClone, setKnowledgeDataClone] = React.useState([]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const [page, setPage] = React.useState(1);
  const perPage = 10;

  const { data, loading } = useSelector((state) => state.ownKnowledgeIndexDocumentSlice);

  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const firstRequest = useRef(false);

  useEffect(() => {
    dispatch(ownKnowledgeIndexDocument());
  }, [dispatch]);


  React.useEffect(() => {
    setKnowledgeData(data);
    setKnowledgeDataClone(data);
  }, [data]);

  ///Handle Search
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm !== "") {
        const res = await Http(`document/index/knowledge?search=${searchTerm}`, {
          method: "get",
        });
        if (res.status === 200) {
          setKnowledgeData(res?.data?.data);
        }
      } else {
        if (firstRequest.current) {
          setKnowledgeData(knowledgeDataClone);
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
      `document/index/knowledge?page=${page}&perPage=${perPage}`,
      {
        method: "get",
      }
    );
    if (res.status === 200) {
      setKnowledgeDataClone(res?.data?.data);
    }
  };

  let dir = t("direction") === "rtl";
  const border =
    theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";

  const handleFilterChange = async (queryString) => {
    const res = await Http(`document/index/knowledge?${queryString}`, {
      method: "get",
    });
    if (res.status === 200) {
      setKnowledgeDataClone(res?.data?.data);
    }
  };

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
            <Typography sx={{ color: "#fff" }}>{t("knowledgeTree")}</Typography>
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
                data={knowledgeData?.filters}
                handleChange={handleFilterChange}
              />
            </Box>
          </Box>
          {knowledgeData?.data?.data?.length > 0 ? (
            <TableContainer sx={{ border: border }}>
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
                  <MyDocumnetTableBody data={knowledgeData?.data?.data} />
                </TableBody>
              </Table>
              {knowledgeData?.data?.total > 10 && (
                <PaginateCore>
                  <Pagination
                    dir={dir ? "rtl" : "ltr"}
                    page={page}
                    onChange={handlePageChange}
                    count={Math.ceil(
                      knowledgeData?.data?.total / knowledgeData?.data?.per_page
                    )}
                    variant="outlined"
                    color="primary"
                    disabled={knowledgeData?.data?.total < 11}
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

export default MyKnowledgeDocuments;
