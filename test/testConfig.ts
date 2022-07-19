import { WebAPI } from "../src/index.js";

export const testConfig = {
  appid: "lzHjzT8NipCQpRSQbhNzZZoDuTAkcI1G",
  appSecret: "q75T54ondJlB8yioUdzBdAGBDzeEeDvK",
  region: "us",
  requestRecord: true
};

const client = new WebAPI(testConfig);

client.syncLocalToken("us", "upymjh35902@chacuo.net");
// if (createTime == null) {
//   client.user.login({ account: "upymjh35902@chacuo.net", password: "12345678", areaCode: "+1" });
// }
export { client };
// let c = await client.user.getRegion({ areaCode: "86" });
// console.debug(c.error);
