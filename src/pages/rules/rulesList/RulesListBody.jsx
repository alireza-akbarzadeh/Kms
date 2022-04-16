import React, {useState} from "react";
import {
    TableRow,
    TableCell,
    SpeedDialAction,
    Box,
    Typography,
    SpeedDialIcon,
    useTheme,
} from "@mui/material";
import {useTranslation} from "react-i18next";

import {
    DeleteForever,
    MoreVert,
    Visibility,
    EditLocationAlt,
    Edit,
} from "@mui/icons-material";
import * as moment from "jalali-moment";
import {useDispatch} from "react-redux";
import {Speed} from "../Rules_Styled";
import RulesUpdateModal from "../RulesUpdateModal";
import RulesViewModal from "../RulesViewModal";
import {deleteRuleList} from "redux/features/customer-cnfig/deleteRulesSlice";
import _ from "lodash";
import {CheckRole} from "../../../helper";

const RulesListBody = ({data, updateList, mainData, user}) => {
    const [saveId, setSaveId] = useState("");
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [viewModal, setViewModal] = React.useState(false);
    const [finalData, setFinalData] = React.useState([]);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setFinalData(data);
    }, [data]);

    const handleDelete = async (id) => {
        const newData = _.cloneDeep(mainData);
        let newBody = _.remove(newData?.data?.data, function (item) {
            return item?.id !== id;
        });
        _.merge(newData.data.data, newBody);
        await dispatch(deleteRuleList(id)).then((response) => {
            updateList(newData);
        });
    };

    const handleUpdate = (id) => {
        setSaveId(id);
        setOpenModal(true);
        let index = mainData?.data?.data?.findIndex((item) => item.id === id)
        setSelectedRow(finalData[index])
    };

    const handleView = (id) => {
        setSaveId(id);
        setViewModal(true);
        let index = mainData?.data?.data?.findIndex((item) => item.id === id)
        setSelectedRow(finalData[index])
    };

    const {t} = useTranslation();
    let dir = t("direction") === "rtl";
    const theme = useTheme();
    const border =
        theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";

    return (
        <>
            {finalData?.map((row, i) => (
                <TableRow
                    name={row.id}
                    key={i}
                    sx={{
                        "&:last-child td, &:last-child th": {
                            border: 0,
                            borderColor: border,
                        },
                    }}
                >
                    <TableCell align={dir ? "right" : "left"}>{row?.title}</TableCell>
                    <TableCell align={dir ? "right" : "left"}>
                        <Typography
                            sx={{color: "#696969", fontSize: 14}}
                            component={"p"}
                            lineHeight={2}
                        >
                            {row?.body?.substring(0, 50)} ...
                        </Typography>
                    </TableCell>
                    <TableCell align={dir ? "right" : "left"}>
                        {moment
                            .from(row.created_at, "en", "YYYY/M/D HH:mm")
                            .format("YYYY-M-D HH:mm:ss")}
                    </TableCell>
                    <TableCell align={dir ? "right" : "left"}>
                        {moment
                            .from(row.updated_at, "en", "YYYY/M/D HH:mm")
                            .format("YYYY-M-D HH:mm:ss")}
                    </TableCell>
                    <TableCell align={dir ? "right" : "left"}>
                        {CheckRole({roles: user?.data?.type, page: 'rules', part: 'action'}) ? (
                            <Box sx={{position: "relative", transform: "translateZ(0px)"}}>
                                <Box sx={{transform: "translateZ(0px)"}}>
                                    <Speed
                                        direction="down"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            height: "100px",
                                        }}
                                        ariaLabel="SpeedDial basic example"
                                        icon={
                                            <SpeedDialIcon icon={<MoreVert/>} openIcon={<Edit/>}/>
                                        }
                                    >
                                        <SpeedDialAction
                                            tooltipTitle={t("View")}
                                            icon={
                                                <Visibility sx={{color: "rgba(128, 5, 216, 0.9)"}}/>
                                            }
                                            onClick={() => handleView(row?.id)}
                                        />
                                        <SpeedDialAction
                                            tooltipTitle={t("Edit")}
                                            icon={<EditLocationAlt sx={{color: "#14a3ce"}}/>}
                                            onClick={() => handleUpdate(row?.id)}
                                        />
                                        <SpeedDialAction
                                            icon={<DeleteForever sx={{color: "#ce1440"}}/>}
                                            onClick={() => handleDelete(row?.id)}
                                            tooltipTitle={t("Delete")}
                                        />
                                    </Speed>
                                </Box>
                            </Box>
                        ) : (
                            <Box onClick={() => handleView(row?.id)} sx={{cursor: 'pointer'}}>
                                <Visibility sx={{color: "rgba(128, 5, 216, 0.9)"}}/>
                            </Box>
                        )}

                    </TableCell>
                </TableRow>
            ))}
            <RulesUpdateModal
                id={saveId}
                openModal={openModal}
                setOpenModal={setOpenModal}
                updateList={updateList}
                mainData={mainData}
                data={selectedRow}
            />
            <RulesViewModal
                id={saveId}
                openModal={viewModal}
                setOpenModal={setViewModal}
                mainData={selectedRow}
            />
        </>
    );
};

export default RulesListBody;
