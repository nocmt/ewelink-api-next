import { BaseWebAPI } from "../../WebAPI.js";
import { sign } from "../../../utils/index.js";

export type accountInfo = {
  account: string;
  password: string;
  areaCode: string;
  lang?: "en" | "cn";
};

export interface Login extends BaseWebAPI {}

export class Login {
  async login(options: accountInfo) {
    const body = {
      countryCode: options.areaCode,
      password: options.password
    };
    body[`${options.account.indexOf("@") !== -1 ? "email" : "phoneNumber"}` as keyof typeof body] = options.account;
    if (options?.lang) {
      body["lang" as keyof typeof body] = options.lang;
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
}
