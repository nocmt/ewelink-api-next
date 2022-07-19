import { BaseWebAPI } from "../../WebAPI.js";
import { nonce } from "../../../utils/index.js";

export interface GetUserInfo extends BaseWebAPI {}

export class GetUserInfo {
  async getUserInfo() {
    return await this.root.request.get("/v2/user/profile", {
      headers: {
        "X-CK-Appid": this.root.appid || "",
        "X-CK-Nonce": nonce(),
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
