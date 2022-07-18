import { WebAPI } from "../src/index.js";
export const testConfig = {
    appid: "lzHjzT8NipCQpRSQbhNzZZoDuTAkcI1G",
    appSecret: "q75T54ondJlB8yioUdzBdAGBDzeEeDvK",
    region: "cn"
};
export const client = new WebAPI(testConfig);
// let c = await client.user.getRegion({ areaCode: "86" });
// console.debug(c.error);
