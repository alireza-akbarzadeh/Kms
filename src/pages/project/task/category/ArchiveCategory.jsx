import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {showProjectTasks} from "redux/features/project/task/category/ShowProjectTaskSlice";
import {LoadingCore} from "core";
import TaskCategoryBody from "./TaskCategoryBody";
import {useParams} from "react-router-dom";
import {Restore} from "@mui/icons-material";
import {restoreProjectTasks} from "redux/features/project/task/category/RestoreProjectTaskSlice";
import _ from "lodash";

const ArchiveCategory = () => {
    const [categories, setCategories] = useState(null)
    const {data, loading} = useSelector((state) => state.showProjectTasksSlice);
    const dispatch = useDispatch();
    const {id} = useParams()
    useEffect(() => {
        const archive = 1;
        dispatch(showProjectTasks({id, archive}))
    }, [id, dispatch]);

    useEffect(() => {
        setCategories(data)
    }, [data]);


    const handleRestore = (categoryId) => {
        dispatch(restoreProjectTasks(categoryId))
            .then(res => {
                let newCategories = _.cloneDeep(categories);
                newCategories.data = _.remove(newCategories.data, function (item) {
                    return item.id !== categoryId
                })
                setCategories(newCategories)
            })
    }
    console.log(categories)
    return (
        <>
            {loading && <LoadingCore loading={loading}/>}
            <TaskCategoryBody data={categories} handleArchive={handleRestore} icon={<Restore/>} setCategories={setCategories} isArchive={true}/>
        </>

    );
}

export default ArchiveCategory
