import { BaseWebAPI } from "../../WebAPI.js";
import { nonce, sign } from "../../../utils/index.js";
import { storage } from "../../../cache/index.js";
import dayjs from "dayjs";

export type accountInfo = {
  account: string;
  password: string;
  areaCode: string;
  verificationCode: string;
};

export interface Register extends BaseWebAPI {}

export class Register {
  async register(options: accountInfo) {
    const body = {
      verificationCode: options.verificationCode,
      countryCode: options.areaCode,
      password: options.password
    };
    body[`${options.account.indexOf("@") !== -1 ? "email" : "phoneNumber"}` as keyof typeof body] = options.account;
    const res = await this.root.request.post("/v2/user/register", body, {
      headers: {
        "X-CK-Appid": this.root.appid || "",
        "X-CK-Nonce": nonce(),
        Authorization: `Sign ${sign(body, this.root.appSecret || "")}`
      }
    });
    // 存储token
    if (res.status === 200 && res.error === 0) {
      storage.set(res.data.region, {
        [options.account]: {
          at: res.data.at,
          rt: res.data.rt,
          createTime: dayjs().format()
        }
      });
    }
    return res;
  }
}
