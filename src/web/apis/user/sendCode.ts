import { BaseWebAPI } from "../../WebAPI.js";
import { nonce, sign } from "../../../utils/index.js";

export type accountInfo = {
  type: number | string;
  account: string;
};

export interface SendCode extends BaseWebAPI {}

export class SendCode {
  async sendCode(options: accountInfo) {
    const body = {
      type: options.type
    };
    body[`${options.account.indexOf("@") !== -1 ? "email" : "phoneNumber"}` as keyof typeof body] = options.account;
    body["type"] = Number(options.type);

    return await this.root.request.post("/v2/user/verification-code", body, {
      headers: {
        "X-CK-Appid": this.root.appid || "",
        "X-CK-Nonce": nonce(),
        Authorization: `Sign ${sign(body, this.root.appSecret || "")}`
      }
    });
  }
}
