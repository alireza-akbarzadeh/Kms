import {useTranslation} from "react-i18next";
import {CoreBTN, ModalCore} from "core";
import {Box, Button, Typography} from "@mui/material";
import * as React from "react";
import styled from "styled-components";
import article from 'assets/article.png'
import wiki from 'assets/wiki.png'
import {Article} from "@mui/icons-material";
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {AddCategory} from "../../redux/features/document/Category/addCategory";
import {CustomInput} from "../index";
import {categoryList} from "../../redux/features/document/Category/CategoryListSlice";

const AddDocModal = ({openModal, setOpenModal, category}) => {
    const [submit, setSubmit] = useState(false)
    const [add, setAdd] = useState(false)
    const {t} = useTranslation()
    const history = useHistory()
    const dispatch = useDispatch()
    const {loading, isSuccess} = useSelector((state) => state.AddCategorySlice)

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = (req) => {
        const body = {type: 'sub', document_category_id: category?.id, title: req?.title}
        dispatch(AddCategory({data: body}))
            .then(res => {
                setSubmit(true)
                dispatch(categoryList({withDoc: true}))
            })
        setSubmit(false)
    }

    useEffect(() => {
        if (isSuccess && submit) {
            setOpenModal(false)
        }
    }, [submit, isSuccess])


    return (<>
        <ModalCore
            title={t("AddDocument")}
            open={openModal}
            size="400px"
            setOpen={setOpenModal}
        >
            {!add ? (
                <>
                    <Item color="#dac1f3" onClick={() =>
                        history.push({
                            pathname: '/document/store-article',
                            state: {
                                category: category
                            }
                        })
                    }>
                        <Article sx={{marginX: '5px'}}/>
                        <Typography component={"p"}>
                            {t("SimpleArticle")}
                        </Typography>
                    </Item>
                    <Item color="rgba(255, 200, 0, 0.52)" onClick={() =>
                        history.push({
                            pathname: '/document/store-wiki',
                            state: {
                                category: category
                            }
                        })
                    }>
                        <Article sx={{marginX: '5px'}}/>
                        <Typography component={"p"}>
                            {t("SimpleWiki")}
                        </Typography>
                    </Item>
                    <Item color="rgba(28, 224, 135, 0.41)" onClick={() => setAdd(true)}>
                        <Article sx={{marginX: '5px'}}/>
                        <Typography component={"p"}>
                            {t("AddCategory")}
                        </Typography>
                    </Item>
                </>
            ) : (
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
                            onClick={() => setAdd(false)}
                        >
                            {t("Back")}
                        </Button>

                    </Box>
                </form>
            )}

        </ModalCore>
    </>)
}
export default AddDocModal


const Item = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 25px 50px;
  margin: 30px;
  background-color: ${({color}) => color && color};
`;
