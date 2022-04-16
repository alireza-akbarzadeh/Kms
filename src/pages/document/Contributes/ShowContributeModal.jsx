import React from 'react';
import {ModalCore} from "core";
import {Box, Button, Chip, Container, Divider, Typography} from "@mui/material";
import {Header} from "../Article/Article-Styled";
import {Avatar} from "components";

const ShowContributeModal = ({openModal, setOpenModal, t, dir}) => {
    return (
        <ModalCore
            title={t("Detail")}
            open={openModal}
            size="1200px"
            setOpen={setOpenModal}
        >
            <Box sx={{
                display: 'flex', margin: '30px', justifyContent: 'space-between', flexWrap: "wrap"
            }}>

                <Header>
                    <Box sx={{display: "inline-flex", alignItems: "center", gap: 2, marginBottom: '10px'}}>
                        <Typography fontWeight={"bold"} component={"h3"} variant={"h5"}>
                            {openModal?.title}
                        </Typography>
                        <Chip label={<Typography>
                            {openModal?.user?.first_name + ' ' + openModal?.user?.last_name}
                        </Typography>}
                              avatar={<Avatar address={openModal?.user?.avatar}/>}
                              sx={{padding: '0 5px'}}
                              variant={"outlined"}/>
                    </Box>
                </Header>
                <Box sx={{display: "inline-flex", gap: 1, mt: 1}}>
                    <Typography>
                        {t("Description")}
                    </Typography>
                    :<Typography fontWeight={400} fontSize={14}
                                 lineHeight={1.9}>{openModal?.description}</Typography>
                </Box>
                <Divider sx={{margin: '10px 0'}}/>
                <Box sx={dir ? {
                    maxHeight: '50vh', overflowY: 'auto', direction: 'ltr', padding: '20px'
                } : {
                    maxHeight: '50vh', overflowY: 'auto', direction: 'rtl', padding: '20px'
                }}>
                    <div className={"body__Html"} dangerouslySetInnerHTML={{__html: `${openModal?.body}`}}/>
                </Box>

            </Box>
        </ModalCore>
    );
};

export default ShowContributeModal;