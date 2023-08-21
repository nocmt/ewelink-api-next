// import { getToken } from "./utils/index.js";
import { storage } from "./cache/index.js";
import { creatRequest } from "./utils/request.js";
let _logger;
export class eWeLinkBase {
    // appId与appSecret，可通过 https://dev.ewelink.cc 注册获取
    // appId and appSecret can be accessed through https://dev.ewelink.cc Register for
    appId;
    appSecret;
    region;
    endpoint = "https://eu-apia.coolkit.cc";
    at = "";
    rt = "";
    account = "";
    userApiKey = "";
    logObj;
    request;
    storage = storage;
    // constructor 是一种用于创建和初始化class创建的对象的特殊方法，类似于Python的__init__函数
    // constructor is a special method that is used to create and initialize class objects, similar to the Python __init__ function
    constructor(options) {
        if (!options)
            return;
        _logger = this.logObj = options.logObj;
        this.request =
            options.request ||
                creatRequest({
                    baseURL: this.endpoint,
                    timeout: 20000
                }, this.logObj);
        if (options.appId)
            this.appId = options.appId;
        if (options.appSecret)
            this.appSecret = options.appSecret;
        if (options.region) {
            this.endpoint = `https://${options.region}-apia.coolkit.${["cn", "test"].includes(options.region) ? "cn" : "cc"}`;
            this.region = options.region;
            this.request.defaults.baseURL = this.endpoint;
        }
    }
    // syncLocalToken = (region: string, account: string) => {
    //   this.region = region;
    //   this.account = account;
    //   this.at = getToken(region, account);
    //   let createTime;
    //   try {
    //     createTime = (storage.get(region) || {})[account];
    //     this.userApiKey = createTime.user.apikey;
    //     this.rt = createTime.rt;
    //     if (createTime && createTime[account]) {
    //       createTime = createTime[account]?.createTime;
    //     }
    //   } catch (error) {
    //     createTime = null;
    //   }
    //   return createTime;
    // };
    /**
     * Set the URL for the request
     *
     * @param region - The region.
     * @returns null
     *
     * @beta
     */
    setUrl = (region) => {
        this.endpoint = `https://${region}-apia.coolkit.${["cn", "test"].includes(region) ? "cn" : "cc"}`;
        this.request.defaults.baseURL = this.endpoint;
    };
    /**
     * Set APPID and APP SECRET
     * @param appId - The APPID.
     * @param appSecret - The APP SECRET.
     * @returns null
     *
     * @beta
     */
    setAuthConfigs = (appId, appSecret) => {
        this.appId = appId;
        this.appSecret = appSecret;
    };
}
