const CheckRole = ({roles, page, part}) => {
    let check = false;
    for (let i = 0; i < roles?.length; i++) {
        const permissions = pages[page][part]
        if (permissions[roles[i]] === true) {
            check = true;
            break;
        }
    }
    return check;
}

const roles = {
    manager: false, advanced: false, admin: false, hr: false, user: false, expert: false, guest: false
}
const rolesTrue = {
    manager: true, advanced: true, admin: true, hr: true, user: true, expert: true, guest: true
}

export default CheckRole


let pages = {
    document: {
        side: {...roles, manager: true, advanced: true},
        changeStatus: {...roles, manager: true, advanced: true},
        storeArticle: {...roles, manager: true, advanced: true, admin: true, expert: true},
        visibility: {...roles, manager: true, advanced: true, admin: true},
        deprecate: {...roles, manager: true, advanced: true},
        edit: {...roles, manager: true, advanced: true, admin: true},
        contribute: {...rolesTrue, guest: false},
        manageComments: {...roles, manager: true, advanced: true, admin: true},
        makePublic: {...roles, manager: true, advanced: true},
    },
    users: {
        updateRole: {...roles, manager: true},
        mobile: {...roles, manager: true}
    }, tabs: {
        vacation: {...roles, manager: true, hr: true},
        projects: {...roles, manager: true, advanced: true, admin: true, user: true, expert: true},
        config: {...roles, manager: true},
        tickets: {...roles, manager: true}
    }, projects: {
        store: {...roles, manager: true, advanced: true}, update: {...roles, manager: true, advanced: true}
    }, drives: {
        delete: {...roles, manager: true}, update: {...roles, manager: true}
    }, rules: {
        store: {...roles, manager: true}, action: {...roles, manager: true}
    }, workspaceInfo: {
        update: {...roles, manager: true}
    }, config: {
        sidebar: {...roles, manager: true}
    }, routes: {
        '/users': {...rolesTrue, guest: false},
        '/drive': {...rolesTrue},
        '/myDrive': {...rolesTrue},
        '/teams': {...rolesTrue, guest: false},
        '/projects': {...rolesTrue, guest: false},
        '/tickets': {...roles, manager: true},
        '/dashboard': {...rolesTrue, guest: false},
        '/user-panel': {...rolesTrue},
        '/notification': {...rolesTrue},
        '/my-vacation': {...rolesTrue, guest: false},
        '/vacation': {...roles, manager: true, hr: true},
        '/document/articles': {...rolesTrue},
        '/document/store-article': {...rolesTrue, guest: false},
        '/document/store-wiki': {...rolesTrue, guest: false},
        '/document/tags': {...roles, manager: true, advanced: true},
        '/document/bookmarks': {...rolesTrue},
        '/document/drafts': {...rolesTrue, guest: false},
        '/document/mine': {...rolesTrue, guest: false},
        '/document/templates': {...roles, manager: true, advanced: true},
        '/document/wikis': {...rolesTrue},
        '/document': {...rolesTrue},
        '/archives': {...roles, manager: true, advanced: true},
        '/rules': {...rolesTrue},
        '/config': {...rolesTrue},
        '/config-leaves': {...roles, manager: true},
        '/config-evaluate': {...roles, manager: true},
        '/config-workspace': {...rolesTrue},
        '/my-studytime': {...rolesTrue, guest: false},
        '/document/comments/:id': {...roles, manager: true, advanced: true, admin: true},
        '/document/article/:id': {...rolesTrue},
        '/document/wiki/:id': {...rolesTrue},
        '/document/knowledge/update': {...rolesTrue, guest: false},
        '/vacations/:id': {...roles, manager: true, hr: true},
        '/project/:id': {...rolesTrue},
        '/team/:id': {...rolesTrue},
        '/ticket/:id': {...roles, manager: true},
        '/archive-tasks/:id': {...roles, manager: true, advanced: true, admin: true},
        '/document/public/show/:id': {...rolesTrue},
        '/document/myKnowledge': {...rolesTrue, guest: false},
        '/document/update': {...rolesTrue, guest: false},
        '/document/contributes/:id': {...rolesTrue, guest: false},
    },
    admin: {
        check: {...roles, manager: true, advanced: true, admin: true}
    }
}









