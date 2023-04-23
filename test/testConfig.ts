import eWeLink from "../src/index.js";

const client = new eWeLink.WebAPI({
  appId: "lzHjzT8NipCQpRSQbhNzZZoDuTAkcI1G",
  appSecret: "q75T54ondJlB8yioUdzBdAGBDzeEeDvK",
  region: "us",
  logObj: eWeLink.createLogger("us")
});

const wsClient = new eWeLink.Ws({
  appId: "lzHjzT8NipCQpRSQbhNzZZoDuTAkcI1G",
  appSecret: "q75T54ondJlB8yioUdzBdAGBDzeEeDvK",
  region: "us"
});

export { client, wsClient };
