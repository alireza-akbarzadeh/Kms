import {combineReducers} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthReducer from "./features/Auth/signInSlice";
import SingReducer from "./features/Auth/singupSlice";
import signUpEmployeeSlice from "./features/Auth/singupEmployeeSlice";
import checkUserSlice from "./features/Auth/checkUniqSlice";
import customerTypesSlice from "./features/Auth/checkTypeSlice";
import checkUniqEmailSlice from "./features/Auth/checkUniqEmailSlice";
import checkUniqMobileSlice from "./features/Auth/checkUniqMobileSlice";
import singOutSlice from "./features/Auth/singOutSlice";
import NotificationSlice from "./features/users/notification";
import userSlice from "./features/users/userSlice";
import setArrivalTimeSlice from "./features/users/setArrivalTimeSlice";
import userExitSlice from "./features/users/userExitSlice";
import VacationSlice from "./features/users/vacation";
import resetPassSlice from "./features/users/resetPassSlice";
import resetUserNameSlice from "./features/users/resetUserNameSlice";
import userListSlice from "./features/users/getUserSlice";
import forgotPassSlice from "./features/Auth/forgotpassSlice";
import setPassSlice from "./features/Auth/setPasswordSlice";
import userArrivalDateSlice from "./features/users/userArrivalDateSlice";
import updateUserRolesSlice from "./features/users/updateUserRolesSlice";
import getUserArrivalDateSlice from "./features/users/getArrivalDateSlice";
import leaveRequestSlice from "./features/mange/LeaveRequsetSlice";
import acceptVacationSlice from "./features/mange/acceptVacationSlice";
import rejectVacationSlice from "./features/mange/rejectVacationSlice";
import LeaveRequsetDetailstSlice from "./features/mange/LeaveRequsetDetailstSlice";
import checkLeaveRequestSlice from "./features/mange/checkLeaveRequestSlice";
import userAcceptVacationSlice from "./features/mange/userAcceptVacationSlice";
import userRejectVacationSlice from "./features/mange/userRejectVacationSlice";
import userVacationCeilingSlice from "./features/mange/vacationCeiling";
import userArrivalCalenderSlice from "./features/mange/userCalenderSlice";
import ChangeArrivalTimeSlice from "./features/mange/changeArrivelTime";
import changeTimeWorkListSlice from "./features/mange/changeTimeWorkListSlice";
import hrStudyTimeSlice from "./features/mange/hrStudyTimeSlice";
import updateUserTimesSlice from "./features/users/updateUserTimesSlice";
import addRulesSlice from "./features/customer-cnfig/addRulesSlice";
import getNotificationSlice from "./features/users/getnotificationList";
import statusHrStudySice from "./features/mange/statusHrStudy";
import statusWorkingOursSlice from "./features/mange/statusWorkingOursSlice";
import workingOursListSlice from "./features/mange/workingOursListSlice";
import rulesListSlice from "./features/customer-cnfig/rulesListSlice";
import deleteRulesSlice from "./features/customer-cnfig/deleteRulesSlice";
import updateRulesSlice from "./features/customer-cnfig/updateRulesSlice";
import detailsRulesSlice from "./features/customer-cnfig/detailsRulesSlice";
import configLeaveListSlice from "./features/customer-cnfig/configLeaveList";
import updateConfigLeaveSlice from "./features/customer-cnfig/updateConfigLeave";
import configEvaluateListSlice from "./features/customer-cnfig/configEvaluateList";
import getDriveListSlice from "./features/drive/getDriveList";
import AllUserListSlice from "./features/drive/getAllUserList";
import getDepartmentsSlice from "./features/ticket/departments";
import CreateTicketSlice from "./features/ticket/createTicket";
import TeamsListSlice from "./features/project/Teams/getTeamList";
import getTicketSlice from "./features/ticket/tickets";
import createDriveSlice from "./features/drive/craeteDrive";
import updateDriveSlice from "./features/drive/updateDrive";
import showTicketSlice from "./features/ticket/showTicket";
import createTeamRoleSlice from "./features/project/TeamRoles/storeTeamRolesSlice";
import updateTeamRoleSlice from "./features/project/TeamRoles/updateTeamRoleSlice";
import TeamRolesListSlice from "./features/project/TeamRoles/getTeamRolsSlice";
import userSubmitSickLaeveSlice from "./features/users/Submit-leaves/userSubmitSicekLeave";
import userSubmitLaeveSlice from "./features/users/Submit-leaves/userSubmitLeave";
import showDriveListSlice from "./features/drive/showDrive";
import getStudyTimeSlice from "./features/users/study-time/getStudyTimeSlice";
import createSubmitStudyTimeSlice from "./features/users/study-time/createStudyTime";
import projectListSlice from "./features/project/ProjectListSlice";
import storeProjectSlice from "./features/project/storePorjectSlice";
import updateEvaluateListSlice from "./features/customer-cnfig/updateEvaluateList";
import updateProjectSlice from "./features/project/UpdateProjectSlice";
import showPorjectSlice from "./features/project/showPorjectSlice";
import updateWorkspaceSlice from "./features/customer-cnfig/updateWorkspace";
import showTeamsSlice from "./features/project/Teams/showTeamSlice";
import showResourcesListSlice from "./features/project/Resources/showResourcesList";
import updateResourcesSlice from "./features/project/Resources/UpdateResourcesSlice";
import storeResourcesSlice from "./features/project/Resources/storeResources";
import deleteResourcesListSlice from "./features/project/Resources/deleteResources";
import UpdateTeamMemberRoleSlice from "./features/project/Teams/UpdateTeamMemberRoleSlice";
import DeleteMemberSlice from "./features/project/Teams/DeleteMemberSlice";
import AddMemberSlice from "./features/project/Teams/AddMemberSlice";
import UpdateTeamSlice from "./features/project/Teams/UpdateTeamSlice";
import StoreTeamSlice from "./features/project/Teams/StoreTeam";
import AnswerTicketSlice from "./features/ticket/answerTicket";
import CloseTicketSlice from "./features/ticket/closeTicket";
import showProjectTasksSlice from "./features/project/task/category/ShowProjectTaskSlice";
import archiveProjectTasksSlice from "./features/project/task/category/ArchiveTaskSlice";
import restoreProjectTasksSlice from "./features/project/task/category/RestoreProjectTaskSlice";
import storeCategoryTaskSlice from "./features/project/task/category/storeCategoryTask";
import updateCategoryTaskSlice from "./features/project/task/category/updateCategoryTask";
import storeTagsSlice from "./features/document/tags/StoreTagsSlice";
import UpdateTagsSlice from "./features/document/tags/UpdateTagsSlice";
import showTagsSlice from "./features/document/tags/ShowTagsSlice";
import getTagsSlice from "./features/document/tags/getTagsListSLice";
import StoreTaskSlice from "./features/project/task/StoreTask";
import UpdateTaskSlice from "./features/project/task/UpdateTask";
import categoryListSlice from "./features/document/Category/CategoryListSlice";
import showArticleSlice from "./features/document/article/showArticelSlice";
import IndexTaskSlice from "./features/project/task/IndexTask";
import storeSaveDocumentSlice from "./features/document/save-document/storeSaveDocumnet";
import deleteDocumentListSlice from "./features/document/save-document/deleteSaveDocumnet";
import saveDocumentListSlice from "./features/document/save-document/saveDocumnetList";
import showCategoryListSlice from "./features/document/Category/showCategory";
import AddCategorySlice from "./features/document/Category/addCategory";
import LikeDocumentSlice from "./features/document/stuff/likeDocument";
import CommentDocumentSlice from "./features/document/stuff/CommentDocument";
import storeArticleSlice from "./features/document/article/storeArticleSlice";
import templateListSlice from "./features/document/template/templateSlice";
import storeTemplateSlice from "./features/document/template/storeTemplateSlice";
import deleteTemplateSlice from "./features/document/template/deleteSlice";
import showTemplateSlice from "./features/document/template/showTemplateSlice";
import updateTemplateSlice from "./features/document/template/updateTemplateSlice";
import IndexDocumentSlice from "./features/document/IndexSlice";
import UpdateDocumentSlice from "./features/document/UpdateDocumentSlice";
import ownIndexDocumnetSlice from "./features/document/ownIndexSlice";
import ownKnowledgeIndexDocumentSlice from "./features/document/ownKnowledgeIndexSlice";
import CommentIndexSlice from "./features/document/stuff/CommentIndex";
import CommentChangeStatusSlice from "./features/document/stuff/CommentChangeStatus";
import DocumentChangeStatusSlice from "./features/document/DocumentChangeStatusSlice";
import DeprecateDocSlice from "./features/document/DeprecateSlice";
import SetReadTimeSlice from "./features/document/stuff/setReadTime";
import recoverCategoryListSlice from "./features/document/Category/delete/recoverCategory";
import getDeletedCategoryListSlice from "./features/document/Category/delete/deleteCategoryList";
import getDeletedCategoryShowSlice from "./features/document/Category/delete/deleteCategoryShow";
import removeCategoryListSlice from "./features/document/Category/delete/removeCategory";
import makePrivateDocSlice from "./features/document/public/makePrivate";
import showDocSlice from "./features/document/public/makePublic";
import showPublicDocSlice from "./features/document/public/showDocument";
import makePublicDocSlice from "./features/document/public/showDocument";
import UpdateKnowledgeSlice from "./features/document/knowledge/updateKnowledge";
import SaveKnowledgeAsDocSlice from "./features/document/knowledge/saveKnowledgeAsDoc";
import myDriveListSlice from "./features/drive/MyDrives";
import deleteDriveListSlice from "./features/drive/deleteDrives";
import IndexContributeSlice from "./features/document/Contribute/index";
import RestoreMainWikiSlice from "./features/document/Contribute/RestoreMainWiki";
import StoreContributeSlice from "./features/document/Contribute/Store";
import ContributeChangeStatusSlice from "./features/document/Contribute/ContributeChangeStatusSlice";
import CheckInviteLinkSlice from "./features/Auth/CheckInviteLink";
import GenerateLinksSlice from "./features/Auth/GenerateLinks";


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "getUserArrivalDate"],
};
///// All Reducers
export const rootReducers = combineReducers({
    Auth: AuthReducer,
    SignUp: SingReducer,
    signUpEmployee: signUpEmployeeSlice,
    CheckUser: checkUserSlice,
    CheckEmail: checkUniqEmailSlice,
    CheckMobile: checkUniqMobileSlice,
    singOut: singOutSlice,
    getCustomer: customerTypesSlice,
    Notification: NotificationSlice,
    getNotification: getNotificationSlice,
    user: userSlice,
    ArrivalTime: setArrivalTimeSlice,
    ExitTime: userExitSlice,
    Vacation: VacationSlice,
    resetPassword: resetPassSlice,
    resetUserName: resetUserNameSlice,
    userList: userListSlice,
    forgotPass: forgotPassSlice,
    setPass: setPassSlice,
    userArrivalDate: userArrivalDateSlice,
    updateUserRoles: updateUserRolesSlice,
    getUserArrivalDate: getUserArrivalDateSlice,
    leaveRequest: leaveRequestSlice,
    rejectVacation: rejectVacationSlice,
    acceptVacation: acceptVacationSlice,
    leaveRequestDetails: LeaveRequsetDetailstSlice,
    checkLeaveRequest: checkLeaveRequestSlice,
    userAcceptVacation: userAcceptVacationSlice,
    userRejectVacation: userRejectVacationSlice,
    userVacation: userVacationCeilingSlice,
    userArrivalCalender: userArrivalCalenderSlice,
    ChangeArrivalTimes: ChangeArrivalTimeSlice,
    changeTimeWorkList: changeTimeWorkListSlice,
    hrStudyTime: hrStudyTimeSlice,
    updateUserTimes: updateUserTimesSlice,
    addRules: addRulesSlice,
    statusHrStudy: statusHrStudySice,
    statusWorkingOurs: statusWorkingOursSlice,
    workingOursList: workingOursListSlice,
    rulesList: rulesListSlice,
    deleteRules: deleteRulesSlice,
    detailsRules: detailsRulesSlice,
    updateRules: updateRulesSlice,
    configLeaveList: configLeaveListSlice,
    updateConfigLeave: updateConfigLeaveSlice,
    configEvaluateList: configEvaluateListSlice,
    getDriveList: getDriveListSlice,
    getDepartments: getDepartmentsSlice,
    createTicket: CreateTicketSlice,
    TeamsList: TeamsListSlice,
    AllUserList: AllUserListSlice,
    getTickets: getTicketSlice,
    createDriveFile: createDriveSlice,
    updateDrive: updateDriveSlice,
    showTicket: showTicketSlice,
    updateTeamRole: updateTeamRoleSlice,
    storeTeams: createTeamRoleSlice,
    getTeamRoles: TeamRolesListSlice,
    userSubmitSickLaeve: userSubmitSickLaeveSlice,
    userSubmitLaeve: userSubmitLaeveSlice,
    showDriveList: showDriveListSlice,
    getStudyTime: getStudyTimeSlice,
    createSubmitStudyTime: createSubmitStudyTimeSlice,
    projectList: projectListSlice,
    updateEvaluateList: updateEvaluateListSlice,
    storeProjectSlice,
    updateProject: updateProjectSlice,
    showPorject: showPorjectSlice,
    updateWorkspace: updateWorkspaceSlice,
    showTeams: showTeamsSlice,
    showResourcesListSlice,
    deleteResourcesListSlice,
    updateResources: updateResourcesSlice,
    storeResourcesSlice,
    UpdateTeamMemberRole: UpdateTeamMemberRoleSlice,
    DeleteMember: DeleteMemberSlice,
    AddMember: AddMemberSlice,
    UpdateTeam: UpdateTeamSlice,
    StoreTeam: StoreTeamSlice,
    AnswerTicket: AnswerTicketSlice,
    CloseTicket: CloseTicketSlice,
    showProjectTasksSlice,
    archiveProjectTasksSlice,
    storeCategoryTaskSlice,
    updateCategoryTaskSlice,
    restoreProjectTasksSlice,
    getTagsSlice,
    showTagsSlice,
    storeTagsSlice,
    UpdateTagsSlice,
    StoreTaskSlice,
    UpdateTaskSlice,
    categoryListSlice,
    IndexTaskSlice,
    showArticleSlice,
    storeSaveDocumentSlice,
    deleteDocumentListSlice,
    saveDocumentListSlice,
    showCategoryListSlice,
    LikeDocumentSlice,
    storeArticleSlice,
    AddCategorySlice,
    templateListSlice,
    storeTemplateSlice,
    deleteTemplateSlice,
    showTemplateSlice,
    updateTemplateSlice,
    IndexDocumentSlice,
    UpdateDocumentSlice,
    ownIndexDocumnetSlice,
    CommentDocumentSlice,
    CommentIndexSlice,
    CommentChangeStatusSlice,
    DocumentChangeStatusSlice,
    DeprecateDocSlice,
    SetReadTimeSlice,
    myDriveListSlice,
    deleteDriveListSlice,
    removeCategoryListSlice,
    recoverCategoryListSlice,
    getDeletedCategoryListSlice,
    getDeletedCategoryShowSlice,
    makePrivateDocSlice,
    showDocSlice,
    makePublicDocSlice,
    ownKnowledgeIndexDocumentSlice,
    SaveKnowledgeAsDocSlice,
    UpdateKnowledgeSlice,
    IndexContributeSlice,
    RestoreMainWikiSlice,
    StoreContributeSlice,
    showPublicDocSlice,
    ContributeChangeStatusSlice,
    CheckInviteLinkSlice,
    GenerateLinksSlice
});

export default persistReducer(persistConfig, rootReducers);
