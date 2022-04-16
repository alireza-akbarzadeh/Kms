import React, {useEffect, useRef, useState} from "react";
import DocumentList from "./DocumentList";
import {useDispatch, useSelector} from "react-redux";
import {categoryList} from "redux/features/document/Category/CategoryListSlice";
import {Backdrop, Button, Container, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import noDocImg from 'assets/noDocument.png'
import {FirstLoadingCore, LoadingCore} from "core";
import {showCategoryList} from "redux/features/document/Category/showCategory";
import {Add} from "@mui/icons-material";
import AddCategoryModal from "./Category/AddCategoryModal";
import {CheckRole} from "../../helper";

const Document = () => {
    const [noFolder, setNoFolder] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [data, setData] = useState(null)
    const [lastId, setLastId] = useState(null)
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const ref = useRef(false)
    const {t} = useTranslation()
    const {data: user} = useSelector((state) => state.user)
    const {data: subCategories, loading: subCategoriesLoading} = useSelector((state => state.showCategoryListSlice))
    const {data: categoriesData, loading} = useSelector((state) => state.categoryListSlice)
    useEffect(() => {
        if (!ref.current) {
            dispatch(categoryList({withDoc: false}))
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
                    document_category_id: null, type: 'main'
                }, directories: [], documents: {
                    data: [], filters: null
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
            dispatch(categoryList({withDoc: false}))
        } else if (type === 'main' && lastIdReq === null && id !== null) {
            setLastId(id)
            if (id === 0) {
                dispatch(categoryList({withDoc: false}))
            } else {
                dispatch(showCategoryList(id))
            }
        } else if (type === 'sub' && lastIdReq === null && id === null) {
            setLastId(0)
            dispatch(categoryList({withDoc: false}))
        } else {
            if (lastIdReq === null) {
                setLastId(0)
                dispatch(categoryList({withDoc: false}))
            } else {
                setLastId(lastIdReq)
                dispatch(showCategoryList(id))
            }
        }
    }

    useEffect(() => {
        if (loading && !noFolder) {
            ref.current = true
        }
    }, [loading, categoriesData, noFolder])


    return (!ref.current && loading) ? <FirstLoadingCore loading={loading}/> :
        (<>
            {loading && <LoadingCore loading={loading}/>}
            {!noFolder ? (<DocumentList id={lastId} currentId={currentId} data={data} loading={subCategoriesLoading}
                                        handleFolderChange={handleFolderChange}/>) : (
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
                        <img src={noDocImg} alt={'No Document'}/>
                        <Typography mt={5}>
                            {t('noDocumentMessage')}
                        </Typography>
                        {CheckRole({roles: user?.data?.type, page: 'document', part: 'side'}) && (
                            <Button variant={'contained'}
                                    color={'primary'}
                                    sx={{marginTop: '10px'}}
                                    onClick={() => setOpenModal(true)}>
                                <Add/>
                                {t('addCategory')}
                            </Button>
                        )}
                    </Box>
                </Container>)}
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
        </>)

};
export default Document;
