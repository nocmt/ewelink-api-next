import axios from "axios";

export type eWeLinkBaseOptions = { appid: string; appsecret: string; region: string};

export class eWeLinkBase {

    // appid与appsecret，可通过 https://dev.ewelink.cc 注册获取
    appid?: string
    appsecret?: string
    region?: string
    endpoint: string = 'https://eu-apia.coolkit.cc'

    // constructor 是一种用于创建和初始化class创建的对象的特殊方法，类似于Python的__init__函数
    constructor(options?: eWeLinkBaseOptions) {
        if (!options) return
        if (options.appid) this.appid = options.appid
        if (options.appsecret) this.appsecret = options.appsecret
        if (options.region) {
            this.endpoint = `https://${options.region}.apia.coolkit.${['cn', 'test'].includes(options.region) ? 'cn' : 'cc'}`
            this.region = options.region
        }
        // // 添加请求拦截器
        // this.request.interceptors.request.use(function (config) {
        //     // 在发送请求之前做些什么
        //     // return config;
        //     // config.headers = {}
        // }, function (error) {
        //     // 对请求错误做些什么
        //     return Promise.reject(error);
        // });
        // // 添加响应拦截器
        // this.request.interceptors.response.use(function (response) {
        //     // 对响应数据做点什么
        //     return response;
        //     }, function (error) {
        //         // 对响应错误做点什么
        //         return Promise.reject(error);
        //     });
    }

    // 创建一个axios实例
    request = axios.create({
        baseURL: this.endpoint,
        timeout: 30000,
        headers: {}
    })

    setUrl = (region: string) => {
        this.endpoint = `https://${region}.apia.coolkit.${region === 'cn' ? 'cn' : 'cc'}`
    }

    setAuthOptions = (appid: string,appsecret: string) => {
        this.appid = appid
        this.appsecret = appsecret
    }
}

// 导出 eWeLinkBase 接口
export interface eWeLinkBase {}