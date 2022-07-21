import { BaseWebAPI } from "../../WebAPI.js";
import { saveToken, sign } from "../../../utils/index.js";

export type accountInfo = {
  account: string;
  newPassword: string;
  code: string;
};

export interface ResetPwd extends BaseWebAPI {}

export class ResetPwd {
  async resetPwd(options: accountInfo) {
    const body = {
      password: options.newPassword
    };
    body[`${options.account.indexOf("@") !== -1 ? "email" : "phoneNumber"}` as keyof typeof body] = options.account;
    const res = await this.root.request.post("/v2/user/reset-pwd", body, {
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
