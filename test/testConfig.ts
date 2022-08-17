// import { WebAPI, Ws } from "../src/index.js";
import eWeLink from "../src/index.js";

const client = new eWeLink.WebAPI({
  appId: "lzHjzT8NipCQpRSQbhNzZZoDuTAkcI1G",
  appSecret: "q75T54ondJlB8yioUdzBdAGBDzeEeDvK",
  region: "us",
  requestRecord: true
});

const wsClient = new eWeLink.Ws({
  appId: "lzHjzT8NipCQpRSQbhNzZZoDuTAkcI1G",
  appSecret: "q75T54ondJlB8yioUdzBdAGBDzeEeDvK",
  region: "us",
  requestRecord: true
});

client.syncLocalToken("us", "upymjh35902@chacuo.net");
wsClient.syncLocalToken("us", "upymjh35902@chacuo.net");
// if (createTime == null) {
//   client.user.login({ account: "upymjh35902@chacuo.net", password: "12345678", areaCode: "+1" });
// }
export { client, wsClient };
// let c = await client.user.getRegion({ areaCode: "86" });
// console.debug(c.error);
