import { BaseWebAPI } from "../../WebAPI.js";
import { saveToken } from "../../../utils/index.js";

export type accountInfo = {
  account: string;
  rt: string;
};

export interface RefreshToken extends BaseWebAPI {}

export class RefreshToken {
  async refreshToken(options: accountInfo) {
    const body = {
      rt: options.rt
    };
    const res = await this.root.request.post("/v2/user/refresh", body, {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Sign ${body}`
      }
    });
    if (res.status === 200 && res.error === 0) {
      saveToken(res, options.account);
      this.root.token = res.data?.at;
    }
    return res;
  }
}
