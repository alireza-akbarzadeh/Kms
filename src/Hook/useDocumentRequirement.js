import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {categoryList} from "redux/features/document/Category/CategoryListSlice";
import {getAllUserList} from "redux/features/drive/getAllUserList";
import {getTeamsList} from "redux/features/project/Teams/getTeamList";
import {getProjectList} from "redux/features/project/ProjectListSlice";
import {IndexTask} from "redux/features/project/task/IndexTask";
import {getDriveList} from "redux/features/drive/getDriveList";
import {getTags} from "redux/features/document/tags/getTagsListSLice";
import {useTranslation} from "react-i18next";

const useDocumentRequirement = ({
                                    categoriesStatus = true,
                                    tagsSStatus = true,
                                    usersStatus = true,
                                    teamsSStatus = true,
                                    projectsSStatus = true,
                                    tasksSStatus = true,
                                    drivesSStatus = true
                                }) => {
    const dispatch = useDispatch();
    const ref = useRef(false);
    const {t} = useTranslation();

    const {data: categoriesData} = useSelector(
        (state) => state.categoryListSlice
    );
    const {data: usersData} = useSelector((state) => state.AllUserList);
    const {data: teamsData} = useSelector((state) => state.TeamsList);
    const {data: projectsData} = useSelector((state) => state.projectList);
    const {data: tasksData} = useSelector((state) => state.IndexTaskSlice);
    const {data: drivesData} = useSelector((state) => state.getDriveList);
    const {data: tagsData} = useSelector((state) => state.getTagsSlice);

    useEffect(() => {
        if (!ref.current) {
            if (categoriesStatus) {
                dispatch(categoryList({withDoc: true}));
            }
            if (tagsSStatus) {
                dispatch(getTags({isPaginate: false}));
            }
            if (usersStatus) {
                dispatch(getAllUserList({isPaginate: false}));
            }
            if (teamsSStatus) {
                dispatch(getTeamsList({isPaginate: false}));
            }
            if (projectsSStatus) {
                dispatch(getProjectList({isPaginate: false}));
            }
            if (tasksSStatus) {
                dispatch(IndexTask({isPaginate: false}));
            }
            if (drivesSStatus) {
                dispatch(getDriveList({isPaginate: false}));
            }
            ref.current = true;
        }
    }, []);

    const categories =
        categoriesData?.data?.length > 0 && makeRecursiveData(categoriesData?.data);
    const tags = tagsData?.data?.length > 0 && makeNormalData(tagsData?.data);
    const users =
        usersData?.data?.data?.length > 0 &&
        makeNormalData(usersData?.data?.data, "name");
    const teams =
        teamsData?.data?.data?.length > 0 && makeNormalData(teamsData?.data?.data);
    const projects =
        projectsData?.data?.length > 0 && makeNormalData(projectsData?.data);
    const tasks = tasksData?.length > 0 && makeNormalData(tasksData, "task");
    const drives =
        drivesData?.data?.data?.length > 0 &&
        makeNormalData(drivesData?.data?.data);
    const visibility = [
        {label: t("owner"), value: "owner"},
        {
            label: t("Forـall"),
            value: "everyone",
        },
        {label: t("customer"), value: "customer"},
        {label: t("members"), value: "members"},
        {
            label: t("teams"),
            value: "teams",
        },
    ];

    return {
        categories,
        tags,
        users,
        teams,
        projects,
        tasks,
        drives,
        visibility,
    };
};

export default useDocumentRequirement;

const makeNormalData = (data, type = "title") => {
    if (type === "title") {
        return data?.map((item) => {
            return {
                label: item.title,
                value: item.id,
            };
        });
    } else if (type === "task") {
        return data?.map((item) => {
            return {
                label:
                    item.title + " ( " + item.description.substring(0, 10) + " ... )",
                value: item.id,
            };
        });
    } else {
        return data?.map((item) => {
            return {
                label: item.first_name + " " + item.last_name,
                value: item.id,
                type: item?.type
            };
        });
    }
};

const makeRecursiveData = (data) => {
    let result = [];
    data?.map((item) => {
        if (item.subCategories.length > 0) {
            result.push({
                label: item.title,
                value: item.id,
            });
            result.push(...makeRecursiveData(item.subCategories));
        } else {
            result.push({
                label: item.title,
                value: item.id,
            });
        }
    });
    return result;
};
