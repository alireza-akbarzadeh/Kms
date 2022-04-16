import React, { useEffect, useRef } from 'react'
import { EventNoteOutlined } from '@mui/icons-material'
import { Box, Button, Container, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { PaginateCore } from 'core'
import LoadingCore from 'core/LoadingCore'
import { useSelector, useDispatch } from 'react-redux'
import { getStudyTime } from 'redux/features/users/study-time/getStudyTimeSlice'
import StudyTimeTableBody from './StudyTimeTableBody'
import { Pagination } from "@mui/lab"
import CreateStudyTime from "./createStudyTime"
import { useTranslation } from 'react-i18next'
import {Filter, NoData} from "components"
import { Http } from 'helper'
const StudyTimeList = () => {

    const [page, setPage] = React.useState(1);
    const [studyList, setStudyList] = React.useState(1);
    const [studyClone, setStudyClone] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [openModal, setOepnModal] = React.useState(false);
    const { data, loading } = useSelector(state => state.getStudyTime);
    const perPage = 10;
    const firstRequest = useRef(false);
    const dispatch = useDispatch();
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(getStudyTime())
    }, [dispatch])

    useEffect(() => {
        setStudyList(data);
        setStudyClone(data);
    }, [data])



    const dir = t("direction") === "rtl"

    const handleOpenModal = () => setOepnModal(true)

    const handlePageChange = () => { }


    const handleSortChange = async (queryString) => {
        const res = await Http(`user/logIndex/studyTime?${queryString}`, {
            method: "get",
        });
        if (res.status === 200) {
            setStudyList(res?.data?.data);
        }

    }

    if (loading) {
        return <LoadingCore loading={loading} />
    }
    return (
        <>
            <Container maxWidth={"xl"} sx={{ margin: "30px auto" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "rgba(128, 5, 216, 0.9)",
                        padding: "14px 10px",
                        backdropFilter: "blur(5px)",
                        flexWrap: "wrap"
                    }}
                    style={{ borderTopLeftRadius: 9, borderTopRightRadius: 9 }}
                >
                    <Button oepnModal={openModal} setOepnModal={setOepnModal} onClick={handleOpenModal} sx={{ color: "#fff", "& > svg": { margin: "0 5px" } }} variant="outlined">
                        <EventNoteOutlined />
                        {t("Submit_StudyTime")}
                    </Button>
                    <Box>
                        <Filter
                            data={studyList?.data?.filters}
                            handleChange={handleSortChange}
                        />

                    </Box>
                </Box>
                {studyList?.data?.data?.data?.length > 0 ? (
                    <TableContainer sx={{ border: "1px solid #eee" }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">{t("Perـhour")}</TableCell>
                                    <TableCell align="right">{t("inـhistory")}</TableCell>
                                    <TableCell align="right">{t("status")}</TableCell>
                                    <TableCell align="right">{t("Admin")}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StudyTimeTableBody data={studyList?.data?.data?.data} />
                            </TableBody>
                        </Table>
                        {data?.data?.total > 10 && (
                            <PaginateCore>
                                <Pagination
                                    dir={dir ? "rtl" : "ltr"}
                                    page={page}
                                    onChange={handlePageChange}
                                    count={Math.ceil(
                                        studyList?.data?.total / studyList?.data?.per_page
                                    )}
                                    variant="outlined"
                                    color="primary"
                                    disabled={studyList?.data.total < 11}
                                />
                            </PaginateCore>
                        )}
                    </TableContainer>
                ): (
                    <NoData/>
                )}
            </Container>
            {openModal && <CreateStudyTime openModal={openModal} setOpenModal={setOepnModal} />}
        </>
    )
}

export default StudyTimeList
