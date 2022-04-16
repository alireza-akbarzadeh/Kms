import {Groups, Article, Archive, Add, Task} from '@mui/icons-material'
import {Item} from 'core'
import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import { useHistory, useLocation, useParams} from 'react-router-dom'
import {SidebarItem} from "../index";
import {Divider} from "@mui/material";
import {AppContext} from "context/AppContext";
import StoreCategory from "pages/project/task/category/StoreCategory";

const ProjectSide = () => {
    const [openModal, setOpenModal] = useState(false)
    const {t} = useTranslation();
    const history = useHistory();
    const {projectTaskPage, setProjectTaskPage} = React.useContext(AppContext);
    const {pathname} = useLocation()
    const {id} = useParams()

    let projectId = 0
    if (pathname.split('/')[1] === 'archive-tasks') {
        projectId = id
    } else {
        projectId = projectTaskPage
    }
    const dir = t("direction") === "rtl";
    return (
        <>
            <Divider sx={{margin: '5px 0 7px 0'}}/>
            <Item>
                <SidebarItem text={t("project")} icon={<Article/>} onClick={() => history.push('/projects')}/>
            </Item>
            <Item>
                <SidebarItem text={t("teams")} icon={<Groups/>} onClick={() => history.push('/teams')}/>
            </Item>
            {pathname.split('/')[1] === 'archive-tasks' ? (
                <>
                    <Divider sx={{margin: '5px 0 7px 0'}}/>
                    <Item>
                        <SidebarItem text={t("ProjectTasks")} icon={<Task/>}
                                     onClick={() => {
                                         setProjectTaskPage(false)
                                         history.push(`/project/${projectId}`)
                                     }}/>
                    </Item>
                    <Item>
                        <SidebarItem text={t("createTaskCategory")} icon={<Add/>} onClick={() => setOpenModal(true)}/>
                    </Item>
                </>
            ) : (
                <>
                    {pathname.split('/')[1] === 'project' && (
                        <>
                            <Divider sx={{margin: '5px 0 7px 0'}}/>
                            <Item>
                                <SidebarItem text={t("Archives")} icon={<Archive/>}
                                             onClick={() => history.push(`/archive-tasks/${projectId}`)}/>
                            </Item>
                            <Item>
                                <SidebarItem text={t("createTaskCategory")} icon={<Add/>} onClick={() => setOpenModal(true)}/>
                            </Item>
                        </>
                    )}
                </>
            )}
            {openModal && <StoreCategory openModal={openModal} setOpenModal={setOpenModal} id={projectTaskPage}/>}
        </>
    )
}

export default ProjectSide

