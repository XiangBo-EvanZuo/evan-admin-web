import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
    Login = '/oauth/token',
    Logout = '/auth/oauth/logout',
    GetUserInfo = '/business-resource/user/currentUser',
    GetPermCode = '/business-resource/user/getPermCode',
    TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
    return defHttp.post<LoginResultModel>(
        {
            url: Api.Login,
            params,
        },
        {
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            errorMessageMode: mode,
        },
    );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
    return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
    return defHttp.get<{ perCodeList: string[] }>({ url: Api.GetPermCode });
}

export function doLogout() {
    return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
    return defHttp.get(
        { url: Api.TestRetry },
        {
            retryRequest: {
                isOpenRetry: true,
                count: 5,
                waitTime: 1000,
            },
        },
    );
}
