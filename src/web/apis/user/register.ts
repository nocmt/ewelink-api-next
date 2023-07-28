import { BaseWebAPI } from "../../WebAPI.js";
import { sign } from "../../../utils/index.js";

export type accountInfo = {
  account: string;
  password: string;
  areaCode: string;
  code: string;
};

export interface Register extends BaseWebAPI {}

export class Register {
  /**
   * register
   * @description register
   *
   * @param options - The account information.
   * @param options.account - The account.
   * @param options.password - The password.
   * @param options.areaCode - The area code.
   * @param options.code - Verification code.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async register(options: accountInfo) {
    const body = {
      verificationCode: options.code,
      countryCode: options.areaCode || "+1",
      password: options.password
    };
    body[`${options.account.indexOf("@") !== -1 ? "email" : "phoneNumber"}` as keyof typeof body] = options.account;
    const res = await this.root.request.post("/v2/user/register", body, {
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
