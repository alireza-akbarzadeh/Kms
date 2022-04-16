import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {showProjectTasks} from "redux/features/project/task/category/ShowProjectTaskSlice";
import {LoadingCore} from "core";
import {archiveProjectTasks} from "redux/features/project/task/category/ArchiveTaskSlice";
import TaskCategoryBody from "./TaskCategoryBody";
import _ from 'lodash'
import {NoData} from "components";

const GetCategoryLIst = ({id, users}) => {
    const [categories, setCategories] = useState(null)
    const {data, loading} = useSelector((state) => state.showProjectTasksSlice);
    const dispatch = useDispatch();
    useEffect(() => {
        const archive = 0;
        dispatch(showProjectTasks({id, archive}))
    }, [id, dispatch]);

    useEffect(() => {
        setCategories(data)
    }, [data]);


    const handleArchive = (categoryId) => {
        dispatch(archiveProjectTasks(categoryId))
            .then(res => {
                let newCategories = _.cloneDeep(categories);
                newCategories.data = _.remove(newCategories.data, function (item) {
                    return item.id !== categoryId
                })
                setCategories(newCategories)
            })
    }

    return (
        <>
            {loading && <LoadingCore loading={loading}/>}
            {categories?.data?.length > 0 ? (
                <>
                    <TaskCategoryBody data={categories} handleArchive={handleArchive} setCategories={setCategories}
                                      users={users}/>
                </>
            ) : (
                <NoData/>
            )}
        </>

    );
}
export default GetCategoryLIst
