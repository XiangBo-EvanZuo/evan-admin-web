import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
    GetMenuList = '/business-resource/user/feignGetMenuList',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
    return defHttp
        .get<{ list: getMenuListResultModel }>({ url: Api.GetMenuList })
        .then((res) => res.list);
};
