import { BaseWebAPI } from "../../WebAPI.js";
import { nonce } from "../../../utils/index.js";

export type baseInfo = {
  code: string;
};

export interface DeleteAccount extends BaseWebAPI {}

export class DeleteAccount {
  async deleteAccount(options: baseInfo) {
    const body = {
      verificationCode: options.code
    };
    return await this.root.request.post("/v2/user/close-account", body, {
      headers: {
        "X-CK-Appid": this.root.appid || "",
        "X-CK-Nonce": nonce(),
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
