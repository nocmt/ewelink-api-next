import { BaseWebAPI } from "../../WebAPI.js";

export interface Logout extends BaseWebAPI {}

export type accountInfo = {
  at?: string;
};

export class Logout {
  async logout(options: accountInfo) {
    return await this.root.request.delete("/v2/user/logout", {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Bearer ${options.at || this.root.at}`
      }
    });
  }
}
