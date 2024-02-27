import eWeLink from "../src/index.js";

const _config = {
  appId: "", // 内部项目eWeLink-API-Next测试
  appSecret: "",
  region: "us",
  logObj: eWeLink.createLogger("us")
};

export const client = new eWeLink.WebAPI(_config);

export const wsClient = new eWeLink.Ws(_config);
