import React, {useEffect, useState} from 'react';
import ModalCore from "core/ModalCore";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import {CustomInput} from "components";
import styled from "styled-components";
import {CoreBTN} from "core";
import {useDispatch, useSelector} from "react-redux";
import {storeTags, storeTagsSlice} from "redux/features/document/tags/StoreTagsSlice";
import {getTags} from "../../../redux/features/document/tags/getTagsListSLice";


const StoreTags = ({openModal, setOpenModal}) => {
    const [submit, setSubmit] = useState(false)

    const {t} = useTranslation()
    const [color, setColor] = useState(null)
    const dispatch = useDispatch()
    const {isSuccess, loading} = useSelector((state) => state.storeTagsSlice)

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        if (isSuccess && submit) {
            setOpenModal(false)
        }
    }, [isSuccess, submit])

    const onSubmit = (data) => {
        const req = {
            title: data.title,
            color: color
        }
        dispatch(storeTags(req))
            .then(res => {
                setSubmit(true)
                dispatch(getTags({isPaginate: true}));
            })
        setSubmit(false)
    }

    return (
        <ModalCore
            title={t("StoreTag")}
            size="500px"
            open={openModal}
            setOpen={setOpenModal}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction={'column'} spacing={5}>
                    <CustomInput
                        errors={errors}
                        register={register}
                        title={t("Title")}
                        field={'title'}
                        required={true}
                    />
                    <ColorPicker>
                        <Grid container spacing={2}>
                            <Grid xs={6} md={6}>
                                <Typography sx={{margin: '0 10px'}}>
                                    {t('tagColor')}
                                </Typography>
                            </Grid>
                            <Grid xs={6} md={6}>
                                <input
                                    className={"ColorPicker"}
                                    onChange={(e) => setColor(e.target.value)}
                                    type="color"
                                    id="color"
                                    name="color"
                                    value={color}
                                />
                            </Grid>
                        </Grid>
                    </ColorPicker>
                </Stack>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mt={6}
                >
                    <CoreBTN
                        fullWidth
                        loading={loading}
                        sx={{borderRadius: 15, padding: "5px 12px"}}
                        variant={"contained"}
                        color={"primary"}
                        type={"submit"}
                        title={t("Confirmation")}
                        disabled={color === null}
                    />
                    <Button
                        fullWidth
                        sx={{
                            borderRadius: 15, padding: "5px 12px", margin: "0 15px",
                        }}
                        variant={"contained"}
                        color={"secondary"}
                        onClick={() => setOpenModal(false)}
                    >
                        {t("Cancel")}
                    </Button>

                </Box>
            </form>
        </ModalCore>
    );
};

export default StoreTags;

const ColorPicker = styled.div`
  .ColorPicker {
    width: 100px;
    cursor: pointer;
  }
`;