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
    // MenuList = '/system/getMenuList',
    // RolePageList = '/system/getRoleListByPage',
    MenuList = '/business-resource/user/feignGetMenuList',
    RolePageList = '/business-menu/system/getRoleListByPage',
    GetAllRoleList = '/business-menu/system/getAllRoleList',
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

export const getRoleListByPage = (params?: RolePageParams) =>
    defHttp.post<RolePageListGetResultModel>({ url: Api.RolePageList, params });

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
