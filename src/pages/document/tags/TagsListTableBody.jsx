import React, {useEffect} from "react";
import {
    TableRow, TableCell, Box, useTheme, Chip, Typography, Checkbox, Button, Input
} from "@mui/material";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {updateTags} from "redux/features/document/tags/UpdateTagsSlice";
import {SwitchCore} from "core";
import {useForm} from "react-hook-form";
import StoreTags from "./StoreTags";
import _ from 'lodash'

const TagsListTableBody = ({data}) => {
    const [req, setReq] = React.useState({});
    const [tags, setTags] = React.useState(null)

    const {t} = useTranslation();
    const dispatch = useDispatch();
    let dir = t("direction") === "rtl";
    const theme = useTheme();
    const border = theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

    useEffect(() => {
        setTags(data)
    }, [data])


    const handleLiveData = (id, title = null, color = null, active = null) => {
        let reqClone = _.cloneDeep(req)
        if (reqClone[id] !== undefined) {
            if (title !== null) {
                reqClone[id] = {...reqClone[id], title: title}
            }
            if (active !== null) {
                reqClone[id] = {...reqClone[id], active: active}
            }
            if (color !== null) {
                reqClone[id] = {...reqClone[id], color: color}
            }
        } else {
            if (title !== null) {
                reqClone[id] = {title: title}
            }
            if (active !== null) {
                reqClone[id] = {active: active}
            }
            if (color !== null) {
                reqClone[id] = {color: color}
            }
        }
        setReq(reqClone)
    }

    const updateRow = (id) => {
        if (req[id] !== undefined) {
            dispatch(updateTags({id: id, data: req[id]}))
        }
    }

    return (
        <>
            {tags?.map((row, i) => (<TableRow
                key={i}
                sx={{
                    "&:last-child td, &:last-child th": {
                        border: 0, borderColor: border,
                    },
                }}
            >
                <TableCell scope={"row"} align={dir ? "right" : "left"}>
                    <Box sx={{
                        display: "inline-flex", gap: 2, alignItems: "center"
                    }}>
                        <Typography sx={{
                            background: `${req[row.id] !== undefined ? req[row.id].color : row.color}`,
                            width: 15,
                            height: 15,
                            borderRadius: "100%"
                        }}
                                    component={"span"}/>
                        <Input type="text"
                               id={row.id}
                               name={row.title}
                               onChange={(e) => handleLiveData(row.id, e.target.value)}
                               defaultValue={row.title}
                        />
                    </Box>
                </TableCell>
                <TableCell align={dir ? "right" : "left"}>
                    <ColorPicker>
                        <input
                            className={"ColorPicker"}
                            onChange={(e) => handleLiveData(row.id, null, e.target.value)}
                            type="color"
                            id={"color" + row.id}
                            name={"color" + row.id}
                            value={req[row.id] !== undefined ? req[row.id].color : row.color}
                        />
                    </ColorPicker>
                </TableCell>
                <TableCell scope={"row"} align={"center"}>
                    <SwitchCore
                        check={req[row.id] !== undefined ? req[row.id].active : row.active}
                        setCheck={(e) => handleLiveData(row.id, null, null, e.target.checked)}/>
                </TableCell>
                <TableCell scope={"row"} align={"center"}>
                    <Button variant={"outlined"} color={"primary"} onClick={() => updateRow(row.id)}>
                        {t("Confirmation")}
                    </Button>
                </TableCell>
            </TableRow>))}
        </>
    );
};

export default TagsListTableBody;
const ColorPicker = styled.div`
  .ColorPicker {
    cursor: pointer;
  }
`;