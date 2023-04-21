import { BaseWebAPI } from "../../WebAPI.js";
import { sign } from "../../../utils/index.js";

export type baseInfo = {
  region: string;
  redirectUrl: string;
  code: string;
  grantType?: string | "authorization_code";
};

export interface GetToken extends BaseWebAPI {}

export class GetToken {
  async getToken(options: baseInfo) {
    const body = {
      redirectUrl: options.redirectUrl,
      code: options.code,
      grantType: options?.grantType ?? "authorization_code"
    };
    this.root.region = options.region;
    this.root.setUrl(options.region);
    return await this.root.request.post("/v2/user/oauth/token", body, {
      headers: {
        "X-CK-Appid": this.root.appId ?? "",
        Authorization: `Sign ${sign(body, this.root.appSecret ?? "")}`
      }
    });
  }
}
