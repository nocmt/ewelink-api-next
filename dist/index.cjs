"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/utils/request.ts
var import_axios = __toESM(require("axios"), 1);

// src/utils/index.ts
var import_crypto = require("crypto");
var applyMixins = (derivedCtor, constructors) => {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        // 获取自己的属性描述符
        // Get the description of the property of the own
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || /* @__PURE__ */ Object.create(null)
      );
    });
  });
};
var nonce = (size = 8) => Math.random().toString(36).slice(-size);
var sign = (msg, appSecret, isFormat = false) => {
  let buffer;
  if (isFormat && typeof msg === "object") {
    buffer = Object.keys(msg).map((key) => `${key}=${msg[key]}`).join("&");
  } else if (typeof msg === "object") {
    buffer = JSON.stringify(msg);
  } else {
    buffer = msg;
  }
  return (0, import_crypto.createHmac)("sha256", appSecret).update(buffer).digest("base64");
};
var hashSha256 = (str) => {
  return (0, import_crypto.createHash)("sha256").update(str).digest("hex");
};

// src/utils/request.ts
var import_dayjs = __toESM(require("dayjs"), 1);
var creatRequest = (config, logObj) => {
  const instance = import_axios.default.create(
    config || {
      baseURL: "",
      timeout: 2e4
    }
  );
  instance.interceptors.request.use(
    (req) => {
      if (["post", "put"].includes(req.method || "")) {
        if (req.headers) {
          req.headers["Content-Type"] = "application/json";
        }
      }
      if (req.headers) {
        req.headers["X-CK-Nonce"] = nonce();
        req.headers["Date"] = String((0, import_dayjs.default)().valueOf());
      }
      if (logObj) {
        logObj.info("Send request: ", {
          url: req.url,
          method: req.method,
          baseURL: req.baseURL,
          headers: req.headers,
          params: req?.params,
          data: JSON.stringify(req?.data)
        });
      }
      return req;
    },
    function(error) {
      if (logObj) {
        logObj.error("request was aborted: ", error);
      }
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (res) => {
      const responseTime = res.config?.headers?.Date ? parseInt(String((0, import_dayjs.default)().valueOf())) - parseInt(res.config.headers?.Date) : null;
      const response = Object.assign({ status: res.status, responseTime }, res.data);
      if (logObj) {
        logObj.info("Response received\uFF1A", JSON.stringify(response));
      }
      return response;
    },
    function(error) {
      if (logObj) {
        logObj.error("Incorrect response received: ", error);
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

// src/Base.ts
var eWeLinkBase = class {
  // constructor 是一种用于创建和初始化class创建的对象的特殊方法，类似于Python的__init__函数
  // constructor is a special method that is used to create and initialize class objects, similar to the Python __init__ function
  constructor(options) {
    this.endpoint = "https://eu-apia.coolkit.cc";
    this.at = "";
    this.rt = "";
    this.account = "";
    this.userApiKey = "";
    /**
     * Set the URL for the request
     *
     * @param region - The region.
     * @returns null
     *
     * @beta
     */
    this.setUrl = (region) => {
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
    this.setAuthConfigs = (appId, appSecret) => {
      this.appId = appId;
      this.appSecret = appSecret;
    };
    if (!options)
      return;
    this.logObj = options.logObj;
    this.request = options.request || creatRequest(
      {
        baseURL: this.endpoint,
        timeout: 2e4
      },
      this.logObj
    );
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
};

// src/web/apis/user/getRegion.ts
var GetRegion = class {
  /**
   * Obtain the region corresponding to the country/region code
   * @description Query the server area corresponding to the telephone area code
   *
   * @param options - The region information.
   * @param options.areaCode - The area code.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getRegion(options) {
    const _options = {
      countryCode: options.areaCode.replace("+", "")
    };
    return await this.root.request.get("https://apia.coolkit.cn/v2/utils/get-region", {
      params: _options,
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Sign ${sign(_options, this.root.appSecret || "", true)}`
      }
    });
  }
};

// src/web/apis/user/login.ts
var Login = class {
  /**
   * Login
   * @description You should log in before you access device data or other resources
   *
   * @param options - The account information.
   * @param options.account - The account.
   * @param options.password - The password.
   * @param options.areaCode - The area code.
   * @param options.lang - option, The language, cn or en. Default is cn.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async login(options) {
    const body = {
      countryCode: options.areaCode,
      password: options.password
    };
    body[`${options.account.indexOf("@") !== -1 ? "email" : "phoneNumber"}`] = options.account;
    if (options?.lang) {
      body["lang"] = options.lang;
    }
    const res = await this.root.request.post("/v2/user/login", body, {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Sign ${sign(body, this.root.appSecret || "")}`
      }
    });
    if (res.status === 200 && res.error === 0) {
      this.root.account = options.account;
      this.root.at = res.data?.at;
      this.root.rt = res.data?.rt;
      this.root.userApiKey = res.data?.user?.apikey;
    }
    return res;
  }
};

// src/web/apis/user/register.ts
var Register = class {
  /**
   * register
   * @description register
   *
   * @param options - The account information.
   * @param options.account - The account.
   * @param options.password - The password.
   * @param options.areaCode - The area code.
   * @param options.code - Verification code.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async register(options) {
    const body = {
      verificationCode: options.code,
      countryCode: options.areaCode || "+1",
      password: options.password
    };
    body[`${options.account.indexOf("@") !== -1 ? "email" : "phoneNumber"}`] = options.account;
    const res = await this.root.request.post("/v2/user/register", body, {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Sign ${sign(body, this.root.appSecret || "")}`
      }
    });
    if (res.status === 200 && res.error === 0) {
      this.root.account = options.account;
      this.root.at = res.data?.at;
      this.root.rt = res.data?.rt;
      this.root.userApiKey = res.data?.user?.apikey;
    }
    return res;
  }
};

// src/web/apis/user/smsLogin.ts
var SMSLogin = class {
  /**
   * SMS Login
   * @description Only users registered by phone number in mainland China has access to this.
   *
   * @param options - The account information.
   * @param options.phoneNumber - The phone number.
   * @param options.areaCode - The area code.
   * @param options.code - Verification code.
   * @param options.lang - option, The language, cn or en. Default is cn.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async smsLogin(options) {
    const body = {
      countryCode: options.areaCode,
      phoneNumber: options.phoneNumber,
      lang: options?.lang || "en",
      verificationCode: options.code
    };
    const res = await this.root.request.post("/v2/user/sms-login", body, {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Sign ${sign(body, this.root.appSecret || "")}`
      }
    });
    if (res.status === 200 && res.error === 0) {
      this.root.account = options.phoneNumber;
      this.root.at = res.data?.at;
      this.root.rt = res.data?.rt;
      this.root.userApiKey = res.data?.user?.apikey;
    }
    return res;
  }
};

// src/web/apis/user/sendCode.ts
var SendCode = class {
  /**
   * Send Verification Code
   * @description Send verification code to email or phone number.
   *
   * @param options - The account information.
   * @param options.type - The type of Verification code
   * @param options.account - The account.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async sendCode(options) {
    const codeTypes = {
      register: 0,
      resetPwd: 1,
      logout: 3,
      SMSLogin: 4
    };
    const body = {
      type: options.type || 0
    };
    body[`${options.account.indexOf("@") !== -1 ? "email" : "phoneNumber"}`] = options.account;
    if (typeof options.type === "string" && options.type in codeTypes) {
      body["type"] = codeTypes[options.type];
    }
    return await this.root.request.post("/v2/user/verification-code", body, {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Sign ${sign(body, this.root.appSecret || "")}`
      }
    });
  }
};

// src/web/apis/user/resetPwd.ts
var ResetPwd = class {
  /**
   * Reset Password
   * @description When you forgot your password, reset password with this endpoint.
   *
   * @param options - The account information.
   * @param options.account - The account.
   * @param options.newPassword - The new password.
   * @param options.code - Verification code.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async resetPwd(options) {
    const body = {
      password: options.newPassword
    };
    body[`${options.account.indexOf("@") !== -1 ? "email" : "phoneNumber"}`] = options.account;
    const res = await this.root.request.post("/v2/user/reset-pwd", body, {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Sign ${sign(body, this.root.appSecret || "")}`
      }
    });
    if (res.status === 200 && res.error === 0) {
      this.root.account = options.account;
      this.root.at = res.data?.at;
      this.root.rt = res.data?.rt;
      this.root.userApiKey = res.data?.user?.apikey;
    }
    return res;
  }
};

// src/web/apis/user/changePwd.ts
var ChangePwd = class {
  /**
   * Change Password
   * @description After you have logged in, you can use this endpoint to change your password with your old password.
   *
   * @param options - The base information.
   * @param options.oldPassword - The old password.
   * @param options.newPassword - The new password.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async changePwd(options) {
    const body = {
      oldPassword: options?.oldPassword,
      newPassword: options?.newPassword
    };
    return await this.root.request.post("/v2/user/change-pwd", body, {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/user/getUserInfo.ts
var GetUserInfo = class {
  /**
   * Get User Info
   * @description Get the information of current account such as the nickname.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getUserInfo() {
    return await this.root.request.get("/v2/user/profile", {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/user/updateUserInfo.ts
var UpdateUserInfo = class {
  /**
   * Update User Info
   * @description Update the information of current account such as the nickname.
   *
   * @param options - The account information.
   * @param options.nickname - option, The nickname.
   * @param options.acceptEmailAd - option, Whether to accept email subscription advertisements.
   * @param options.accountConsult - option, Have you received member consultation feedback?
   * @param options.timezone - option, The timezone.
   * @param options.language - option, option, The language.
   * @param options.lang - option, The language, cn or en. Default is cn.
   * @param options.emailSubscription - option, The email subscription.
   * @param options.emailSubscription.email - The email.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async updateUserInfo(options) {
    return await this.root.request.post("/v2/user/profile", options, {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/user/refreshToken.ts
var RefreshToken = class {
  /**
   * Refresh Access Token
   * @description 'access token' expires in 30 days (for security reasons) by default. When this happens, no need to log in again to GET@'access token', just use 'Refresh Token' endpoint to refresh the 'access token'.
   *
   * @param options - The account information.
   * @param options.rt - Refresh token.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async refreshToken(options) {
    const body = {
      rt: options.rt || this.root.rt
    };
    const res = await this.root.request.post("/v2/user/refresh", body, {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Sign ${sign(body, this.root.appSecret || "")}`
      }
    });
    if (res.status === 200 && res.error === 0) {
      this.root.at = res.data?.at;
      this.root.rt = res.data?.rt;
      this.root.userApiKey = res.data?.user?.apikey;
    }
    return res;
  }
};

// src/web/apis/user/logout.ts
var Logout = class {
  /**
   * logout
   * @description logout
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async logout() {
    return await this.root.request.delete("/v2/user/logout", {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/user/deleteAccount.ts
var DeleteAccount = class {
  /**
   * Delete Account
   * @description Delete account
   *
   * @param options - The base information.
   * @param options.code - Verification code.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async deleteAccount(options) {
    const body = {
      verificationCode: options.code
    };
    return await this.root.request.post("/v2/user/close-account", body, {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/user/index.ts
var User = class {
  constructor(root) {
    this.root = root;
  }
};
applyMixins(User, [
  GetRegion,
  Login,
  Register,
  SMSLogin,
  SendCode,
  ResetPwd,
  ChangePwd,
  GetUserInfo,
  UpdateUserInfo,
  RefreshToken,
  Logout,
  DeleteAccount
]);

// src/web/apis/home/homePage.ts
var HomePage = class {
  /**
   * HomePage
   * @description Allows you to check messages, scenes, things, homes, and user info.
   *
   * @param options - The home page information.
   * @param options.lang - option, The language. en: English, cn: Chinese.
   * @param options.clientInfo - option, The client information.
   * @param options.clientInfo.model - option, The client model.
   * @param options.clientInfo.os - option, The client os.
   * @param options.clientInfo.imei - option, The client imei.
   * @param options.clientInfo.romVersion - option, The client romVersion.
   * @param options.clientInfo.appVersion - option, The client appVersion.
   * @param options.getUser - option, The user information.
   * @param options.getFamily - option, The family information.
   * @param options.getThing - option, The thing information.
   * @param options.getThing.num - option, The thing num.
   * @param options.getThing.beginIndex - option, The thing beginIndex.
   * @param options.getScene - option, The scene information.
   * @param options.getMessage - option, The message information.
   * @param options.getMessage.from - option, The message from.
   * @param options.getMessage.num - option, The message num.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async homePage(options) {
    const body = {
      lang: options?.lang,
      clientInfo: options?.clientInfo,
      getUser: options?.getUser,
      getFamily: options?.getFamily,
      getThing: options?.getThing,
      getScene: options?.getScene,
      getMessage: options?.getMessage
    };
    return await this.root.request.post("/v2/homepage", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/home/addFamily.ts
var AddFamily = class {
  /**
   * Create 1 new family
   *
   * @param options - The base information.
   * @param options.name - The family name.
   * @param options.sort - The family sort. 1: positive sequence, 2: reverse sequence.
   * @param options.roomNameList - The room name list.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async addFamily(options) {
    const body = {
      name: options.name,
      sort: options.sort,
      roomNameList: options?.roomNameList
    };
    return await this.root.request.post("/v2/family", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/home/addRoom.ts
var AddRoom = class {
  /**
   * Create 1 new room
   *
   * @param options - The family information.
   * @param options.familyId - The family id.
   * @param options.name - The room name.
   * @param options.sort - The room sort. 1: positive sequence, 2: reverse sequence.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async addRoom(options) {
    const body = {
      familyid: options.familyId,
      name: options.name,
      sort: options.sort
    };
    return await this.root.request.post("/v2/family/room", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/home/delFamily.ts
var DelFamily = class {
  /**
   * Delete 1 family
   *
   * @param options - The family information.
   * @param options.id - The family id.
   * @param options.deviceFamily - Family ID of mobile device.
   * @param options.switchFamily - Family ID of switch.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async delFamily(options) {
    const params = {
      id: options.id,
      deviceFamily: options.deviceFamily,
      switchFamily: options.switchFamily
    };
    return await this.root.request.delete("/v2/family", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/home/delRoom.ts
var DelRoom = class {
  /**
   * Delete 1 room
   *
   * @param options - The room information.
   * @param options.id - The room id.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async delRoom(options) {
    const params = {
      id: options.id
    };
    return await this.root.request.delete("/v2/family/room", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/home/getFamily.ts
var GetFamily = class {
  /**
   * Obtaining Family Information
   *
   * @param options - The family information.
   * @param options.lang - option, The language. en: English, cn: Chinese.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getFamily(options) {
    const params = {
      lang: options?.lang
    };
    return await this.root.request.get("/v2/family", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/home/setFamily.ts
var SetFamily = class {
  /**
   * Change Home Name
   * @description Currently, it only allows you to change the name of a home
   *
   * @param options - The base information.
   * @param options.id - option, The family id. Default is the current family.
   * @param options.newName - The new family name.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setFamily(options) {
    const body = {
      id: options?.id,
      name: options.newName
    };
    return await this.root.request.put("/v2/family", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/home/setRoom.ts
var SetRoom = class {
  /**
   * Change Room Name
   * @description Currently, it only allows you to change the name of a room
   *
   * @param options - The base information.
   * @param options.id - The room id.
   * @param options.newName - The new room name.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setRoom(options) {
    const body = {
      id: options.id,
      name: options.newName
    };
    return await this.root.request.put("/v2/family/room", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/home/setThing.ts
var SetThing = class {
  /**
   * Move Things
   * @description Move groups and devices to a specified room
   *
   * @param options - The base information.
   * @param options.roomId - The room id.
   * @param options.oldThingList - The old thing list.
   * @param options.newThingList - The new thing list.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setThing(options) {
    const body = {
      roomid: options.roomId,
      oldThingList: options.oldThingList,
      newThingList: options.newThingList
    };
    return await this.root.request.post("/v2/family/room/thing", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/home/sortRoom.ts
var SortRoom = class {
  /**
   * Sort Rooms
   * @description To change the order, you must designate the order of each room in the home.
   *
   * @param options - The base information.
   * @param options.familyId - option, The family id. Default is the current family.
   * @param options.idList - The room id list.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async sortRoom(options) {
    const body = {
      familyid: options?.familyId,
      idList: options.idList
    };
    return await this.root.request.post("/v2/family/room/index", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/home/sortThing.ts
var SortThing = class {
  /**
   * Sort Things in a Home
   * @description To change the order, you must specify the order of each device or group in the home.
   *
   * @param options - The base information.
   * @param options.familyId - option, The family id. Default is the current family.
   * @param options.thingList - The thing list.
   * @param options.thingList[].itemType - The thing type. Default is "thing".
   * @param options.thingList[].id - The thing id.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async sortThing(options) {
    const body = {
      familyid: options?.familyId,
      thingList: options.thingList
    };
    return await this.root.request.post("/v2/family/thing/sort", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/home/switchFamily.ts
var SwitchFamily = class {
  /**
   * Switch Current Family
   * @description Switch to the default family
   *
   * @param options - The base information.
   * @param options.id - Target Family ID.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async switchFamily(options) {
    const body = {
      id: options.id
    };
    return await this.root.request.post("/v2/family/current", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/home/index.ts
var Home = class {
  constructor(root) {
    this.root = root;
  }
};
applyMixins(Home, [
  HomePage,
  AddFamily,
  AddRoom,
  DelFamily,
  DelRoom,
  GetFamily,
  SetFamily,
  SetRoom,
  SetThing,
  SortRoom,
  SortThing,
  SwitchFamily
]);

// src/web/apis/device/getAllThings.ts
var GetAllThings = class {
  /**
   * Get all devices and groups under the user
   *
   * @param options - The things information.
   * @param options.familyId - option, The family id.
   * @param options.lang -  option, The language. 'en' or 'cn'.
   * @param options.num -  option, The number of things per page. Default is 0 means all things.
   * @param options.beginIndex - The index of the first thing. Default is -9999999.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getAllThings(options) {
    const params = {
      lang: options?.lang,
      familyid: options?.familyId,
      num: options?.num,
      beginIndex: options?.beginIndex
    };
    return await this.root.request.get("/v2/device/thing", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
  /**
   * Get all devices and groups under the user (All pages)
   *
   * @param options - The things information.
   * @param options.familyId - option, The family id.
   * @param options.lang -  option, The language. 'en' or 'cn'.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getAllThingsAllPages(options) {
    try {
      let isContinue = true;
      let beginIndex = -99999;
      let thingList = [];
      while (isContinue) {
        let res = await this.root.request.get("/v2/device/thing", {
          params: {
            lang: options?.lang,
            familyid: options?.familyId,
            num: 30,
            beginIndex
          },
          headers: {
            Authorization: `Bearer ${this.root.at}`
          }
        });
        if (res.error !== 0) {
          isContinue = false;
        } else {
          thingList = thingList.concat(res.data?.thingList);
          if (res.data?.thingList.length === 0 || thingList.length >= res.data?.total) {
            isContinue = false;
          } else {
            beginIndex = res.data?.thingList[res.data?.thingList.length - 1].index;
          }
        }
      }
      return { status: 200, error: 0, msg: "", data: { thingList, total: thingList.length } };
    } catch (err) {
      return { status: 500, error: 500, msg: err, data: { thingList: [], total: 0 } };
    }
  }
};

// src/web/apis/device/addDevice.ts
var AddDevice = class {
  /**
   * Add a new Wi-Fi Device.
   *
   * @param options - The device information.
   * @param options.name - option, The device name.
   * @param options.deviceId - The device id.
   * @param options.settings - option, The device settings.
   * @param options.settings.opsNotify - option, The device settings.
   * @param options.settings.opsHistory - option, The device settings.
   * @param options.settings.alarmNotify - option, The device settings.
   * @param options.ifrCode - option, Code value of infrared devices.
   * @param options.deviceKey - The device apikey.
   * @param options.chipId - The device chipid.
   * @param options.familyId - option, The device familyId.
   * @param options.roomId - option, The device roomId.
   * @param options.sort - The device sort. 1: positive sequence, 2: reverse sequence
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async addDevice(options) {
    const body = {
      name: options?.name || `MyDevice${options.deviceId.slice(-5)}`,
      deviceid: options.deviceId.toLowerCase(),
      settings: options?.settings,
      ifrCode: options?.ifrCode,
      digest: hashSha256(`${options.deviceId.toLowerCase()}${options.deviceKey}`),
      chipid: options?.chipId,
      familyid: options?.familyId,
      roomid: options?.roomId,
      sort: options?.sort
    };
    return await this.root.request.post("/v2/device/add", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/addGroup.ts
var AddGroup = class {
  /**
   * Creates a new Device Group.
   *
   * @param options - The device information.
   * @param options.name - The device group name.
   * @param options.mainDeviceId - The device group main device id.
   * @param options.familyId - option, The device group familyId.
   * @param options.roomId - option, The device group roomId.
   * @param options.sort - The device group sort. 1: positive sequence, 2: reverse sequence
   * @param options.deviceidList - The device group deviceidList.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async addGroup(options) {
    if (options.deviceidList.length < 1 || options.deviceidList.length > 30) {
      throw new Error("deviceidList length must be between 1 and 30");
    }
    const body = {
      name: options.name,
      mainDeviceId: options.mainDeviceId,
      familyid: options?.familyId,
      roomid: options?.roomId,
      sort: options?.sort,
      deviceidList: options.deviceidList
    };
    return await this.root.request.post("/v2/device/group", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/addGSMDevice.ts
var AddGSMDevice = class {
  /**
   * Add a new 4G、GPRS Device.
   *
   * @param options - The device information.
   * @param options.name - The device name.
   * @param options.id - The GSM ID.
   * @param options.familyId - option, The device familyId.
   * @param options.roomId - option, The device roomId.
   * @param options.sort - The device sort. 1: positive sequence, 2: reverse sequence
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async addGSMDevice(options) {
    const body = {
      name: options.name,
      id: options.id,
      familyid: options?.familyId,
      roomid: options?.roomId,
      sort: options?.sort
    };
    return await this.root.request.post("/v2/device/add-gsm", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/coverGroupDeviceList.ts
var CoverGroupDeviceList = class {
  /**
   * Adding or deleting devices in a group
   *
   * @param options - The group information.
   * @param options.id - The device group id.
   * @param options.coverDeviceidList - The device group cover deviceidList.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async coverGroupDeviceList(options) {
    if (options.coverDeviceidList.length < 1) {
      throw new Error("addDeviceidList length must be greater than 0");
    }
    const body = {
      id: options.id,
      deviceidList: options.coverDeviceidList
    };
    return await this.root.request.post("/v2/device/group/update", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/delDevice.ts
var DelDevice = class {
  /**
   * Delete a Device.
   *
   * @param options - The device information.
   * @param options.id - The device id.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async delDevice(options) {
    return await this.root.request.delete("/v2/device", {
      params: {
        deviceid: options.id
      },
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/setDeviceInfo.ts
var SetDeviceInfo = class {
  /**
   * Update the basic information of the device
   *
   * @param options - The device information.
   * @param options.newName - option, The new name of the device.
   * @param options.deviceId - The device id.
   * @param options.newRoomId - option, The new room id of the device.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setDeviceInfo(options) {
    const body = {
      name: options?.newName,
      deviceid: options.deviceId,
      roomid: options?.newRoomId
    };
    return await this.root.request.post("/v2/device/update-info", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/delGroup.ts
var DelGroup = class {
  /**
   * Delete a Group.
   *
   * @param options - The group information.
   * @param options.id - The group id.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async delGroup(options) {
    const params = {
      id: options.id
    };
    return await this.root.request.delete("/v2/device/group", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/delOperationHistory.ts
var DelOperationHistory = class {
  /**
   * Delete device's operation history
   *
   * @param options - The things information.
   * @param options.deviceId - The device id.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async delOperationHistory(options) {
    const params = {
      deviceid: options.deviceId
    };
    return await this.root.request.delete("/v2/device/history", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/delShare.ts
var DelShare = class {
  /**
   * Cancel sharing device
   *
   * @param options - The device information.
   * @param options.deviceId - The device id.
   * @param options.apiKey - The user's apiKey.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async delShare(options) {
    const params = {
      deviceid: options.deviceId,
      apikey: options.apiKey
    };
    return await this.root.request.delete("/v2/device/share", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/getGroups.ts
var GetGroups = class {
  /**
   * Get Group List
   *
   * @param options - The group information.
   * @param options.lang -  option, The language. 'en' or 'cn'.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getGroups(options) {
    const params = {
      lang: options?.lang
    };
    return await this.root.request.get("/v2/device/group", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/getOperationHistory.ts
var GetOperationHistory = class {
  /**
   * Get Device operation history
   *
   * @param options - The things information.
   * @param options.deviceId - The device id.
   * @param options.from - The start time of the query, in the format of timestamp, such as 1614211200000.
   * @param options.num - The number of records to query, the default is 30, and the maximum is 30.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getOperationHistory(options) {
    if (options?.num && (options?.num < 0 || options?.num > 30)) {
      throw new Error("num must be between 0 and 30");
    }
    const params = {
      deviceid: options?.deviceId,
      from: options?.from,
      num: options?.num
    };
    return await this.root.request.get("/v2/device/history", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/getOTAInfo.ts
var GetOTAInfo = class {
  /**
   * Get Devices OTA info
   *
   * @param options - The device information.
   * @param options.deviceInfoList - The device information list.
   * @param options.deviceInfoList[].deviceId - The device id.
   * @param options.deviceInfoList[].model - The device model.
   * @param options.deviceInfoList[].version - The device current version.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getOTAInfo(options) {
    let deviceInfoList = [];
    options.deviceInfoList.forEach((item) => {
      deviceInfoList.push({
        deviceid: item.deviceId,
        model: item.model,
        version: item.version
      });
    });
    const body = {
      deviceInfoList
    };
    return await this.root.request.post("/v2/device/ota/query", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/getThings.ts
var GetThings = class {
  /**
   * Obtain specified device or group information
   *
   * @param options - The things information.
   * @param options.thingList - The things information.
   * @param options.thingList.itemType - The things itemType. 1: user's own device, 2: devices shared by others, 3: own group.
   * @param options.thingList.id - The things id.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getThings(options) {
    const body = {
      thingList: options.thingList
    };
    return await this.root.request.post("/v2/device/thing", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/getThingStatus.ts
var GetThingStatus = class {
  /**
   * Get Device Status
   *
   * @param options - The things information.
   * @param options.type - The things type. 1: devices status, 2: groups status.
   * @param options.id - The things id.
   * @param options.params - option, The things params.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getThingStatus(options) {
    if (typeof options.type === "string") {
      options.type = options.type === "device" ? 1 : 2;
    }
    const params = {
      type: options.type || 1,
      id: options.id,
      params: options?.params
    };
    return await this.root.request.get("/v2/device/thing/status", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/setAllThingStatus.ts
var SetAllThingStatus = class {
  /**
   * Set the status of the device or group
   *
   * @param options - The things information.
   * @param options.thingList - The things information.
   * @param options.thingList.type - The things type. 1: user's own device, 2: devices shared by others.
   * @param options.thingList.id - The things id.
   * @param options.thingList.params - The things params.
   * @param options.timeout - The timeout. 0-8000ms.default 0ms.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setAllThingStatus(options) {
    options.timeout = !options.timeout ? 0 : options.timeout;
    if (options.timeout < 0 || options.timeout > 8e3) {
      throw new Error("timeout must be between 0 and 8000");
    }
    const body = {
      thingList: options.thingList,
      timeout: options.timeout
    };
    return await this.root.request.post("/v2/device/thing/batch-status", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/setDeviceTags.ts
var SetDeviceTags = class {
  /**
   * Set the tags of the device
   *
   * @param options - The device information.
   * @param options.type - The type of the operation. 'replace' or 'merge'.
   * @param options.deviceId - The device id.
   * @param options.tags - The tags of the device.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setDeviceTags(options) {
    const body = {
      type: options.type || "replace",
      deviceid: options.deviceId,
      tags: options.tags
    };
    return await this.root.request.post("/v2/device/tags", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/setGroup.ts
var SetGroup = class {
  /**
   * Update the name of the group
   *
   * @param options - The group information.
   * @param options.newName - The new name of the group.
   * @param options.id - The group id.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setGroup(options) {
    const body = {
      name: options.newName,
      id: options.id
    };
    return await this.root.request.put("/v2/device/group", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/setGroupStatus.ts
var SetGroupStatus = class {
  /**
   * Update the status of the group
   *
   * @param options - The group information.
   * @param options.id - The group id.
   * @param options.params - The group params.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setGroupStatus(options) {
    const body = {
      id: options.id,
      params: options.params
    };
    return await this.root.request.post("/v2/device/group/status", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/setShare.ts
var SetShare = class {
  /**
   * Modify sharing permissions
   *
   * @param options - The device information.
   * @param options.deviceId - The device id.
   * @param options.apiKey - The user's apiKey.
   * @param options.permit - The sharing permissions.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setShare(options) {
    const body = {
      deviceid: options.deviceId,
      apikey: options.apiKey,
      permit: options.permit
    };
    return await this.root.request.post("/v2/device/share/permit", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/setThingStatus.ts
var SetThingStatus = class {
  /**
   * Update the status of individual devices or groups
   *
   * @param options - The things information.
   * @param options.type - The things type. 1: devices status, 2: groups status.
   * @param options.id - The things id.
   * @param options.params - The things params.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setThingStatus(options) {
    if (typeof options.type === "string") {
      options.type = options.type === "device" ? 1 : 2;
    }
    const body = {
      type: options.type || 1,
      id: options.id,
      params: options.params
    };
    return await this.root.request.post("/v2/device/thing/status", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/share.ts
var Share = class {
  /**
   * Sharing devices
   *
   * @param options - The device information.
   * @param options.user - The user information.
   * @param options.user.countryCode - The user's countryCode.
   * @param options.user.phoneNumber - option, The user's phoneNumber.
   * @param options.user.email - option, The user's email.
   * @param options.deviceidList - The device id list.
   * @param options.permit - The sharing permissions.
   * @param options.comment - option, The sharing comment.
   * @param options.shareType - option, The sharing type.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async share(options) {
    const body = {
      deviceidList: options.deviceidList,
      permit: options.permit,
      comment: options.comment,
      shareType: options.shareType,
      user: options.user
    };
    return await this.root.request.post("/v2/device/share", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/device/index.ts
var Device = class {
  constructor(root) {
    this.root = root;
  }
};
applyMixins(Device, [
  GetAllThings,
  AddDevice,
  AddGroup,
  AddGSMDevice,
  CoverGroupDeviceList,
  DelDevice,
  DelGroup,
  DelOperationHistory,
  DelShare,
  GetGroups,
  GetOperationHistory,
  GetOTAInfo,
  GetThings,
  GetThingStatus,
  SetAllThingStatus,
  SetDeviceTags,
  SetDeviceInfo,
  SetGroup,
  SetGroupStatus,
  SetShare,
  SetThingStatus,
  Share
]);

// src/web/apis/message/getMessage.ts
var GetMessage = class {
  /**
   * Get the List of Messages
   * @description Get share notifications, device notification, and other messages.
   *
   * @param options - The HomePage information.
   * @param options.familyId - option, The familyId.
   * @param options.from - option, The 'from'. timestamp in milliseconds, default now
   * @param options.num - option, The num. default 30
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getMessage(options) {
    const params = {
      lang: options?.familyId,
      from: options?.from,
      num: options?.num
    };
    return await this.root.request.get("/v2/message/read", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
};

// src/web/apis/message/index.ts
var Message = class {
  constructor(root) {
    this.root = root;
  }
};
applyMixins(Message, [GetMessage]);

// src/web/apis/other/dispatch.ts
var Dispatch = class {
  /**
   * Obtain the info for establishing a WebSocket connection
   * @description Obtain the info for establishing a WebSocket connection
   *
   * @param region - The region of the user's account
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async dispatch(region) {
    let url = `https://${region}-dispa.coolkit.${["cn", "test", "wx"].includes(region) ? "cn" : "cc"}/dispatch/app`;
    if (region === "wx") {
      url = "https://wx-disp.coolkit.cn:8080/dispatch/app";
    }
    return await this.root.request.get(url, {});
  }
};

// src/web/apis/other/index.ts
var Other = class {
  constructor(root) {
    this.root = root;
  }
};
applyMixins(Other, [Dispatch]);

// src/web/apis/oauth/createLoginUrl.ts
var import_dayjs2 = __toESM(require("dayjs"), 1);
var CreateLoginUrl = class {
  /**
   * Create a URL for OAuth login
   * @description Create a URL for OAuth login
   *
   * @param options - loginPageInfo
   * @param options.redirectUrl - The redirect URL after login
   * @param options.grantType - option, The grant type, default: `authorization_code`
   * @param options.state - The state
   * @returns loginUrl - which is a URL for OAuth login
   *
   * @beta
   */
  createLoginUrl(options) {
    const seq = (0, import_dayjs2.default)().valueOf();
    const params = {
      clientId: this.root.appId ?? "",
      redirectUrl: options.redirectUrl,
      grantType: options.grantType ?? "authorization_code",
      state: options.state,
      nonce: nonce(),
      seq: seq.toString(),
      authorization: sign(`${this.root.appId ?? ""}_${seq}`, this.root.appSecret ?? "")
    };
    return (`https://c2ccdn.coolkit.cc/oauth/index.html?` + Object.keys(params).map((key) => `${key}=${params[key]}`).join("&")).replace("&auion", "&authorization");
  }
};

// src/web/apis/oauth/getToken.ts
var GetToken = class {
  /**
   * Obtain token using authorization code
   * @description Obtain token using authorization code
   *
   * @param options - baseInfo
   * @param options.region - The region
   * @param options.redirectUrl - The redirect URL after login
   * @param options.code - The authorization code
   * @param options.grantType - option, The grant type, default: `authorization_code`
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getToken(options) {
    const body = {
      redirectUrl: options.redirectUrl,
      code: options.code,
      grantType: options?.grantType ?? "authorization_code"
    };
    this.root.region = options.region;
    this.root.setUrl(options.region);
    return await this.root.request.post("/v2/user/oauth/token", body, {
      headers: {
        "X-CK-Appid": this.root.appId ?? "",
        Authorization: `Sign ${sign(body, this.root.appSecret ?? "")}`
      }
    });
  }
};

// src/web/apis/oauth/index.ts
var OAuth = class {
  constructor(root) {
    this.root = root;
  }
};
applyMixins(OAuth, [CreateLoginUrl, GetToken]);

// src/web/WebAPI.ts
var WebAPI = class extends eWeLinkBase {
  constructor() {
    super(...arguments);
    // 账号管理接口
    // Account management interface
    this.user = new User(this);
    // 家庭管理接口
    // Home management interface
    this.home = new Home(this);
    // 设备管理接口
    // Device management interface
    this.device = new Device(this);
    // 消息管理接口
    // Message management interface
    this.message = new Message(this);
    // OAuth管理接口
    // OAuth management interface
    this.oauth = new OAuth(this);
    // 其他管理接口
    // Other management interface
    this.other = new Other(this);
  }
};

// src/web/wss/index.ts
var import_ws = __toESM(require("ws"), 1);
var ws;
var hbIntervalTimer;
var Connect = class {
  constructor(root) {
    this.root = root;
    /**
     * Get the assigned long connection address
     *
     * @param options - The connection information.
     * @param options.region - The region.
     * @param options.fullUrl - The fullUrl.
     * @returns { Promise<string> } WSS address
     *
     * @beta
     */
    this.getDispatch = async (options) => {
      let res;
      if (options?.fullUrl) {
        res = await this.root.request.get(options.fullUrl);
      } else if (options?.region) {
        res = await this.root.request.get(
          `https://${options?.region}-dispa.coolkit.${["cn", "test"].includes(options?.region) ? "cn" : "cc"}/dispatch/app`
        );
      } else {
        res = await this.root.request.get("https://dispa.coolkit.cc/dispatch/app");
      }
      let { port, domain, reason } = res;
      if (reason !== "ok")
        throw new Error("Long connection address acquisition failed");
      return `wss://${domain}:${port}/api/ws`;
    };
    // Creat a websocket heartbeat timer
    this.createHbTimer = ({ hb = 0, hbInterval = 145 } = {}) => {
      hbIntervalTimer && clearInterval(hbIntervalTimer);
      if (!hb)
        return;
      let intervalTime = Math.ceil(hbInterval * (0.8 + 0.2 * Math.random()));
      hbIntervalTimer = setInterval(() => {
        this.root.logObj?.info("Send ping: ping");
        ws.send("ping");
      }, intervalTime * 1e3);
      this.root.logObj?.info(`A timer for sending heartbeat packets has been created. Time interval: ${intervalTime}s`);
    };
    /**
     * Create a websocket connection
     * @param { baseInfo } options
     * @param onOpen - The onOpen event.
     * @param onClose - The onClose event.
     * @param onError - The onError event.
     * @param onMessage - The onMessage event.
     * @returns { Promise<WebSocket> } WebSocket instance
     *
     * @beta
     */
    this.create = async (options, onOpen, onClose, onError, onMessage) => {
      if (options?.fullUrl) {
        ws = new import_ws.default(options.fullUrl);
      } else {
        if (!options?.region)
          throw new Error("region is required");
        ws = new import_ws.default(await this.getDispatch({ region: options.region }));
      }
      ws.onopen = () => {
        this.root.logObj?.info("WebSocket connection has been established");
        const data = {
          action: "userOnline",
          at: options.at || this.root.at || "",
          apikey: options.userApiKey || this.root.userApiKey || "",
          appid: options.appId || this.root.appId || "",
          nonce: nonce(),
          userAgent: "app",
          sequence: (/* @__PURE__ */ new Date()).getTime().toString()
        };
        this.root.logObj?.info(`Send userOnline message: ${JSON.stringify(data)}`);
        ws?.send(JSON.stringify(data));
        if (onOpen) {
          onOpen(ws);
        }
      };
      ws.onclose = () => {
        if (hbIntervalTimer) {
          clearInterval(hbIntervalTimer);
          this.root.logObj?.info("WebSocket hbIntervalTimer cleared");
        }
        this.root.logObj?.info("WebSocket connection has been closed");
        ws && ws.close();
        if (onClose) {
          onClose();
        }
      };
      ws.onerror = (error) => {
        this.root.logObj?.info("WebSocket connection dropped, please reconnect, error: " + error.message);
        if (hbIntervalTimer) {
          clearInterval(hbIntervalTimer);
          this.root.logObj?.info("WebSocket hbIntervalTimer cleared");
        }
        if (onError) {
          onError(error);
        }
      };
      ws.onmessage = (message) => {
        this.root.logObj?.info("WebSocket response received: " + message.data);
        if (message.data.toString()[0] === "{" && JSON.parse(message.data.toString())?.config) {
          this.root.logObj?.info("WebSocket handshake succeeded, creating heartbeat timer");
          this.createHbTimer(JSON.parse(message.data.toString())?.config);
        }
        if (onMessage) {
          onMessage(ws, message);
        }
      };
      return ws;
    };
    // Get userOnline message for your own business
    this.getUserOnline = async (options) => {
      return JSON.stringify({
        action: "userOnline",
        at: options.at || this.root.at || "",
        apikey: options.userApiKey || this.root.userApiKey || "",
        appid: options.appId || this.root.appId || "",
        nonce: nonce(),
        userAgent: options?.userAgent || "app",
        sequence: (/* @__PURE__ */ new Date()).getTime().toString()
      });
    };
    /**
     * Generate messages to update device status
     *
     * @param deviceId - The device id.
     * @param params - The device status.
     * @param action - The action.
     * @param userAgent - The userAgent.
     * @param userApiKey  - The userApiKey.
     *
     * @returns { string } message
     *
     * @beta
     */
    this.getUpdateState = (deviceId, params, action, userAgent, userApiKey) => {
      const data = {
        action: action || "update",
        apikey: userApiKey || this.root.userApiKey,
        deviceid: deviceId,
        params,
        userAgent: userAgent || "app",
        nonce: nonce(),
        sequence: (/* @__PURE__ */ new Date()).getTime().toString()
      };
      return JSON.stringify(data);
    };
    /**
     * Update device status
     *
     * @param deviceId - The device id.
     * @param params - The device status.
     * @param action - The action.
     * @param userAgent - The userAgent.
     * @param userApiKey - The userApiKey.
     * @returns { null | undefined } null | undefined
     *
     * @beta
     */
    this.updateState = (deviceId, params, action, userAgent, userApiKey) => {
      if (ws.readyState !== 1) {
        this.root.logObj?.info("WebSocket is not connected");
        return null;
      }
      const data = this.getUpdateState(deviceId, params, action, userAgent, userApiKey);
      this.root.logObj?.info("Send update message:\uFF1A" + data);
      ws?.send(data);
    };
  }
};

// src/web/Ws.ts
var Ws = class extends eWeLinkBase {
  constructor() {
    super(...arguments);
    // WebSocket服务
    // WebSocket service
    this.Connect = new Connect(this);
  }
};

// src/web/Lan.ts
var import_bonjour_service = require("bonjour-service");
var import_crypto_js = __toESM(require("crypto-js"), 1);
var _logger;
var Lan = class {
  constructor(options) {
    this.selfApikey = "";
    this.zeroconf = {
      // 单通道设备开关
      /**
       * Switch single channel device
       */
      switch: async (controlOptions) => {
        return await this.generalRequest({
          ...controlOptions,
          path: "/zeroconf/switch",
          method: "post"
        });
      },
      // 多通道设备开关
      /**
       * Switch multiple channels
       */
      switches: async (controlOptions) => {
        return await this.generalRequest({
          ...controlOptions,
          path: "/zeroconf/switches",
          method: "post"
        });
      },
      // 调节灯的颜色、亮度、色温
      /**
       * Adjust the color, brightness, color temperature of the light
       */
      dimmable: async (controlOptions) => {
        return await this.generalRequest({
          ...controlOptions,
          path: "/zeroconf/dimmable",
          method: "post"
        });
      },
      // 网络指示灯开关
      /**
       * Switch network indicator light
       */
      sledOnline: async (controlOptions) => {
        return await this.generalRequest({
          ...controlOptions,
          path: "/zeroconf/sledonline",
          method: "post"
        });
      },
      // 设备上电状态设置
      /**
       * Set device power on status
       */
      startups: async (controlOptions) => {
        return await this.generalRequest({
          ...controlOptions,
          path: "/zeroconf/startups",
          method: "post"
        });
      },
      // 设备打开后自动关闭设置
      /**
       * Set device auto close after open
       */
      pulses: async (controlOptions) => {
        return await this.generalRequest({
          ...controlOptions,
          path: "/zeroconf/pulses",
          method: "post"
        });
      },
      // 传输是否加密
      /**
       * Whether to encrypt the transmission
       */
      encrypt: async (controlOptions) => {
        return await this.generalRequest({
          ...controlOptions,
          path: "/zeroconf/encrypt",
          method: "post"
        });
      },
      // 设置加密密码
      /**
       * Set encryption password
       */
      password: async (controlOptions) => {
        return await this.generalRequest({
          ...controlOptions,
          path: "/zeroconf/encrypt",
          method: "post"
        });
      }
    };
    if (!options)
      return;
    _logger = this.logObj = options.logObj;
    this.request = options.request || creatRequest(void 0, this.logObj);
    this.selfApikey = options.selfApikey;
  }
  /**
   * Discover eWeLink devices in LAN
   *
   * @param onDiscover - callback function
   * @param type - default: ewelink
   * @returns bonjourClient - Bonjour Object
   *
   * @beta
   */
  discovery(onDiscover, type = "ewelink") {
    const bonjourClient = new import_bonjour_service.Bonjour();
    bonjourClient.find({ type }, function(service) {
      if (_logger) {
        _logger.info("Found an eWeLink mDns server: ", service);
      }
      onDiscover(service);
    });
    return bonjourClient;
  }
  // getLocalServerList() {
  //   if (_logger) {
  //     _logger.info("lanServerList:", lanServerList);
  //   }
  //   return lanServerList;
  // }
  // getLocalServerDict() {
  //   if (_logger) {
  //     _logger.info("lanServerDict:", lanServerDict);
  //   }
  //   return lanServerDict;
  // }
  /**
   * data encrypt
   *
   * @param data -  data
   * @param secretKey - secretKey
   * @param iv - iv
   * @returns encrypted data - encrypted data
   *
   * @beta
   */
  encrypt(data, secretKey, iv) {
    if (!data)
      return "";
    const cipher = import_crypto_js.default.AES.encrypt(JSON.stringify(data), import_crypto_js.default.enc.Hex.parse(secretKey), {
      iv: import_crypto_js.default.enc.Base64.parse(iv),
      mode: import_crypto_js.default.mode.CBC,
      padding: import_crypto_js.default.pad.Pkcs7
    });
    return cipher.ciphertext.toString(import_crypto_js.default.enc.Base64);
  }
  /**
   * data decrypt
   * @param data -  encrypted data
   * @param secretKey - secretKey
   * @param iv - iv
   * @returns decrypted data - decrypted data
   *
   * @beta
   */
  decrypt(data, secretKey, iv) {
    if (!data)
      return {};
    return JSON.parse(
      import_crypto_js.default.AES.decrypt(data, import_crypto_js.default.enc.Hex.parse(secretKey), {
        iv: import_crypto_js.default.enc.Base64.parse(iv),
        mode: import_crypto_js.default.mode.CBC,
        padding: import_crypto_js.default.pad.Pkcs7
      }).toString(import_crypto_js.default.enc.Utf8)
    );
  }
  /**
   * Obtain the device's IP and port from the service
   *
   * @param server
   * @return ip - ip
   * @return port - port
   *
   * @beta
   */
  getDeviceIpPort(server) {
    if (server && server?.addresses) {
      const addresses = server.addresses || [];
      const ips = addresses.filter((ip) => {
        if (ip.length <= 32) {
          return {
            ip,
            port: server.port || 8081
          };
        }
      });
      if (ips.length > 0) {
        return {
          ip: ips[0],
          port: server.port || 8081
        };
      }
    }
    return {};
  }
  /**
   * General Request
   * @param serverOptions - serverOptions
   * @param serverOptions.method - Request method
   * @param serverOptions.ip - Device IP
   * @param serverOptions.port - Device port
   * @param serverOptions.path - Request path
   * @param serverOptions.deviceId - Device ID
   * @param serverOptions.data - Request data
   * @param serverOptions.encrypt - Whether to encrypt the request data
   * @param serverOptions.secretKey - Encryption password
   * @param serverOptions.iv - iv
   * @param serverOptions.selfApikey - selfApikey
   *
   * @returns response - Data returned by the device
   *
   * @beta
   */
  async generalRequest(serverOptions) {
    if (serverOptions.encrypt) {
      if (!serverOptions?.iv && !serverOptions?.secretKey) {
        return new Error("iv is required when encrypt is true");
      }
      serverOptions.data = this.encrypt(serverOptions.data, serverOptions.secretKey || "", serverOptions.iv || "");
    }
    const body = {
      deviceid: serverOptions.deviceId,
      sequence: (/* @__PURE__ */ new Date()).getTime().toString(),
      selfApikey: serverOptions.selfApikey || this.selfApikey,
      iv: serverOptions.iv,
      encrypt: serverOptions.encrypt,
      data: !serverOptions.encrypt ? JSON.stringify(serverOptions.data) : serverOptions.data
    };
    try {
      let requestConfig = {
        url: `http://${serverOptions.ip}:${serverOptions.port}${serverOptions.path}`,
        method: serverOptions.method.toLowerCase()
      };
      if (["post", "put", "patch", "putForm", "patchForm", "postForm"].includes(serverOptions.method.toLowerCase())) {
        requestConfig["data"] = body;
      } else {
        requestConfig["params"] = body;
      }
      return await this.request.request(requestConfig);
    } catch (error) {
      if (_logger) {
        _logger.error(error);
      }
      throw new Error("Request error, please check the network, or the device not online.");
    }
  }
};

// src/utils/logger.ts
var import_log4js = __toESM(require("log4js"), 1);
var import_path = __toESM(require("path"), 1);
var createLogger = (name, logLevel, filename) => {
  import_log4js.default.configure({
    appenders: {
      // allLog: { type: "dateFile", filename: "./logs/t", pattern: "yyyy-MM-dd.log", alwaysIncludePattern: true },
      // http请求日志  http请求日志需要引用一下， 这样才会自动记录每次的请求信息
      // HTTP request log HTTP request log requires app Use to quote, so that each request information can be automatically recorded
      httpLog: {
        type: "dateFile",
        filename: filename || import_path.default.join("logs", "default.log"),
        pattern: "yyyy-MM-dd",
        keepFileExt: true,
        alwaysIncludePattern: true,
        flags: "a"
        // 'a' is to append log, 'w' is the one before deletion
      }
    },
    categories: {
      default: { appenders: ["httpLog"], level: logLevel || "debug" }
    }
  });
  return import_log4js.default.getLogger(name);
};

// src/index.ts
var src_default = { WebAPI, Ws, Lan, createLogger, creatRequest };
