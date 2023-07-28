import { BaseWebAPI } from "../../WebAPI.js";
import { sign } from "../../../utils/index.js";

export type accountInfo = {
  account: string;
  newPassword: string;
  code: string;
};

export interface ResetPwd extends BaseWebAPI {}

export class ResetPwd {
  /**
   * Reset Password
   * @description When you forgot your password, reset password with this endpoint.
   *
   * @param options - The account information.
   * @param options.account - The account.
   * @param options.newPassword - The new password.
   * @param options.code - Verification code.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async resetPwd(options: accountInfo) {
    const body = {
      password: options.newPassword
    };
    body[`${options.account.indexOf("@") !== -1 ? "email" : "phoneNumber"}` as keyof typeof body] = options.account;
    const res = await this.root.request.post("/v2/user/reset-pwd", body, {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Sign ${sign(body, this.root.appSecret || "")}`
      }
    });
    if (res.status === 200 && res.error === 0) {
      // saveToken(res, options.account);
      this.root.account = options.account;
      this.root.at = res.data?.at;
      this.root.rt = res.data?.rt;
      this.root.userApiKey = res.data?.user?.apikey;
    }
    return res;
  }
}
