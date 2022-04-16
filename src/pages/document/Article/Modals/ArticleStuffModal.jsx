import React, {useEffect, useState} from 'react';
import {ModalCore} from "core";
import {Box, Button, Typography} from "@mui/material";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import CoreBTN from "core/CoreBTN";
import Select from "react-select";
import {NoData} from "components";
import {useDispatch, useSelector} from "react-redux";
import {UpdateDocument} from "redux/features/document/UpdateDocumentSlice";
import {showArticle} from "../../../../redux/features/document/article/showArticelSlice";

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


const StaticArticleModal = ({id, openModal, setOpenModal, requiredData}) => {
    const [submit, setSubmit] = useState(false)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const {loading, isSuccess} = useSelector((state) => state.UpdateDocumentSlice)
    const [values, setValues] = useState(null)

    useEffect(() => {
        let newValues = null;
        switch (openModal.type) {
            case 'tag' :
                newValues = openModal?.data?.map((item) => {
                    return {
                        label: item?.title,
                        value: item?.id
                    };
                })
                break;
            case 'task' :
                newValues = openModal?.data?.map((item) => {
                    return {
                        label: item?.title,
                        value: item?.id
                    };
                })
                break;
            case 'project' :
                newValues = openModal?.data?.map((item) => {
                    return {
                        label: item?.title,
                        value: item?.id
                    };
                })
                break;
            case 'drive' :
                newValues = openModal?.data?.map((item) => {
                    return {
                        label: item?.title,
                        value: item?.id
                    };
                })
                break;
        }
        if (newValues?.length > 0) {
            setValues(newValues)
        }
    }, [openModal])


    const makeSelect = (type, title, data) => {
        return <>
            <Typography>
                {t(title)}
            </Typography>
            {data.length > 0 ? (
                <Select
                    className="React_select"
                    isMulti
                    value={values}
                    onChange={setValues}
                    options={data}
                    placeholder={t("Select")}
                />
            ) : (
                <NoData/>
            )}
        </>
    }

    const setData = () => {
        let body = {
        }
        switch (openModal.type) {
            case 'tag' :
                body.tags = values?.map((item) => {
                    return item.value
                })
                break;
            case 'task' :
                body.tasks = values?.map((item) => {
                    return item.value
                })
                break;
            case 'project' :
                body.projects = values?.map((item) => {
                    return item.value
                })
                break;
            case 'drive' :
                body.drives = values?.map((item) => {
                    return item.value
                })
                break;
        }

        dispatch(UpdateDocument({
            id: id,
            data: body
        }))
            .then(res => {
                setSubmit(true)
                dispatch(showArticle({id: id}))
            })
        setSubmit(false)
    }

    return (
        <>
            <ModalCore
                title={t("Edit")}
                open={openModal.status}
                size="600px"
                setOpen={setOpenModal}
            >
                <Box>
                    {openModal.type === 'tag' && makeSelect('tag', 'DocTags', requiredData.tags)}
                    {openModal.type === 'task' && makeSelect('task', 'DocTasks', requiredData.tasks)}
                    {openModal.type === 'project' && makeSelect('project', 'DocProjects', requiredData.projects)}
                    {openModal.type === 'drive' && makeSelect('drive', 'DocDrives', requiredData.drives)}
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mt={4}
                >
                    <CoreBTN
                        sx={{borderRadius: 15, padding: "5px 12px", width: "100%"}}
                        variant={"contained"}
                        color={"primary"}
                        title={t("Confirmation")}
                        onClick={setData}
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

            </ModalCore>
        </>
    );
};

export default StaticArticleModal;
