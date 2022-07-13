import axios from "axios";

declare module "axios" {
  interface AxiosResponse<T = any> {
    error: number;
    msg: string;
  }
}

export type eWeLinkBaseOptions = { appid: string; appSecret: string; region: string; outputLog?: string | boolean };

export class eWeLinkBase {
  // appid与appSecret，可通过 https://dev.ewelink.cc 注册获取
  appid?: string;
  appSecret?: string;
  region?: string;
  endpoint: string = "https://eu-apia.coolkit.cc";
  outputLog?: string | boolean = false;
  // 创建一个axios实例
  request = axios.create({
    baseURL: this.endpoint,
    timeout: 30000,
    headers: {}
  });

  // constructor 是一种用于创建和初始化class创建的对象的特殊方法，类似于Python的__init__函数
  constructor(options?: eWeLinkBaseOptions) {
    if (!options) return;
    if (options.appid) this.appid = options.appid;
    if (options.appSecret) this.appSecret = options.appSecret;
    if (options.outputLog) this.outputLog = options.outputLog;
    if (options.region) {
      this.endpoint = `https://${options.region}-apia.coolkit.${["cn", "test"].includes(options.region) ? "cn" : "cc"}`;
      this.region = options.region;
      this.request.defaults.baseURL = this.endpoint;
    }

    if (options.outputLog) {
      // 判断是否为目录，后续加日志选项
    }

    // 添加请求拦截器
    // this.request.interceptors.request.use(function (config) {
    //     // 在发送请求之前做些什么
    //     // return config;
    //     // config.headers = {
    //     //     "X-CK-Appid": options.appid,
    //     //     "X-CK-Nonce": nonce()
    //     // }
    //
    // }, function (error) {
    //     // 对请求错误做些什么
    //     return Promise.reject(error);
    // });
    // 添加响应拦截器
    this.request.interceptors.response.use(
      function (response) {
        // 对响应数据做点什么
        // console.debug(response.config.headers)
        return Object.assign(response.data, { status: response.status });
      },
      function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  }

  setUrl = (region: string) => {
    this.endpoint = `https://${region}-apia.coolkit.${region === "cn" ? "cn" : "cc"}`;
  };

  setAuthConfigs = (appid: string, appSecret: string) => {
    this.appid = appid;
    this.appSecret = appSecret;
  };
}

// 导出 eWeLinkBase 接口
export interface eWeLinkBase {}
