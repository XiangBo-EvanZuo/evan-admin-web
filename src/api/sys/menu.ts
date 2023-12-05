import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
    GetMenuList = '/user/menu/list',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
    return defHttp
        .post<{ list: getMenuListResultModel }>({ url: Api.GetMenuList })
        .then((res) => res.list);
};
