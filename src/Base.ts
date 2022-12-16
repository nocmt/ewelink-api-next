import { getToken } from "./utils/index.js";
import { storage } from "./cache/index.js";
import { AxiosInstance } from "axios";
import { creatRequest } from "./utils/request.js";

let _logger: any;

export type eWeLinkBaseOptions = {
  appId: string;
  appSecret: string;
  region: string;
  logObj?: any;
  request?: any;
};

export class eWeLinkBase {
  // appId与appSecret，可通过 https://dev.ewelink.cc 注册获取
  // appId and appSecret can be accessed through https://dev.ewelink.cc Register for
  appId?: string;
  appSecret?: string;
  region?: string;
  endpoint: string = "https://eu-apia.coolkit.cc";
  at: string = "";
  rt: string = "";
  account: string = "";
  userApiKey: string = "";
  logObj?: any;
  request: AxiosInstance | any;
  storage = storage;

  // constructor 是一种用于创建和初始化class创建的对象的特殊方法，类似于Python的__init__函数
  // constructor is a special method that is used to create and initialize class objects, similar to the Python __init__ function
  constructor(options?: eWeLinkBaseOptions) {
    if (!options) return;
    _logger = this.logObj = options.logObj;
    this.request =
      options.request ||
      creatRequest(
        {
          baseURL: this.endpoint,
          timeout: 20000
        },
        this.logObj
      );

    if (options.appId) this.appId = options.appId;
    if (options.appSecret) this.appSecret = options.appSecret;

    if (options.region) {
      this.endpoint = `https://${options.region}-apia.coolkit.${["cn", "test"].includes(options.region) ? "cn" : "cc"}`;
      this.region = options.region;
      this.request.defaults.baseURL = this.endpoint;
    }
  }

  syncLocalToken = (region: string, account: string) => {
    this.region = region;
    this.account = account;
    this.at = getToken(region, account);
    let createTime;
    try {
      createTime = (storage.get(region) || {})[account];
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
    this.endpoint = `https://${region}-apia.coolkit.${["cn", "test"].includes(region) ? "cn" : "cc"}`;
    this.request.default.baseURL = this.endpoint;
  };

  setAuthConfigs = (appId: string, appSecret: string) => {
    this.appId = appId;
    this.appSecret = appSecret;
  };
}

// 导出 eWeLinkBase 接口
// Export eWeLinkBase interface
export interface eWeLinkBase {}
