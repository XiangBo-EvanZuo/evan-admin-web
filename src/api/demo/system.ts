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
    AccountList = '/business-menu/system/getAccountList',
    IsAccountExist = '/business-menu/system/accountExist',
    DeptList = '/business-menu/system/getDeptList',
    setRoleStatus = '/system/setRoleStatus',
    // todo： 对接菜单接口打开以恢复mock
    // MenuList = '/system/getMenuList',
    // RolePageList = '/system/getRoleListByPage',
    MenuList = '/business-resource/user/feignGetMenuList',
    RolePageList = '/business-menu/system/getRoleListByPage',
    GetAllRoleList = '/business-menu/system/getAllRoleList',
    UrlList = '/business-menu/system/getUrlList',
    ModuleList = '/business-menu/system/getModuleList',
    AddAuthUrl = '/business-menu/system/addAuthUrl',
    UpdateAuthUrl = '/business-menu/system/updateAuthUrl',
    DeleteAuthUrl = '/business-menu/system/deleteAuthUrl',
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
