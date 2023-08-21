import { BaseWebAPI } from "../../WebAPI.js";

export type accountInfo = {
  rt?: string;
};

export interface RefreshToken extends BaseWebAPI {}

export class RefreshToken {
  /**
   * Refresh Access Token
   * @description 'access token' expires in 30 days (for security reasons) by default. When this happens, no need to log in again to GET@'access token', just use 'Refresh Token' endpoint to refresh the 'access token'.
   *
   * @param options - The account information.
   * @param options.rt - Refresh token.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async refreshToken(options: accountInfo) {
    const body = {
      rt: options.rt || this.root.rt
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
