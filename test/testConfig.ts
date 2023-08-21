import eWeLink from "../src/index.js";

const client = new eWeLink.WebAPI({
  appId: "",
  appSecret: "",
  region: "us",
  logObj: eWeLink.createLogger("us")
});

const wsClient = new eWeLink.Ws({
  appId: "",
  appSecret: "",
  region: "us"
});

export { client, wsClient };
