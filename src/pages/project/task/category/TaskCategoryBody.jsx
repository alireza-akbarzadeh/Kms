import ScrollContainer from "react-indiana-drag-scroll";
import {Box, Button, Chip, Container, IconButton} from "@mui/material";
import {Add, Archive, Edit, EditOutlined} from "@mui/icons-material";
import {GroupAvatar} from "components";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import UpdateCategory from "./UpdateCategory";
import {useParams} from "react-router-dom";
import StoreTask from "../taskes/StoreTask";
import {useSelector} from "react-redux";
import {CheckRole} from "helper";

const TaskCategoryBody = ({data, handleArchive, setCategories, icon = <Archive/>, isArchive = false, users}) => {
    const [openModal, setOpenModal] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [row, setRow] = useState(null)
    const {t} = useTranslation();
    const {id: projectId} = useParams();
    const {data: user} = useSelector((state) => state.user)
    const handleModal = (id) => {
        const index = data?.data?.findIndex((item) => item.id === id);
        setRow(data?.data[index])
        setOpenModal(true)
    }

    const createTask = (id) => {
        setShowForm({
            id: id, type: 'store', body: null, projectId: projectId
        })
    }

    const updateTask = (id, body = null) => {
        setShowForm({
            id: id, type: 'update', body: body, projectId: projectId
        })
    }

    return (<>
            {!showForm ? (<ScrollContainer horizontal={true} vertical={true} nativeMobileScroll={true}
                                           className="scroll-container">
                <Container maxWidth={"xl"}>
                    <Box sx={{width: 350, height: "100vh"}}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "start",
                            justifyContent: "space-between",
                            gap: 5,
                            width: "100%",
                            height: "100%",
                            flexDirection: "row"
                        }}>
                            {data?.data?.map((task) => (<Box sx={{

                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: 2,
                            }}>
                                <Box
                                    key={task.id}
                                    sx={{
                                        background: "#d5bfe4",
                                        borderTopRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                        width: "350px",
                                        display: "flex",
                                        padding: 1,
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}>
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        {CheckRole({
                                            roles: user?.data?.type, page: 'projects', part: 'update'
                                        }) && (<EditOutlined sx={{margin: '0 5px', cursor: 'pointer'}}
                                                             onClick={() => handleModal(task.id)}/>)}

                                        {task.title}
                                    </Box>
                                    {CheckRole({
                                        roles: user?.data?.type, page: 'projects', part: 'update'
                                    }) && (<IconButton onClick={() => handleArchive(task.id)}>
                                        {icon}
                                    </IconButton>)}
                                </Box>
                                {task?.tasks?.length === 0 ? <Box
                                    sx={{mt: 1}}>{t("We_Dont_Have_Any_Task_Yet")}</Box> : task?.tasks?.map((item) => (
                                    <Box key={item.id} sx={{
                                        width: "100%",
                                        display: "flex",
                                        padding: 1,
                                        justifyContent: "space-between",
                                        mt: 1,
                                        mb: 2,
                                        "&:not(:last-child)": {
                                            borderBottom: "1px solid  #e0e0e0",
                                        }
                                    }}>
                                        <Box sx={{
                                            display: "inline-flex", alignItems: "Center"
                                        }}>
                                           <IconButton onClick={() => updateTask(item.id, item)}>
                                                <Edit/>
                                            </IconButton>
                                            {item.title}
                                        </Box>
                                        <Box sx={{
                                            display: "flex", flexDirection: "column", alignItems: "end", gap: 2
                                        }}>
                                            <Box sx={{display: 'flex', flexDirection: 'row'}} gap={1}>
                                                {item?.document_id !== null && (
                                                    <Chip label={t('knowledgeTree')} color={'info'}/>
                                                )}
                                                <Chip label={item.active === 1 ? t("Active") : t("DeActive")}
                                                      sx={item.active === 1 ? {background: "#1ce087", color: "#fff"} : {
                                                          background: "", color: "#fff"
                                                      }}/>
                                            </Box>
                                            <GroupAvatar space={7} variant={"circular"} count={3}
                                                         data={item.users}/>
                                        </Box>
                                    </Box>))}
                                {!isArchive && (<>
                                    {CheckRole({
                                        roles: user?.data?.type, page: 'projects', part: 'update'
                                    }) && (<Button sx={{mt: 3}} variant={"outlined"}
                                                   onClick={() => createTask(task.id)}>
                                        <Add/>
                                    </Button>)}
                                </>)}

                            </Box>))}
                        </Box>
                    </Box>
                </Container>
                {openModal && <UpdateCategory openModal={openModal} setOpenModal={setOpenModal}
                                              data={row}
                                              setCategories={setCategories}
                                              mainData={data}/>}
            </ScrollContainer>) : (<StoreTask users={users} data={showForm} setShowForm={setShowForm}/>)}
        </>

    )
}

export default TaskCategoryBody