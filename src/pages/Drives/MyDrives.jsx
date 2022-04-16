import {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {myDriveList} from "redux/features/drive/MyDrives";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    useTheme,
    IconButton,
    Container,
    Pagination,
    Input,
    Typography,
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {CloudDownload, Edit} from "@mui/icons-material";
import {Download} from "helper";
import UpdateDrive from "./UpdateDrive";
import {Avatar} from "components";
import {LoadingCore} from "core";
import {Http} from "helper";
import {PaginateCore} from "core";
import {Filter} from "components";

const MyDrives = ({users, teams}) => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [saveId, setSaveId] = useState("");
    const [modalData, setModalData] = useState({});
    const [page, setPage] = useState(1);

    const [searchTerm, setSearchTerm] = useState("");
    const [driveList, setDriveList] = useState([]);
    const [driveClone, setDriveClone] = useState([]);

    const perPage = 10;
    const {data, loading} = useSelector((state) => state.myDriveListSlice);

    const firstRequest = useRef(false);
    const theme = useTheme();
    const {t} = useTranslation();
    const dir = t("direction") === "rtl";

    const handleUpdateDrive = (id, row, icon) => {
        setOpenModal(true);
        setSaveId(id);
        setModalData({...row, icon: icon});
    };

    useEffect(() => {
        dispatch(myDriveList());
    }, [dispatch]);

    useEffect(() => {
        setDriveList(data);
        setDriveClone(data);
    }, [data]);
    const handleFilterChange = async (queryString) => {
        const res = await Http(`document/myDrives?${queryString}`, {
            method: "get",
        });
        if (res.status === 200) {
            setDriveList(res?.data?.data);
        }
    };

    const handlePageChange = async (event, value) => {
        setPage(value);
        let page = value;
        const res = await Http(`document/myDrives?page=${page}&perPage=${perPage}`, {
            method: "get",
        });
        if (res.status === 200) {
            setDriveList(res?.data?.data);
        }
    };
    ////Handle Search
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm !== "") {
                const res = await Http(`document/myDrives?unique=${searchTerm}`, {
                    method: "get",
                });
                if (res.status === 200) {
                    setDriveList(res?.data?.data);
                }
            } else {
                if (firstRequest.current) {
                    setDriveList(driveClone);
                } else {
                    firstRequest.current = true;
                }
            }
        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);


    return (<>
        {loading && (<LoadingCore loading={loading}/>)}
        <Box mt={5}>
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
                    style={{borderTopLeftRadius: 9, borderTopRightRadius: 9}}
                >
                    <Typography sx={{color: "#fff"}}>{t("MyDrives")}</Typography>
                    <Box>
                        <Input
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoComplete="off"
                            sx={{
                                padding: "0 6px", borderRadius: 2, color: "#fff",
                            }}
                            type={"search"}
                            placeholder={t("Unique_Search")}
                        />
                        <Filter
                            data={driveList?.filters}
                            handleChange={handleFilterChange}
                        />
                    </Box>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="table drive">
                        <TableHead>
                            <TableRow>
                                <TableCell align={dir ? "right" : "left"}>
                                    {t("fileType")}
                                </TableCell>
                                <TableCell align={"center"}>{t("Title")}</TableCell>
                                <TableCell align={"center"}>{t("Description")}</TableCell>
                                <TableCell align={"center"}>{t("user")}</TableCell>
                                <TableCell align={"center"}>{t("visibility")}</TableCell>
                                <TableCell align={"center"}>{t("Download")}</TableCell>
                                <TableCell align={"center"}>{t("Edit")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {driveList?.data?.data?.map((row) => (<TableRow
                                key={row.id}
                                sx={{"&:last-child td, &:last-child th": {border: 0}}}
                            >
                                <TableCell
                                    align={dir ? "right" : "left"}
                                    className="file-th"
                                    component="th"
                                    scope="row"
                                >
                                    <img
                                        src={"/assets/images/" + row.type + ".png"}
                                        alt="drive"
                                    />
                                    <Box
                                        sx={theme.palette.mode === "dark" ? {color: "#f9f9f9"} : {color: "#121212"}}
                                    >
                                        {row.unique}
                                    </Box>
                                </TableCell>
                                <TableCell align={"center"}>{row.title}</TableCell>
                                <TableCell align={"center"}>
                                    {row.description.substring(0, 20)} ...{" "}
                                </TableCell>
                                <TableCell align={dir ? "right" : "left"}>
                                    <Box
                                        sx={{
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}
                                        gap={1}
                                    >
                                        <Avatar address={row.user.avatar} size={"sm"}/>
                                        {row.user.first_name + " " + row.user.last_name}
                                    </Box>
                                </TableCell>
                                <TableCell align={"center"}>{row.visibility}</TableCell>
                                <TableCell align={"center"}>
                                    <IconButton onClick={() => Download(row.title, row.file)}>
                                        <CloudDownload
                                            sx={{color: "#8005D8", cursor: "pointer"}}
                                        />
                                    </IconButton>
                                </TableCell>
                                <TableCell align={"center"}>
                                    <IconButton
                                        onClick={() => handleUpdateDrive(row.id, row, "/assets/images/" + row.type + ".png")}
                                    >
                                        <Edit sx={{color: "#8005D8", cursor: "pointer"}}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>))}
                        </TableBody>
                    </Table>
                    {driveList?.data?.total > 11 && (<PaginateCore>
                        <Pagination
                            dir={dir ? "rtl" : "ltr"}
                            page={page}
                            onChange={handlePageChange}
                            count={Math.ceil(driveList?.data?.total / driveList?.data?.per_page)}
                            variant="outlined"
                            color="primary"
                            disabled={driveList?.data?.total < 11}
                        />
                    </PaginateCore>)}
                </TableContainer>
            </Container>
        </Box>
        <UpdateDrive
            mine={true}
            id={saveId}
            openModal={openModal}
            setOpenModal={setOpenModal}
            data={modalData}
            users={users}
            teams={teams}
        />
    </>);
};
export default MyDrives;
