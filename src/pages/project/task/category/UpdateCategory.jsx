import React, {useEffect, useState} from 'react'
import {ModalCore} from "core";
import {Button, Stack, Switch, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {CustomInput} from "components";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import CoreBTN from "core/CoreBTN";
import {useDispatch, useSelector} from "react-redux";
import {updateCategoryTask} from "redux/features/project/task/category/updateCategoryTask";
import _ from 'lodash'

const UpdateCategory = ({openModal, setOpenModal, data, setCategories, mainData}) => {
    const [submit, setSubmit] = useState(false)
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();
    const {isSuccess, loading} = useSelector((state) => state.updateCategoryTaskSlice);


    useEffect(() => {
        if (isSuccess && submit) {
            setOpenModal(false)
        }
    }, [isSuccess, submit])

    setValue('title', data?.title)

    const onSubmit = (req) => {
        let body = {
            title: req?.title
        }

        dispatch(updateCategoryTask({
            id: data?.id,
            data: body
        }))
            .then(res => {
                let newData = _.cloneDeep(mainData)
                const index = newData?.data?.findIndex((item) => item.id === data?.id)
                newData.data[index] = {...data, title: req?.title};
                setCategories(newData)
                setSubmit(true)
            })
        setSubmit(false)
    }

    return (
        <ModalCore
            title={t('Edit')}
            open={openModal}
            setOpen={setOpenModal}
            size='400px'
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction={'column'} spacing={2}>
                    <CustomInput
                        errors={errors}
                        register={register}
                        title={t('Title')}
                        field='title'
                        required={true}
                    />
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        mt={4}
                    >
                        <CoreBTN
                            loading={loading}
                            sx={{borderRadius: 15, padding: "5px 12px", width: "100%"}}
                            variant={"contained"}
                            color={"primary"}
                            title={t("Confirmation")}
                            type={"submit"}
                        />
                        <Button
                            sx={{borderRadius: 15, padding: "5px 12px", margin: "0 15px"}}
                            variant={"contained"}
                            color={"secondary"}
                            fullWidth
                            onClick={() => setOpenModal(false)}
                        >
                            {t("Cancel")}
                        </Button>
                    </Box>
                </Stack>


            </form>
        </ModalCore>
    )
}

export default UpdateCategory
