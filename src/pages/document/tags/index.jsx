import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/material/styles";
import {Http} from "helper";
import {LoadingCore, PaginateCore} from "core";
import {getTags} from "redux/features/document/tags/getTagsListSLice";
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
    Container, Button
} from "@mui/material";
import {Filter, NoData} from "components";
import {SentimentVeryDissatisfied, Add} from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import TagsListTableBody from "./TagsListTableBody";
import StoreTags from "./StoreTags";


const TagsList = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [tagsList, setTagsList] = React.useState([]);
    const [tagsClone, setTagsClone] = React.useState([]);
    const perPage = 10;
    const firstRequest = React.useRef(false);

    const {data, loading} = useSelector((state) => state.getTagsSlice);

    const dispatch = useDispatch();
    const {t} = useTranslation();
    const theme = useTheme();

    React.useEffect(() => {
        const isPaginate = true
        dispatch(getTags(isPaginate));
    }, [dispatch]);

    React.useEffect(() => {
        setTagsList(data);
        setTagsClone(data);
    }, [data]);

    const handlePageChange = async (event, value) => {
        setPage(value);
        let page = value;
        const res = await Http(`document/tag?page=${page}&perPage=${perPage}`, {
            method: "get",
        });
        if (res.status === 200) {
            setTagsList(res?.data?.data);
        }
    };

    ////Handle Search
    React.useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm !== "") {
                const res = await Http(`document/tag?search=${searchTerm}`, {
                    method: "get",
                });
                if (res.status === 200) {
                    setTagsList(res?.data?.data);
                }
            } else {
                if (firstRequest.current) {
                    setTagsList(tagsList);
                } else {
                    firstRequest.current = true;
                }
            }
        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    let dir = t("direction") === "rtl";
    const border = theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";

    const handleFilterChange = async (queryString) => {
        const res = await Http(`document/tag?${queryString}`, {
            method: "get",
        });
        if (res.status === 200) {
            setTagsList(res?.data?.data);
        }
    };

    return (
        <>
            {loading && <LoadingCore loading={loading}/>}
            <Box sx={{mt: 5}}>
                <Container maxWidth={"xl"}>
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
                        style={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
                    >
                        <Button onClick={() => setOpenModal(true)} variant={"text"} sx={{color: "#fff"}}>
                            <Add/>
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
                                data={tagsList?.filters}
                                handleChange={handleFilterChange}
                            />
                        </Box>
                    </Box>
                    {tagsList?.data?.data?.length > 0 ? (
                        <TableContainer sx={{border: border}}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {t("Title")}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {t("color")}
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            {t("status")}
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            {t("Actions")}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TagsListTableBody
                                        data={tagsList?.data?.data}
                                    />
                                </TableBody>
                            </Table>
                            {tagsList?.data?.total > 10 && (
                                <PaginateCore>
                                    <Pagination
                                        dir={dir ? "rtl" : "ltr"}
                                        page={page}
                                        onChange={handlePageChange}
                                        count={Math.ceil(
                                            tagsList?.data?.total / tagsList?.data?.per_page
                                        )}
                                        variant="outlined"
                                        color="primary"
                                        disabled={tagsList?.data?.total < 11}
                                    />
                                </PaginateCore>
                            )}
                        </TableContainer>
                    ) : (
                        <NoData/>
                    )}

                </Container>
                {openModal && <StoreTags openModal={openModal} setOpenModal={setOpenModal}/>}
            </Box>
        </>
    );
};

export default TagsList;
