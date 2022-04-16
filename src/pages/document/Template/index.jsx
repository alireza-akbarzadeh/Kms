import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { templateList } from "redux/features/document/template/templateSlice";
import {
  Box,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Pagination,
  Container,
  useTheme,
} from "@mui/material";
import { Filter, NoData } from "components";
import { LoadingCore, PaginateCore } from "core";
import { useTranslation } from "react-i18next";
import { Add } from "@mui/icons-material";
import { Http } from "helper";
import { useRef } from "react";
import TemplateTableBody from "./TemplateTableBody";
import ChoosEditor from "./ChoosEditor";
import StoreTemplate from "./storeTemplate";
import StoreTemplateWithMarkdown from "./storeTemplateWithMarkdown";
import ViewTemplateArticle from "./ViewTemplateArticle";

const ArticleTemplateIndex = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [openTab, setOpenTab] = React.useState(0);
  const [saveID, setSaveID] = React.useState(null);

  const [template, setTemplate] = React.useState([]);
  const [templateClone, setTemplateClone] = React.useState([]);

  const [searchTerm, setSearchTerm] = React.useState("");

  const [page, setPage] = React.useState(1);
  const { data, loading } = useSelector((state) => state.templateListSlice);
  const perPage = 10;

  let firstRequest = useRef(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();

  React.useEffect(() => {
    setTemplate(data);
    setTemplateClone(data);
  }, [data]);

  React.useEffect(() => {
    dispatch(templateList());
  }, [dispatch]);



//handle Search
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm !== "") {
        const res = await Http(`document/template?search=${searchTerm}`, {
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
      `user/hr/leaveRequests?page=${page}&perPage=${perPage}`,
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
    const res = await Http(`document/template?${queryString}`, {
      method: "get",
    });
    if (res.status === 200) {
      setTemplateClone(res?.data?.data);
    }
  };


  const handleOpenChoosEditor = () => {
    setOpenModal(true);
  };
  if (loading) return <LoadingCore loading={loading} />;
  return (
    <>
      <Box mt={3}>
        <Container maxWidth="xl">
          {openTab === 0 && (
            <>
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
                <Button
                  onClick={() => handleOpenChoosEditor()}
                  variant="text"
                  sx={{ color: "#fff" }}
                >
                  <Add />
                </Button>
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
                        <TableCell align={"center"}>
                          {t("created_at")}
                        </TableCell>
                        <TableCell align={"center"}>
                          {t("updated_at")}
                        </TableCell>
                        <TableCell align={"center"}>{t("Type")}</TableCell>
                        <TableCell align={"center"}>{t("Actions")}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TemplateTableBody
                        setOpenModal={setOpenModal}
                        setSaveID={setSaveID}
                        setTemplate={setTemplate}
                        mainData={template}
                        setOpenTab={setOpenTab}
                        data={template?.data?.data}
                      />
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
            </>
          )}
          {openTab === 1 && (
            <StoreTemplateWithMarkdown
              saveID={saveID}
              setOpenTab={setOpenTab}
            />
          )}
          {openTab === 2 && (
            <StoreTemplate saveID={saveID} setOpenTab={setOpenTab} />
          )}
          {openTab === 3 && (
            <ViewTemplateArticle
              saveID={saveID}
              data={template?.data?.data}
              setOpenTab={setOpenTab}
            />
          )}
        </Container>
      </Box>
      <ChoosEditor
        setOpenTab={setOpenTab}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default ArticleTemplateIndex;
