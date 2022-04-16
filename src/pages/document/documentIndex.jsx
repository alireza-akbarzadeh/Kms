import React, {useEffect, useState} from "react";
import {LoadingCore, PaginateCore} from "core";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {IndexDocument} from "redux/features/document/IndexSlice";
import Box from "@mui/material/Box";
import {Filter, NoData} from "components";
import {
    Button,
    Chip,
    Container,
    Input,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {Add, PanoramaFishEye, Visibility} from "@mui/icons-material";
import Avatar from "components/avatar";
import {CheckRole, getDocStatus} from "helper";

const DocumentIndex = ({type}) => {
    const [queryParams, setQueryParams] = useState({
        page: 1,
        perPage: 15,
        search: null,
        filters: null,
    });
    const {data, loading} = useSelector((state) => state.IndexDocumentSlice);
    const {data: user} = useSelector((state) => state.user)
    const {t} = useTranslation();
    const theme = useTheme();
    const history = useHistory();
    const dispatch = useDispatch();
    let dir = t("direction") === "rtl";
    const border =
        theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";

    useEffect(() => {
        dispatch(IndexDocument({...queryParams, filters: `type=${type}`}));
    }, [dispatch]);

    const handleFilterChange = (queryString) => {
        let newFilter = {...queryParams, filters: queryString + "&type=" + type};
        setQueryParams(newFilter);
        dispatch(
            IndexDocument({...queryParams, filters: queryString + "&type=" + type})
        );
    };

    const handlePageChange = (event, value) => {
        let newQuery = {...queryParams, page: value};
        setQueryParams(newQuery);
        if (queryParams.filters === null) {
            dispatch(
                IndexDocument({...queryParams, page: value, filters: `type=${type}`})
            );
        } else {
            dispatch(IndexDocument({...queryParams, page: value}));
        }
    };

    const handleSearch = (event) => {
        const word = event.target.value;
        const delayDebounceFn = setTimeout(async () => {
            setQueryParams({...queryParams, search: word});
            dispatch(IndexDocument({...queryParams, search: word}));
        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    };

    const goToDoc = (id) => {
        history.push(`/document/${type}/${id}`)
    }


    if (loading) return <LoadingCore loading={loading}/>;
    return (
        <>
            <Box marginTop={4}>
                <Container maxWidth={"xl"}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "rgba(128, 5, 216, 0.9)",
                            padding: "14px 10px",
                            backdropFilter: "blur(5px)",
                        }}
                        style={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
                    >
                        {type === 'article' ? (
                            <>
                                {CheckRole({
                                    roles: user?.data?.type,
                                    page: 'document',
                                    part: 'storeArticle'
                                }) && (
                                    <Button
                                        variant="contained"
                                        color={"secondary"}
                                        onClick={() => history.push(`/document/store-${type}`)}
                                    >
                                        <Add/>
                                    </Button>
                                )}
                            </>
                        ): (
                            <Button
                                variant="contained"
                                color={"secondary"}
                                onClick={() => history.push(`/document/store-${type}`)}
                            >
                                <Add/>
                            </Button>
                        )}
                        <Box>
                            <Input
                                onChange={(e) => handleSearch(e)}
                                autoComplete="off"
                                sx={{
                                    padding: "0 6px",
                                    borderRadius: 2,
                                    color: "#fff",
                                }}
                                type={"search"}
                                placeholder={t("search")}
                            />
                            {data?.filters?.length > 0 && (
                                <Filter
                                    data={data?.filters}
                                    handleChange={handleFilterChange}
                                />
                            )}
                        </Box>
                    </Box>
                    {data?.data?.data?.length > 0 ? (
                        <TableContainer sx={{border: border}}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
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
                                        <TableCell align={"center"}>{t("visibility")}</TableCell>
                                        <TableCell align={"center"}>{t("status")}</TableCell>
                                        <TableCell align={"center"}>{t("Actions")}</TableCell>
                                    </TableRow>
                                </TableHead>
                                {data?.data?.data?.map((row, i) => (
                                    <TableRow
                                        key={i}
                                        sx={{
                                            marginBottom: "5px",
                                            "&:last-child td, &:last-child th": {
                                                border: 0,
                                                borderColor: border,
                                            },
                                        }}
                                    >
                                        <TableCell align={dir ? "right" : "left"}>
                                            {row.title}
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            {row?.description?.substring(0, 30)} ...
                                        </TableCell>
                                        <TableCell align={dir ? "right" : "left"}>
                                            <Box
                                                sx={{
                                                    display: "inline-flex",
                                                    gap: 2,
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Avatar size={"sm"} address={row?.user?.avatar}/>
                                                {row.user?.first_name + " " + row.user?.last_name}
                                            </Box>
                                        </TableCell>
                                        <TableCell align={"center"}>{row.visibility}</TableCell>
                                        <TableCell align={"center"}>
                                            {getDocStatus(row.status_type, row.status)}
                                        </TableCell>
                                        <TableCell
                                            align={"center"}
                                            sx={{cursor: "pointer"}}
                                            onClick={() => goToDoc(row?.id)}
                                        >
                                            <Visibility color={"primary"}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </Table>
                            {data?.data?.total > 10 && (
                                <PaginateCore>
                                    <Pagination
                                        dir={dir ? "rtl" : "ltr"}
                                        page={queryParams.page}
                                        onChange={handlePageChange}
                                        count={Math.ceil(data?.data?.total / data?.data?.per_page)}
                                        variant="outlined"
                                        color="primary"
                                        disabled={data?.data?.total < 11}
                                    />
                                </PaginateCore>
                            )}
                        </TableContainer>
                    ) : (
                        <NoData/>
                    )}
                </Container>
            </Box>
        </>
    );
};

export default DocumentIndex;
