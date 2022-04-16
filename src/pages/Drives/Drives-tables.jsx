import React from "react";
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
    Stack,
} from "@mui/material";
import {CloudDownload, Delete, Edit} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {CheckRole, Download} from "helper";
import UpdateDrive from "./UpdateDrive";
import {Avatar} from "components";
import DeleteDrive from "./DeleteDrive";

const DrivesTables = ({rows, users, teams, user}) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState({
        modal: false,
        modalId: null,
    });
    const [saveId, setSaveId] = React.useState("");
    const [modalData, setModalData] = React.useState({});
    const theme = useTheme();
    const {t} = useTranslation();
    const dir = t("direction") === "rtl";

    const handleOPenDeleteDrive = (id) => {
        setOpenDeleteModal({modal: true, modalId: id});
    };

    const handleUpdateDrive = (id, row, icon) => {
        setOpenModal(true);
        setSaveId(id);
        setModalData({...row, icon: icon});
    };

    return (
        <>
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
                            <TableCell align={"center"}>{t("Actions")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
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
                                        sx={
                                            theme.palette.mode === "dark"
                                                ? {color: "#f9f9f9"}
                                                : {color: "#121212"}
                                        }
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
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        gap={1}
                                    >
                                        <Avatar address={row.user.avatar} size={"sm"}/>
                                        {row.user.first_name + " " + row.user.last_name}
                                    </Box>
                                </TableCell>
                                <TableCell align={"center"}>{row.visibility}</TableCell>
                                <TableCell align="center">
                                    <Stack direction={"row"} justifyContent={"center"} gap={2}>
                                        <IconButton onClick={() => Download(row.title, row.file)}>
                                            <CloudDownload
                                                sx={{color: "#58b6c7", cursor: "pointer"}}
                                            />
                                        </IconButton>
                                        {(CheckRole({roles: user?.data?.type, page: 'drives', part: 'update'}) || (row?.user?.id === user?.data?.id)) && (
                                            <IconButton
                                                onClick={() =>
                                                    handleUpdateDrive(
                                                        row.id,
                                                        row,
                                                        "/assets/images/" + row.type + ".png"
                                                    )
                                                }
                                            >
                                                <Edit sx={{color: "#746f6f", cursor: "pointer"}}/>
                                            </IconButton>
                                        )}
                                        {CheckRole({roles: user?.data?.type, page: 'drives', part: 'delete'}) && (
                                            <IconButton onClick={() => handleOPenDeleteDrive(row?.id)}>
                                                <Delete sx={{color: "#e7270e", cursor: "pointer"}}/>
                                            </IconButton>
                                        )}
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UpdateDrive
                id={saveId}
                openModal={openModal}
                setOpenModal={setOpenModal}
                data={modalData}
                users={users}
                teams={teams}
            />
            <DeleteDrive
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
            />
        </>
    );
};
export default DrivesTables;
