import axios from "axios";
import log4js from "log4js";
import { getToken, nonce } from "./utils/index.js";
import { storage } from "./cache/index.js";

log4js.configure({
  appenders: {
    // allLog: { type: "dateFile", filename: "./logs/t", pattern: "yyyy-MM-dd.log", alwaysIncludePattern: true },
    // http请求日志  http请求日志需要app.use引用一下， 这样才会自动记录每次的请求信息
    httpLog: {
      type: "dateFile",
      filename: `logs/default.log`,
      pattern: "yyyy-MM-dd",
      keepFileExt: true,
      alwaysIncludePattern: true,
      flags: "a" // a 是追加日志，w是删除之前的
    }
  },
  categories: {
    default: { appenders: ["httpLog"], level: "info" }
  }
});

const logger = log4js.getLogger();

declare module "axios" {
  interface AxiosResponse<T = any> {
    error: number;
    msg: string;
  }
}

export type eWeLinkBaseOptions = { appid: string; appSecret: string; region: string; requestRecord?: boolean };

export class eWeLinkBase {
  // appid与appSecret，可通过 https://dev.ewelink.cc 注册获取
  appid?: string;
  appSecret?: string;
  region?: string;
  endpoint: string = "https://eu-apia.coolkit.cc";
  requestRecord?: boolean = false;
  token: string = "";
  account: string = "";
  request = axios.create({
    baseURL: this.endpoint,
    timeout: 30000
  });
  storage = storage;

  // constructor 是一种用于创建和初始化class创建的对象的特殊方法，类似于Python的__init__函数
  constructor(options?: eWeLinkBaseOptions) {
    if (!options) return;
    if (options.appid) this.appid = options.appid;
    if (options.appSecret) this.appSecret = options.appSecret;
    if (options.requestRecord) this.requestRecord = options.requestRecord;
    if (options.region) {
      this.endpoint = `https://${options.region}-apia.coolkit.${["cn", "test"].includes(options.region) ? "cn" : "cc"}`;
      this.region = options.region;
      this.request.defaults.baseURL = this.endpoint;
    }

    // 添加请求拦截器
    this.request.interceptors.request.use(
      function (config) {
        if (config.headers) {
          config.headers["X-CK-Nonce"] = nonce();
        }
        if (options.requestRecord) {
          logger.info("Send request：", {
            url: config.url,
            method: config.method,
            baseURL: config.baseURL,
            headers: config.headers,
            params: config?.params,
            data: config?.data
          });
        }
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );
    // 添加响应拦截器
    this.request.interceptors.response.use(
      function (response) {
        // 对响应数据做点什么
        const res = Object.assign({ status: response.status }, response.data);
        if (options.requestRecord) {
          logger.info("Response received：", JSON.stringify(res));
        }
        return res;
      },
      function (error) {
        // 对响应错误做点什么
        if (options.requestRecord) {
          logger.error("Incorrect response received：", error);
        }
        return Promise.reject(error);
      }
    );
  }
  syncLocalToken = (region: string, account: string) => {
    this.region = region;
    this.account = account;
    this.token = getToken(region, account);
    let createTime;
    try {
      createTime = storage.get(region)[account]?.createTime;
    } catch (error) {
      createTime = null;
    }
    return createTime;
  };

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
