import React from "react";
import {Box, Typography} from "@mui/material";
import {ModalCore} from "core";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import AccessTime from '@mui/icons-material/AccessTime';

const Contain = styled.div(props => ({
    background: props.background,
    height: 100,
    width: '100%',
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "0 20px",
    margin: "25px 0",
    borderRadius: 55
}));
const UpdateResources = ({openModal, setOpenModal, data}) => {
    const {t} = useTranslation();

    return (<>
            <ModalCore
                title={t("Timing")}
                open={openModal}
                size="600px"
                setOpen={setOpenModal}
            >
                <Box>
                    <Contain background={"#dac1f3"}>
                        <Typography className={"alignMent"}>
                            <AccessTime/>
                            {t("start_time")}
                        </Typography>
                        <Typography>
                            {data?.start_time}
                        </Typography>
                    </Contain>
                    <Contain background={"rgba(255, 200, 0, 0.52)"}>
                        <Typography className={"alignMent"}>
                            <AccessTime/>
                            {t("estimated_time")}
                        </Typography>
                        <Typography>
                            {data?.estimated_time}
                        </Typography>
                    </Contain>
                    <Contain background={"rgba(28, 224, 135, 0.41)"}>
                        <Typography className={"alignMent"}>
                            <AccessTime/>
                            {t("end_time")}
                        </Typography>
                        <Typography>
                            {data?.end_time}
                        </Typography>
                    </Contain>
                </Box>
            </ModalCore>
        </>
    );
};
export default UpdateResources;