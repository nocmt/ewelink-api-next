import { BaseWebAPI } from "../../WebAPI.js";

export interface GetUserInfo extends BaseWebAPI {}

export class GetUserInfo {
  /**
   * Get User Info
   * @description Get the information of current account such as the nickname.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
   async getUserInfo() {
    return await this.root.request.get("/v2/user/profile", {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
