import React, {useEffect, useState} from "react";
import {
    TableRow, TableCell, IconButton, useTheme, Chip, Stack,
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {CloudDownload, Delete, Edit} from "@mui/icons-material";
import {CheckRole, Download} from "helper";
import {useDispatch} from "react-redux";
import {deleteResources} from "redux/features/project/Resources/deleteResources";
import UpdateResources from "./UpdateResources";
import * as _ from "lodash"

const ShowResourcesTableBody = ({data, id, user}) => {
    const [openModal, setOpenModal] = useState(false);
    const [saveId, setSaveId] = useState("");
    const [docs, setDocs] = useState(null);
    const [saveData, setSaveData] = useState({});
    const {t} = useTranslation();
    let dir = t("direction") === "rtl";
    const theme = useTheme();
    const border = theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";
    const dispatch = useDispatch();

    useEffect(() => {
        setDocs(data)
    }, [data])


    const handleDeleteResources = (doc_Id) => {
        const data = {
            doc_id: doc_Id
        }
        const clone = _.cloneDeep(docs);
        const newData = _.remove(clone, function (x) {
            return x?.id !== doc_Id
        })
        dispatch(deleteResources({data, id})).then(res => {
            setDocs(newData)
        })
    }
    const handleUpdateResources = (doc_Id) => {
        setSaveId(doc_Id);
        data.filter(x => x.id === doc_Id).map((item) => setSaveData(item))
        setOpenModal(true);
    }
    return (<>
        {docs?.map((row, i) => (<TableRow
            name={row.id}
            key={i}
            sx={{
                "&:last-child td, &:last-child th": {
                    border: 0, borderColor: border,
                },
            }}
        >

            <TableCell align={dir ? "right" : "left"}>{row?.title}</TableCell>
            <TableCell align={dir ? "right" : "left"}>{row?.version}</TableCell>
            <TableCell align={"center"}>
                <Chip label={row.active === 1 ? t("Active") : t("DeActive")} sx={row.active === 1 ? {
                    backgroundColor: "#1ce087", color: "#fff"
                } : {backgroundColor: "#ce1440", color: "#fff"}}/>
            </TableCell>
            <TableCell align={"center"}>
                <Stack direction={"row"} spacing={1} justifyContent={"center"}>
                    <IconButton onClick={() => Download(row.title, row.doc)}>
                        <CloudDownload
                            aria-label="download"
                            sx={{color: "#8005D8", cursor: "pointer"}}
                        />
                    </IconButton>
                    {CheckRole({
                        roles: user?.data?.type,
                        page: 'projects',
                        part: 'update'
                    }) && (
                        <>
                            <IconButton onClick={() => handleUpdateResources(row.id)} aria-label="edit">
                                <Edit/>
                            </IconButton>
                            <IconButton onClick={() => handleDeleteResources(row.id)}>
                                <Delete aria-label="delete" sx={{color: "#ce1440", cursor: "pointer"}}/>
                            </IconButton>
                        </>
                    )}
                </Stack>
            </TableCell>
        </TableRow>))}
        {openModal && <UpdateResources data={saveData} docId={saveId} id={id} openModal={openModal}
                                       setOpenModal={setOpenModal}/>}
    </>);
};

export default ShowResourcesTableBody;
