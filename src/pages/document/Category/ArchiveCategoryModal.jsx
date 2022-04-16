import * as React from 'react';
import {useTranslation} from "react-i18next";
import ModalCore from "core/ModalCore";
import {Box, Button, Stack, Switch, Alert} from "@mui/material";
import {CoreBTN} from "core";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {CustomInput} from "components";
import addCategory, {AddCategory} from "redux/features/document/Category/addCategory";
import {useEffect, useState} from "react";
import {removeCategoryList} from "redux/features/document/Category/delete/removeCategory";
import documentRequirement from "Hook/useDocumentRequirement";
import Select from "react-select";

const AddDocumentModal = ({openModal, setOpenModal, data, mainData, handleFolderChange, id}) => {
    const [checked, setChecked] = React.useState(false);
    const [categories, setCategories] = useState(null)

    const [submit, setSubmit] = useState(false)
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const {loading, isSuccess} = useSelector((state) => state.AddCategorySlice)


    const requiredData = documentRequirement({
        categoriesStatus: true,
        tagsSStatus: false,
        usersStatus: false,
        teamsSStatus: false,
        projectsSStatus: false,
        tasksSStatus: false,
        drivesSStatus: false,
    });

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        if (isSuccess && submit) {
            setOpenModal(false)
        }
    }, [submit, isSuccess])

    const onSubmit = (e) => {
        e.preventDefault();
        const body = {
            new_category_id: categories?.value,
            move_docs: checked,
        }
        dispatch(removeCategoryList({id: data.id, data: body}))
            .then(res => {
                setSubmit(true)
                handleFolderChange(id, id, mainData?.parent?.type)
            })
        setSubmit(false)
    }
    return (<ModalCore
        title={t("Archive")}
        open={openModal}
        size={"700px"}
        setOpen={setOpenModal}>
        <form onSubmit={(e) => onSubmit(e)}>
            <Stack gap={1}>
                <Box>
                    <label style={{opacity: checked ? 0.5 : 1}}>
                        {t("Archive_Docs")}
                    </label>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{'aria-label': 'controlled'}}
                    />
                    <label style={{opacity: checked ? 1 : 0.5}}>
                        {t("Transfer_Doc")}
                    </label>
                </Box>
                <Box my={2}>
                    <Alert color={"info"} severity={checked ? "error" : "warning"}>
                        <p style={{margin: "0 6px"}}>
                            {checked ? t("Transfer_Doc_Description") : t("Archive_Doc_Description")}
                        </p>
                    </Alert>
                </Box>
            </Stack>
            {checked && (<Box>
                <Box mb={1}>
                    {t("DocCategory") + ' * '}
                </Box>
                <Select
                    className="React_select"
                    value={categories}
                    onChange={setCategories}
                    options={requiredData?.categories}
                    placeholder={t("Select")}
                />
            </Box>)}
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                mt={6}
            >
                <CoreBTN
                    fullWidth
                    disabled={checked && categories === null}
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
    </ModalCore>);
}
export default AddDocumentModal