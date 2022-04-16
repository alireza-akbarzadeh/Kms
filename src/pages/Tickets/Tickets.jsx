import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, useMediaQuery, useTheme, } from "@mui/material";
import { useTranslation } from "react-i18next";
import EmptyTicket from "./EmptyTicket";
import TicketList from "./TicketList";
import AttentionBox from "./AttentionBox";
import TicketForm from "./TicketForm";
import TicketHeader from "./TicketHeader";
import TicketTableHeader from "./TickeTabletHeader";
import { getTicket } from "redux/features/ticket/tickets";
import { Http } from "helper/Http";
import LoadingCore from "core/LoadingCore";

const Tickets = () => {
    const [showForm, setShowForm] = useState(false);
    const [ticketList, setTicketList] = useState(null);
    const [ticketListClone, setTicketListClone] = useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");

    const { data, loading } = useSelector((state) => state.getTickets);
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const { t } = useTranslation();
    const firstRequest = useRef(false);


    useEffect(() => {
        dispatch(getTicket())
    }, [dispatch])

    useEffect(() => {
        if (data !== undefined) {
            setTicketList(data);
            setTicketListClone(data);
        }
    }, [data])

    ////Handle Search
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm !== "") {
                const res = await Http(`ticket?search=${searchTerm}`, {
                    method: "get",
                });
                if (res.status === 200) {
                    setTicketList(res?.data?.data);
                }
            } else {
                if (firstRequest.current) {
                    setTicketList(ticketListClone)
                } else {
                    firstRequest.current = true;
                }

            }
        }, 2000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);
    const handlePageChange = async (event, value) => {
        setPage(value);
        const res = await Http(
            `ticket?page=${value}`,
            {
                method: "get",
            }
        );
        if (res.status === 200) {
            setTicketList(res?.data?.data);
        }
    };

    if (loading) {
        return <LoadingCore loading={loading} />
    }

    return (
        <Container
            maxWidth={"lg"}
            sx={
                theme.palette.mode === "dark"
                    ? { background: "#121212" }
                    : { background: "#f9f9f9" }
            }
        >
            {showForm ? (
                <Grid container justifyContent="space-between" marginTop={"10px"}>
                    <Grid
                        sx={matches && { marginBottom: "25px" }}
                        xs={matches ? 12 : 5}
                        md={matches ? 5 : 7.5}
                    >
                        <TicketHeader showForm={setShowForm} showFlag={showForm} />
                        <TicketForm showForm={setShowForm} />
                    </Grid>
                    <AttentionBox />
                </Grid>
            ) : ticketList === null ? (
                <Grid container justifyContent="space-between" marginTop={"10px"}>
                    <Grid
                        sx={matches && { marginBottom: "25px" }}
                        xs={matches ? 12 : 5}
                        md={matches ? 5 : 7.5}
                    >
                        <TicketHeader showForm={setShowForm} showFlag={showForm} />
                        <EmptyTicket showForm={setShowForm} />
                    </Grid>
                    <AttentionBox />
                </Grid>
            ) : (
                <Grid container justifyContent="space-between" marginTop={"10px"}>
                    <TicketTableHeader setSearchTerm={setSearchTerm} matches={matches} setShowForm={setShowForm} />
                    <TicketList mainData={ticketList} handlePageChange={handlePageChange} page={page} />
                </Grid>
            )}
        </Container>
    );
};

export default Tickets;
