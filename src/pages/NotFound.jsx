import {  Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Link } from "react-router-dom"
const NotFound = () => {
    const { t } = useTranslation();
    return (
        <Wrapper>
            <Stack direction={"row"} spacing={2}>
                <Typography variant='h4' sx={{ margin: "0 10px" }}>404</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant='h4' sx={{ margin: "0 10px" }}>NotFound</Typography>
            </Stack>
            <Typography variant='h5' sx={{ marginTop: 3, textTransform: "capitalize" }} component={"p"}>The Page you Lookin for Its not exist or Removed</Typography>
            {/* <BACkTOHOME to="/dashboard" >
                {t("Home")}
            </BACkTOHOME> */}
        </Wrapper>
    );
};

export default NotFound;


const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100%;

`;

