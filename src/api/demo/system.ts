import {
    AccountParams,
    DeptListItem,
    MenuParams,
    RoleParams,
    RolePageParams,
    MenuListGetResultModel,
    DeptListGetResultModel,
    AccountListGetResultModel,
    RolePageListGetResultModel,
    RoleListGetResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
    AccountList = '/user/system/getAccountList',
    IsAccountExist = '/user/system/accountExist',
    DeptList = '/user/system/getDeptList',
    setRoleStatus = '/system/setRoleStatus',
    // todo： 对接菜单接口打开以恢复mock
    // MenuList = '/system/getMenuList',
    // RolePageList = '/system/getRoleListByPage',
    MenuList = '/order/user/feignGetMenuList',
    RolePageList = '/user/system/getRoleListByPage',
    GetAllRoleList = '/user/system/getAllRoleList',
    UrlList = '/user/system/getUrlList',
    ModuleList = '/user/system/getModuleList',
    AddAuthUrl = '/user/system/addAuthUrl',
    UpdateAuthUrl = '/user/system/updateAuthUrl',
    DeleteAuthUrl = '/user/system/deleteAuthUrl',
    UpdateRoleUrl = '/user/system/updateRoleUrl',
    UpdateRoleMenu = '/user/system/updateRoleMenu',
}

export const getAccountList = (params: AccountParams) =>
    defHttp.post<AccountListGetResultModel>({ url: Api.AccountList, params }).then((res) => {
        res.items = res.items.map((item) => {
            return {
                ...item,
                roles: item.role.join(','),
            };
        });
        return res;
    });

export const getDeptList = (params?: DeptListItem) =>
    defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params }).then((res) => res.list);

export const getMenuList = (params?: MenuParams) =>
    defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params }).then((res) => res.list);

export const addAuthUrl = (params?: MenuParams) =>
    defHttp.post<MenuListGetResultModel>({ url: Api.AddAuthUrl, params });

export const deleteAuthUrl = (params?: any) =>
    defHttp.post<MenuListGetResultModel>({ url: Api.DeleteAuthUrl, params });

export const updateAuthUrl = (params?: MenuParams) =>
    defHttp.post<MenuListGetResultModel>({ url: Api.UpdateAuthUrl, params });

export const updateRoleUrl = (params?: any) =>
    defHttp.post<MenuListGetResultModel>({ url: Api.UpdateRoleUrl, params });

export const updateRoleMenu = (params?: any) =>
    defHttp.post<MenuListGetResultModel>({ url: Api.UpdateRoleMenu, params });

export const getRoleListByPage = (params?: RolePageParams) =>
    defHttp.post<RolePageListGetResultModel>({ url: Api.RolePageList, params }).then((res) => {
        res.items = res.items.map((item) => {
            return {
                ...item,
                menuLength: item.menu.length,
                urlListLength: item.urlList.length,
            };
        });
        return res;
    });

export const getUrlList = (params?: RolePageParams) =>
    defHttp.post<RolePageListGetResultModel>({ url: Api.UrlList, params });
export const getModuleList = (params?: RolePageParams) =>
    defHttp.post<Array<Record<string, string>>>({ url: Api.ModuleList, params });

export const getAllRoleList = (params?: RoleParams) =>
    defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: number) =>
    defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
    defHttp
        .post(
            {
                url: Api.IsAccountExist,
                params: { account },
            },
            { errorMessageMode: 'none' },
        )
        .then((res) => {
            if (res.exist) {
                return Promise.reject(res);
            } else {
                return res;
            }
        });
