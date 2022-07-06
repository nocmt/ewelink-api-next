import axios from "axios";
import { config as iConfig } from "./config";

import { tools } from "./tools";

let instance = axios.create({
    baseURL: 'https://cn-apia.coolkit.cn',
    timeout: 30000,
    headers: {}
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // return config;
    config.headers = {
        "X-CK-Appid": iConfig.appId,
        "X-CK-Nonce": tools.nonce
    }
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export { instance } ;