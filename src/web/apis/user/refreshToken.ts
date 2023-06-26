import { BaseWebAPI } from "../../WebAPI.js";

export type accountInfo = {
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
      // saveToken(res, options.account);
      this.root.at = res.data?.at;
      this.root.rt = res.data?.rt;
      this.root.userApiKey = res.data?.user?.apikey;
    }
    return res;
  }
}
