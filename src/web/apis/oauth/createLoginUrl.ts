import { BaseWebAPI } from "../../WebAPI.js";
import { nonce, sign } from "../../../utils/index.js";
import dayjs from "dayjs";

export type loginPageInfo = {
  redirectUrl: string;
  grantType?: string | "authorization_code";
  state: string;
};

export interface CreateLoginUrl extends BaseWebAPI {}

export class CreateLoginUrl {
  createLoginUrl(options: loginPageInfo): string {
    const seq = dayjs().valueOf();
    const params: { [key: string]: any } = {
      clientId: this.root.appId ?? "",
      redirectUrl: options.redirectUrl,
      grantType: options.grantType ?? "authorization_code",
      state: options.state,
      nonce: nonce(),
      seq: seq.toString(),
      authorization: sign(`${this.root.appId ?? ""}_${seq}`, this.root.appSecret ?? "")
    };
    return (
      `https://c2ccdn.coolkit.cc/oauth/index.html?` +
      Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join("&")
    ).replace("&auion", "&authorization");
  }
}
