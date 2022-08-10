import axios, { AxiosRequestConfig } from "axios";
import log4js from "log4js";
import { getToken, nonce } from "./utils/index.js";
import { storage } from "./cache/index.js";

// const logger = log4js.getLogger();
let _logger: any;

declare module "axios" {
  interface AxiosResponse<T = any> {
    error: number;
    msg: string;
    IP: string;
    port: number;
    domain: string;
    reason: string;
  }
}

export type eWeLinkBaseOptions = {
  appId: string;
  appSecret: string;
  region: string;
  requestRecord?: boolean;
  logObj?: any;
  logLevel?: string | "info" | "debug" | "warn" | "error" | "fatal";
};

export class eWeLinkBase {
  // appId与appSecret，可通过 https://dev.ewelink.cc 注册获取
  // appId and appSecret can be accessed through https://dev.ewelink.cc Register for
  appId?: string;
  appSecret?: string;
  region?: string;
  endpoint: string = "https://eu-apia.coolkit.cc";
  requestRecord?: boolean = false;
  at: string = "";
  rt: string = "";
  account: string = "";
  userApiKey: string = "";
  request = axios.default.create({
    baseURL: this.endpoint,
    timeout: 30000
  });
  storage = storage;
  logger: log4js.Logger | undefined;
  logLevel?: string | "info" | "debug" | "warn" | "error" | "fatal";

  // constructor 是一种用于创建和初始化class创建的对象的特殊方法，类似于Python的__init__函数
  // constructor is a special method that is used to create and initialize class objects, similar to the Python __init__ function
  constructor(options?: eWeLinkBaseOptions) {
    if (!options) return;

    this.logLevel = options.logLevel || "debug";
    log4js.configure({
      appenders: {
        // allLog: { type: "dateFile", filename: "./logs/t", pattern: "yyyy-MM-dd.log", alwaysIncludePattern: true },
        // http请求日志  http请求日志需要app.use引用一下， 这样才会自动记录每次的请求信息
        // HTTP request log HTTP request log requires app Use to quote, so that each request information can be automatically recorded
        httpLog: {
          type: "dateFile",
          filename: `logs/default.log`,
          pattern: "yyyy-MM-dd",
          keepFileExt: true,
          alwaysIncludePattern: true,
          flags: "a" // 'a' is to append log, 'w' is the one before deletion
        }
      },
      categories: {
        default: { appenders: ["httpLog"], level: this.logLevel }
      }
    });
    this.logger = options.logObj || log4js.getLogger(options.appId);
    _logger = this.logger;
    if (options.appId) this.appId = options.appId;
    if (options.appSecret) this.appSecret = options.appSecret;
    if (options.requestRecord) this.requestRecord = options.requestRecord;
    if (options.region) {
      this.endpoint = `https://${options.region}-apia.coolkit.${["cn", "test"].includes(options.region) ? "cn" : "cc"}`;
      this.region = options.region;
      this.request.defaults.baseURL = this.endpoint;
    }

    // 添加请求拦截器
    // Add a request interceptor
    this.request.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (config.headers) {
          config.headers["X-CK-Nonce"] = nonce();
        }
        if (options.requestRecord) {
          _logger.info("Send request：", {
            url: config.url,
            method: config.method,
            baseURL: config.baseURL,
            headers: config.headers,
            params: config?.params,
            data: JSON.stringify(config?.data)
          });
          _logger.debug("123");
        }
        return config;
      },
      function (error: any) {
        // 对请求错误做些什么
        // Do something with request error
        return Promise.reject(error);
      }
    );
    // 添加响应拦截器
    // Add a response interceptor
    this.request.interceptors.response.use(
      function (response: { status: number; data: any }) {
        // 对响应数据做点什么
        // Do something with response data
        const res = Object.assign({ status: response.status }, response.data);
        if (options.requestRecord) {
          _logger.info("Response received：", JSON.stringify(res));
        }
        return res;
      },
      function (error: any) {
        // 对响应错误做点什么
        // Do something with response error
        if (options.requestRecord) {
          _logger.error("Incorrect response received：", error);
        }
        return Promise.reject(error);
      }
    );
  }
  syncLocalToken = (region: string, account: string) => {
    this.region = region;
    this.account = account;
    this.at = getToken(region, account);
    let createTime;
    try {
      createTime = storage.get(region) || {};
      this.userApiKey = createTime.user.apikey;
      this.rt = createTime.rt;
      if (createTime && createTime[account]) {
        createTime = createTime[account]?.createTime;
      }
    } catch (error) {
      createTime = null;
    }
    return createTime;
  };

  setUrl = (region: string) => {
    this.endpoint = `https://${region}-apia.coolkit.${region === "cn" ? "cn" : "cc"}`;
  };

  setAuthConfigs = (appId: string, appSecret: string) => {
    this.appId = appId;
    this.appSecret = appSecret;
  };
}

// 导出 eWeLinkBase 接口
// Export eWeLinkBase interface
export interface eWeLinkBase {}
