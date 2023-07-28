import { BaseWebAPI } from "../../WebAPI.js";

export interface Logout extends BaseWebAPI {}

export type accountInfo = {
  at?: string;
};

export class Logout {
  /**
   * logout
   * @description logout
   *
   * @param options - The base information.
   * @param options.at - option, The access token, default is the current access token.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async logout(options: accountInfo) {
    return await this.root.request.delete("/v2/user/logout", {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Bearer ${options.at || this.root.at}`
      }
    });
  }
}
