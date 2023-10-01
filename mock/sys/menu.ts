import { resultSuccess, resultError, getRequestToken, requestParams } from '../_util';
import { MockMethod } from 'vite-plugin-mock';
import { createFakeUserList } from './user';

// single
const dashboardRoute = {
    path: '/dashboard',
    name: 'Dashboard',
    component: 'LAYOUT',
    redirect: '/dashboard/analysis',
    meta: {
        title: 'routes.dashboard.dashboard',
        hideChildrenInMenu: true,
        icon: 'bx:bx-home',
    },
    children: [
        {
            path: 'analysis',
            name: 'Analysis',
            component: '/dashboard/analysis/index',
            meta: {
                hideMenu: true,
                hideBreadcrumb: true,
                title: 'routes.dashboard.analysis',
                currentActiveMenu: '/dashboard',
                icon: 'bx:bx-home',
            },
        },
        {
            path: 'workbench',
            name: 'Workbench',
            component: '/dashboard/workbench/index',
            meta: {
                hideMenu: true,
                hideBreadcrumb: true,
                title: 'routes.dashboard.workbench',
                currentActiveMenu: '/dashboard',
                icon: 'bx:bx-home',
            },
        },
    ],
};

const backRoute = {
    path: 'back',
    name: 'PermissionBackDemo',
    meta: {
        title: 'routes.demo.permission.back',
    },

    children: [
        {
            path: 'page',
            name: 'BackAuthPage',
            component: '/demo/permission/back/index',
            meta: {
                title: 'routes.demo.permission.backPage',
            },
        },
        {
            path: 'btn',
            name: 'BackAuthBtn',
            component: '/demo/permission/back/Btn',
            meta: {
                title: 'routes.demo.permission.backBtn',
            },
        },
    ],
};

const authRoute = {
    path: '/permission',
    name: 'Permission',
    component: 'LAYOUT',
    redirect: '/permission/front/page',
    meta: {
        icon: 'carbon:user-role',
        title: 'routes.demo.permission.permission',
    },
    children: [backRoute],
};

const levelRoute = {
    path: '/level',
    name: 'Level',
    component: 'LAYOUT',
    redirect: '/level/menu1/menu1-1',
    meta: {
        icon: 'carbon:user-role',
        title: 'routes.demo.level.level',
    },

    children: [
        {
            path: 'menu1',
            name: 'Menu1Demo',
            meta: {
                title: 'Menu1',
            },
            children: [
                {
                    path: 'menu1-1',
                    name: 'Menu11Demo',
                    meta: {
                        title: 'Menu1-1',
                    },
                    children: [
                        {
                            path: 'menu1-1-1',
                            name: 'Menu111Demo',
                            component: '/demo/level/Menu111',
                            meta: {
                                title: 'Menu111',
                            },
                        },
                    ],
                },
                {
                    path: 'menu1-2',
                    name: 'Menu12Demo',
                    component: '/demo/level/Menu12',
                    meta: {
                        title: 'Menu1-2',
                    },
                },
            ],
        },
        {
            path: 'menu2',
            name: 'Menu2Demo',
            component: '/demo/level/Menu2',
            meta: {
                title: 'Menu2',
            },
        },
    ],
};

const sysRoute = {
    path: '/system',
    name: 'System',
    component: 'LAYOUT',
    redirect: '/system/account',
    meta: {
        icon: 'ion:settings-outline',
        title: 'routes.demo.system.moduleName',
    },
    children: [
        {
            path: 'account',
            name: 'AccountManagement',
            meta: {
                title: 'routes.demo.system.account',
                ignoreKeepAlive: true,
            },
            component: '/demo/system/account/index',
        },
        {
            path: 'account_detail/:id',
            name: 'AccountDetail',
            meta: {
                hideMenu: true,
                title: 'routes.demo.system.account_detail',
                ignoreKeepAlive: true,
                showMenu: false,
                currentActiveMenu: '/system/account',
            },
            component: '/demo/system/account/AccountDetail',
        },
        {
            path: 'role',
            name: 'RoleManagement',
            meta: {
                title: 'routes.demo.system.role',
                ignoreKeepAlive: true,
            },
            component: '/demo/system/role/index',
        },

        {
            path: 'menu',
            name: 'MenuManagement',
            meta: {
                title: 'routes.demo.system.menu',
                ignoreKeepAlive: true,
            },
            component: '/demo/system/menu/index',
        },
        {
            path: 'dept',
            name: 'DeptManagement',
            meta: {
                title: 'routes.demo.system.dept',
                ignoreKeepAlive: true,
            },
            component: '/demo/system/dept/index',
        },
        {
            path: 'changePassword',
            name: 'ChangePassword',
            meta: {
                title: 'routes.demo.system.password',
                ignoreKeepAlive: true,
            },
            component: '/demo/system/password/index',
        },
    ],
};

const linkRoute = {
    path: '/link',
    name: 'Link',
    component: 'LAYOUT',
    meta: {
        icon: 'ion:tv-outline',
        title: 'routes.demo.iframe.frame',
    },
    children: [
        {
            path: 'doc',
            name: 'Doc',
            meta: {
                title: 'routes.demo.iframe.doc',
                frameSrc: 'https://doc.vvbin.cn/',
            },
        },
        {
            path: 'https://doc.vvbin.cn/',
            name: 'DocExternal',
            component: 'LAYOUT',
            meta: {
                title: 'routes.demo.iframe.docExternal',
            },
        },
    ],
};

export default [
    {
        url: '/evan/getMenuList',
        timeout: 1000,
        method: 'get',
        response: (request: requestParams) => {
            const token = getRequestToken(request);
            if (!token) {
                return resultError('Invalid token!');
            }
            const checkUser = createFakeUserList()[0];
            const id = checkUser.userId;
            let menu: Object[];
            switch (id) {
                case '1':
                    dashboardRoute.redirect =
                        dashboardRoute.path + '/' + dashboardRoute.children[0].path;
                    menu = [dashboardRoute, authRoute, levelRoute, sysRoute, linkRoute];
                    break;
                case '2':
                    dashboardRoute.redirect =
                        dashboardRoute.path + '/' + dashboardRoute.children[1].path;
                    menu = [dashboardRoute, authRoute, levelRoute, linkRoute];
                    break;
                default:
                    menu = [];
            }
            // todo: 将所有的页面路由都加上component属性
            menu[2].children = menu[2].children.concat({
                icon: 'ion:key-outline',
                title: 'routes.demo.permission.permission',
                meta: {
                    orderNo: 15,
                    icon: 'ion:key-outline',
                    title: 'routes.demo.permission.permission',
                },
                name: 'routes.demo.permission.permission',
                hideMenu: false,
                path: '/permission',
                redirect: '/permission/front/page',
                children: [
                    {
                        title: 'routes.demo.permission.front',
                        meta: { title: 'routes.demo.permission.front' },
                        name: 'routes.demo.permission.front',
                        hideMenu: false,
                        path: '/permission/front',
                        children: [
                            {
                                title: 'routes.demo.permission.frontPage',
                                meta: { title: 'routes.demo.permission.frontPage' },
                                name: 'routes.demo.permission.frontPage',
                                hideMenu: false,
                                path: '/permission/front/page',
                                component: '/demo/system/account/index',
                            },
                            {
                                title: 'routes.demo.permission.frontBtn',
                                meta: { title: 'routes.demo.permission.frontBtn' },
                                name: 'routes.demo.permission.frontBtn',
                                hideMenu: false,
                                path: '/permission/front/btn',
                                component: '/demo/system/account/index',
                            },
                        ],
                    },
                    {
                        title: 'routes.demo.permission.back',
                        meta: { title: 'routes.demo.permission.back' },
                        name: 'routes.demo.permission.back',
                        hideMenu: false,
                        path: '/permission/back',
                        children: [
                            {
                                title: 'routes.demo.permission.backPage',
                                meta: { title: 'routes.demo.permission.backPage' },
                                name: 'routes.demo.permission.backPage',
                                hideMenu: false,
                                path: '/permission/back/page2',
                                component: '/demo/system/account/index',
                            },
                            {
                                title: 'routes.demo.permission.backBtn',
                                meta: { title: 'routes.demo.permission.backBtn' },
                                name: 'routes.demo.permission.backBtn',
                                hideMenu: false,
                                path: '/permission/back/btn2',
                                component: '/demo/system/account/index',
                            },
                        ],
                    },
                ],
            });
            return resultSuccess(menu);
        },
    },
] as MockMethod[];
