import { BaseWebAPI } from "../../WebAPI.js";
import { nonce } from "../../../utils/index.js";

export type accountInfo = {
  oldPassword: string;
  newPassword: string;
};

export interface ChangePwd extends BaseWebAPI {}

export class ChangePwd {
  async changePwd(options: accountInfo) {
    const body = {
      oldPassword: options?.oldPassword,
      newPassword: options?.newPassword
    };
    return await this.root.request.post("/v2/user/change-pwd", body, {
      headers: {
        "X-CK-Appid": this.root.appid || "",
        "X-CK-Nonce": nonce(),
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
