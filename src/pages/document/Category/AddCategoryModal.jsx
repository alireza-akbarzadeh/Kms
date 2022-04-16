import * as React from 'react';
import {useTranslation} from "react-i18next";
import ModalCore from "core/ModalCore";
import {Box, Button} from "@mui/material";
import {CoreBTN} from "core";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CustomInput} from "components";
import addCategory, {AddCategory} from "redux/features/document/Category/addCategory";
import {useEffect, useState} from "react";


const AddDocumentModal = ({openModal, setOpenModal, data, mainData, handleFolderChange, id}) => {
    const [submit, setSubmit] = useState(false)
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const {loading, isSuccess} = useSelector((state) => state.AddCategorySlice)
    const {data: user} = useSelector((state) => state.user)
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        if (isSuccess && submit) {
            setOpenModal(false)
        }
    }, [submit, isSuccess])

    const onSubmit = (req) => {
        const body = {...data, title: req?.title}
        dispatch(AddCategory({data: body}))
            .then(res => {
                setSubmit(true)
                handleFolderChange(id, id, mainData?.parent?.type)
            })
        setSubmit(false)
    }


    return (
        <ModalCore
            title={t("addCategory")}
            open={openModal}
            setOpen={setOpenModal}>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                    errors={errors}
                    register={register}
                    title={t('Title')}
                    field={'title'}
                    placeholder={t('category')}
                    required={true}
                />
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
}
export default AddDocumentModal