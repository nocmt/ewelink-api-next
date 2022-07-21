import { BaseWebAPI } from "../../WebAPI.js";

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
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
