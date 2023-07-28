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
  /**
   * Obtain token using authorization code
   * @description Obtain token using authorization code
   *
   * @param options - baseInfo
   * @param options.region - The region
   * @param options.redirectUrl - The redirect URL after login
   * @param options.code - The authorization code
   * @param options.grantType - option, The grant type, default: `authorization_code`
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
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
