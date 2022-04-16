import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {LoadingCore} from "core";
import DocumentList from "./DocumentList";
import {Container, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import noDocImg from "assets/noDocument.png";
import AddCategoryModal from "./Category/AddCategoryModal";
import {getDeletedCategoryShow} from "redux/features/document/Category/delete/deleteCategoryShow";
import {getDeletedCategoryList} from "redux/features/document/Category/delete/deleteCategoryList";

const Archives = () => {
    const [noFolder, setNoFolder] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [data, setData] = useState(null)
    const [lastId, setLastId] = useState(null)
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const ref = useRef(false)
    const {t} = useTranslation()
    const {
        data: subCategories,
        loading: subCategoriesLoading
    } = useSelector((state) => state.getDeletedCategoryShowSlice)
    const {data: categoriesData, loading} = useSelector((state) => state.getDeletedCategoryListSlice)
    useEffect(() => {
        if (!ref.current) {
            dispatch(getDeletedCategoryList({}))
            ref.current = true
        }
    }, [])

    useEffect(() => {
        setData(subCategories)
    }, [subCategories])

    useEffect(() => {
        setLastId(null)
        if (!categoriesData?.data?.length) {
            setNoFolder(true)
        } else {
            const newData = {
                parent: {
                    document_category_id: null,
                    type: 'main'
                },
                directories: [],
                documents: {
                    data: [],
                    filters: null
                },
            }
            categoriesData?.data?.map((item) => {
                newData.directories.push(item)
            })
            setData(newData)
            setNoFolder(false)
        }
    }, [categoriesData])


    const handleFolderChange = (id, lastIdReq, type = 'sub') => {
        if (type === 'main' && lastIdReq === null && id === null) {
            setLastId(0)
            dispatch(getDeletedCategoryList({}))
        } else if (type === 'main' && lastIdReq === null && id !== null) {
            setLastId(id)
            if (id === 0) {
                dispatch(getDeletedCategoryList({}))
            } else {
                dispatch(getDeletedCategoryShow(id))
            }
        } else if (type === 'sub' && lastIdReq === null && id === null) {
            setLastId(0)
            dispatch(getDeletedCategoryList({}))
        } else {
            if (lastIdReq === null) {
                setLastId(0)
                dispatch(getDeletedCategoryList({}))
            } else {
                setLastId(lastIdReq)
                dispatch(getDeletedCategoryShow(id))
            }
        }
    }

    return (
        <>
            {loading && <LoadingCore loading={loading}/>}
            {!noFolder ? (
                <DocumentList id={lastId} currentId={currentId} data={data} loading={subCategoriesLoading}
                              handleFolderChange={handleFolderChange} archive={true}/>
            ) : (
                <Container maxWidth={'lg'} sx={{height: '100%'}}>
                    <Box sx={{
                        height: '100%',
                        display: 'flex',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 'auto',
                        flexDirection: 'column'
                    }}>
                        <img src={noDocImg} alt={'No Archive Exists'}/>
                        <Typography mt={5}>
                            {t('noArchiveMessage')}
                        </Typography>
                    </Box>
                </Container>
            )}
            <AddCategoryModal openModal={openModal}
                              setOpenModal={setOpenModal}
                              data={{type: 'main'}}
                              mainData={{
                                  parent: {
                                      type: 'main'
                                  }
                              }}
                              id={null}
                              handleFolderChange={handleFolderChange}/>
        </>
    )
};

export default Archives;