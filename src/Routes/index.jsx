import React, { Suspense, lazy } from "react";
import { LinearLoading } from "core";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Layout from "Layout";
import NotFound from "pages/NotFound";
import { useSelector } from "react-redux";
import { CheckRole } from "../helper";
import { NoAccess } from "../components";

/////LAzy config
const Home = lazy(() => import("pages/Home"));
const Register = lazy(() => import("pages/Register/Register"));
const RegisterEmployee = lazy(() => import("pages/Register/RegisterEmployee"));
const Login = lazy(() => import("pages/Login/Login"));
const Dashboard = lazy(() => import("pages/Dashboard/Dashboard"));
// const TodoList = lazy(() => import('pages/Dashboard/TodoList'));
const UserMessages = lazy(() => import("pages/UserMessages/UserMessages"));
const MYVacation = lazy(() => import("pages/users/my-vacation/MYVacation"));
const UserPannel = lazy(() => import("pages/user-panel/UserPannel"));
const ForgotPassword = lazy(() => import("pages/Login/Forgot"));
const SetPassWord = lazy(() => import("pages/Login/SetPassWord"));
const UserList = lazy(() => import("pages/users/user-list/UserList"));
const Vacation = lazy(() => import("pages/vacation/vacation"));
const VacationDetails = lazy(() => import("pages/vacation/VacationDetails"));
const Document = lazy(() => import("pages/document/Document"));
const DocumentArchives = lazy(() => import("pages/document/Archives"));
const GetRulesList = lazy(() => import("pages/rules/rulesList/getRulesList"));
const Drives = lazy(() => import("pages/Drives/Drives"));
const MyDrives = lazy(() => import("pages/Drives/MyDrives"));
const Tickets = lazy(() => import("pages/Tickets/Tickets"));
const ShowTicket = lazy(() => import("pages/Tickets/ShowTicket"));
const LeaveConfig = lazy(() => import("pages/config/leaves/LeaveConfig"));
const EvaluateConfig = lazy(() =>
  import("pages/config/evaluate/EvaluateConfig")
);
const Config = lazy(() => import("pages/config/config"));
const LoginLayout = lazy(() => import("../Layout/LoginLayout"));
const PublicLayout = lazy(() => import("../Layout/PublicLayout"));
const StudyTimeList = lazy(() =>
  import("pages/users/study-time/StudyTimeList")
);
const Team = lazy(() => import("pages/project/Teams/Teams"));
const ShowTeam = lazy(() => import("pages/project/Teams/Teams/ShowTeam"));
const ProjectList = lazy(() => import("pages/project/GetProjectLIst"));
const ShowProject = lazy(() => import("pages/project/ShowProject"));
const UpdateWorkspace = lazy(() =>
  import("pages/config/Workspace/UpdateWorkspace")
);
const ArchiveCategory = lazy(() =>
  import("pages/project/task/category/ArchiveCategory")
);
const Article = lazy(() => import("pages/document/Article/Article"));
const Wiki = lazy(() => import("pages/document/Wiki/Wiki"));
const Tags = lazy(() => import("pages/document/tags"));
const ShowArticle = lazy(() => import("pages/document/Article/ShowArticle"));
const StoreArticle = lazy(() => import("pages/document/Article/StoreArticle"));
const StoreWiki = lazy(() => import("pages/document/Wiki/StoreWiki"));
const ShowWiki = lazy(() => import("pages/document/Wiki/ShowWiki"));
const Bookmarks = lazy(() => import("pages/document/Bookmarks/index"));
const Drafts = lazy(() => import("pages/document/Draft/index"));
const MyDocuments = lazy(() => import("pages/document/MyDocuments/index"));
const ArticleTemplate = lazy(() => import("pages/document/Template/index"));
const DocumentComments = lazy(() => import("pages/document/DocumentComments"));
const MyKnowledgeDocuments = lazy(() =>
  import("pages/document/MyKnowledgeDocuments")
);
const ShowDocument = lazy(() => import("pages/document/public/ShowDocument"));
const UpdateKnowledgeDoc = lazy(() =>
  import("pages/document/MyKnowledgeDocuments/UpdateBody")
);
const UpdateDocument = lazy(() => import("pages/document/UpdateDocumentBody"));
const Contributes = lazy(() => import("pages/document/Contributes/Index"));
const LoginUserWithID = lazy(() => import("pages/Login/LoginUserWithID"));
////Login Layout

const LoginLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <LoginLayout>
          <Component {...matchProps} />
        </LoginLayout>
      )}
    />
  );
};

////App Layout Route

const PublicLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <PublicLayout>
          <Component {...matchProps} />
        </PublicLayout>
      )}
    />
  );
};
const AppLayoutRoute = ({ component: Component, ...rest }) => {
  const { data: user } = useSelector((state) => state.user);
  if (
    CheckRole({ roles: user?.data?.type, page: "routes", part: rest?.path })
  ) {
    return (
      <Route
        {...rest}
        render={(matchProps) => (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )}
      />
    );
  } else {
    return (
      <Route
        {...rest}
        render={(matchProps) => (
          <Layout>
            <NoAccess {...matchProps} />
          </Layout>
        )}
      />
    );
  }
};

const Routing = () => {
  return (
    <Router>
      <Suspense fallback={<LinearLoading />}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/sign-in" />
          </Route>
          {/* Auth Layout  Functionality */}
          <LoginLayoutRoute path="/sign-in" component={Login} />
          <LoginLayoutRoute path="/sign-up" component={Register} />
          <LoginLayoutRoute path="/sigin-withId" component={LoginUserWithID} />

          <LoginLayoutRoute
            path="/auth/employee/:type/:unique"
            component={RegisterEmployee}
          />
          <LoginLayoutRoute
            path="/forgot-password"
            component={ForgotPassword}
          />
          <LoginLayoutRoute
            path="/auth/setPassword/:slug"
            component={SetPassWord}
          />
          {/* App Layout  Functionality */}
          <AppLayoutRoute path="/" exact component={Home} />
          <AppLayoutRoute path="/drive" component={Drives} />
          <AppLayoutRoute path="/myDrive" component={MyDrives} />
          <AppLayoutRoute path="/teams" component={Team} />
          <AppLayoutRoute path="/projects" component={ProjectList} />
          <AppLayoutRoute path="/tickets" component={Tickets} />
          <AppLayoutRoute path="/dashboard" component={Dashboard} />
          <AppLayoutRoute path="/user-panel" component={UserPannel} />
          <AppLayoutRoute path="/notification" component={UserMessages} />
          <AppLayoutRoute path="/my-vacation" component={MYVacation} />
          <AppLayoutRoute path="/vacation" component={Vacation} />
          <AppLayoutRoute path="/document/articles" component={Article} />
          <AppLayoutRoute
            path="/document/comments/:id"
            component={DocumentComments}
          />
          <AppLayoutRoute
            path="/document/store-article"
            component={StoreArticle}
          />
          <AppLayoutRoute path="/document/store-wiki" component={StoreWiki} />
          <AppLayoutRoute
            path="/document/article/:id"
            component={ShowArticle}
          />
          <AppLayoutRoute
            path="/document/knowledge/update"
            component={UpdateKnowledgeDoc}
          />
          <AppLayoutRoute path="/document/update" component={UpdateDocument} />
          <AppLayoutRoute path="/document/tags" component={Tags} />
          <AppLayoutRoute path="/document/bookmarks" component={Bookmarks} />
          <AppLayoutRoute path="/document/drafts" component={Drafts} />
          <AppLayoutRoute path="/document/mine" component={MyDocuments} />
          <AppLayoutRoute
            path="/document/myKnowledge"
            component={MyKnowledgeDocuments}
          />
          <AppLayoutRoute
            path="/document/templates"
            component={ArticleTemplate}
          />
          <AppLayoutRoute path="/document/wikis" component={Wiki} />
          <AppLayoutRoute path="/document/wiki/:id" component={ShowWiki} />
          <AppLayoutRoute
            path="/document/contributes/:id"
            component={Contributes}
          />
          <AppLayoutRoute path="/document" component={Document} />
          <AppLayoutRoute path="/archives" component={DocumentArchives} />
          <AppLayoutRoute path="/users" component={UserList} />
          <AppLayoutRoute path="/rules" component={GetRulesList} />
          <AppLayoutRoute path="/config" component={Config} />
          <AppLayoutRoute path="/config-leaves" component={LeaveConfig} />
          <AppLayoutRoute path="/config-evaluate" component={EvaluateConfig} />
          <AppLayoutRoute
            path="/config-workspace"
            component={UpdateWorkspace}
          />
          <AppLayoutRoute path="/my-studytime" component={StudyTimeList} />
          {/* dynamic Route */}
          <AppLayoutRoute path="/vacations/:id" component={VacationDetails} />
          <AppLayoutRoute path="/project/:id" component={ShowProject} />
          <AppLayoutRoute path="/team/:id" component={ShowTeam} />
          <AppLayoutRoute path="/ticket/:id" component={ShowTicket} />
          <PublicLayoutRoute
            path="/documents/public/show/:id"
            component={ShowDocument}
          />
          <AppLayoutRoute
            path="/archive-tasks/:id"
            component={ArchiveCategory}
          />
          {/* 404 page */}
          <AppLayoutRoute path="*" exact={true} component={<NotFound />} />
        </Switch>
      </Suspense>
    </Router>
  );
};
export default Routing;
