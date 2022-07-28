import { BaseWebAPI } from "../../WebAPI.js";
import { saveToken, sign } from "../../../utils/index.js";

export type accountInfo = {
  phoneNumber: string;
  areaCode: string;
  code: string;
  lang?: "en" | "cn";
};

export interface SMSLogin extends BaseWebAPI {}

export class SMSLogin {
  async smsLogin(options: accountInfo) {
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
      saveToken(res, options.phoneNumber);
      this.root.account = options.phoneNumber;
      this.root.token = res.data?.at;
    }
    return res;
  }
}
