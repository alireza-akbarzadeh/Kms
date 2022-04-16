import {Box, Chip, TableCell, TableRow, useTheme} from "@mui/material";
import * as React from "react";
import {useTranslation} from "react-i18next";
import Avatar from "components/avatar";
import {useHistory} from "react-router-dom";

const TeamTableBody = ({mainData}) => {
    const {t} = useTranslation();
    let dir = t("direction") === "rtl";
    const theme = useTheme();
    const border = theme.palette.mode === "dark" ? "1px solid #121212" : "1px solid #eee";
    const history = useHistory();


    const showTeam = (id) => {
        const index = mainData?.findIndex((item) => item?.id === id)
        history.push({
            pathname: `team/${id}`,
            state: {
                teamData: mainData[index]
            }
        })
    }

    return (
        <>
            {mainData?.map((row, i) => (
                <TableRow
                    onClick={() => showTeam(row.id)}
                    key={i}
                    sx={{
                        cursor: 'pointer',
                        marginBottom: '5px',
                        "&:last-child td, &:last-child th": {
                            border: 0,
                            borderColor: border,
                        },
                    }}
                >
                    <TableCell align={dir ? "right" : "left"}>
                        <Box sx={{display: 'inline-flex', gap: 2, alignItems: 'center'}}>
                            <Avatar size={'sm'} address={row.avatar}/>
                            {row.title}
                        </Box>
                    </TableCell>
                    <TableCell
                        align={dir ? "right" : "left"}>{row.description.substring(0, 50)} ... </TableCell>
                    <TableCell align={'center'}>
                        <Chip
                            label={row?.active === 1 ? t("Active") : t("DeActive")}
                            color={row?.active === 1 ? "success" : "error"}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}

export default TeamTableBody