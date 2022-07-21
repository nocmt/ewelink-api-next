import { BaseWebAPI } from "../../WebAPI.js";
import { saveToken, sign } from "../../../utils/index.js";

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
      countryCode: options?.areaCode || "+1",
      password: options?.password
    };
    body[`${options.account.indexOf("@") !== -1 ? "email" : "phoneNumber"}` as keyof typeof body] = options.account;
    const res = await this.root.request.post("/v2/user/login", body, {
      headers: {
        "X-CK-Appid": this.root.appid || "",
        Authorization: `Sign ${sign(body, this.root.appSecret || "")}`
      }
    });
    if (res.status === 200 && res.error === 0) {
      saveToken(res, options.account);
      this.root.account = options.account;
      this.root.token = res.data?.at;
    }
    return res;
  }
}
