import React, {useEffect, useState} from 'react'
import {ModalCore} from "core";
import {Button, Stack} from "@mui/material";
import {useForm} from "react-hook-form";
import {CustomInput} from "components";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import CoreBTN from "core/CoreBTN";
import {useDispatch, useSelector} from "react-redux";
import {storeCategoryTask} from "redux/features/project/task/category/storeCategoryTask";
import {showProjectTasks} from "../../../../redux/features/project/task/category/ShowProjectTaskSlice";

const StoreCategory = ({openModal, setOpenModal, id}) => {
    const [submit, setSubmit] = useState(false)
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const {isSuccess, loading} = useSelector((state) => state.storeCategoryTaskSlice);

    useEffect(() => {
        if (isSuccess && submit){
            setOpenModal(false)
        }
    }, [isSuccess, submit])

    const onSubmit = (data) => {
        dispatch(storeCategoryTask({
            project_id: id,
            title: data?.title
        })).then(res => {
            dispatch(showProjectTasks({id: id, archive: 0}))
            setSubmit(true)
        })
        setSubmit(false)
    }

    return (
        <ModalCore
            title={t('createTaskCategory')}
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

export default StoreCategory
