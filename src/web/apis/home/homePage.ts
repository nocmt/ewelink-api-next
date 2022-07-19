import { BaseWebAPI } from "../../WebAPI.js";
import { nonce } from "../../../utils/index.js";

export type accountInfo = {
  lang?: "en" | "cn";
  clientInfo?: string;
  getUser?: Object;
  getFamily?: Object;
  getThing?: Object;
  getScene?: Object;
  getMessage?: Object;
};

export interface HomePage extends BaseWebAPI {}

export class HomePage {
  async homePage(options: accountInfo) {
    const body = {
      lang: options?.lang,
      clientInfo: options?.clientInfo,
      getUser: options?.getUser,
      getFamily: options?.getFamily,
      getThing: options?.getThing,
      getScene: options?.getScene,
      getMessage: options?.getMessage
    };
    return await this.root.request.post("/v2/homepage", body, {
      headers: {
        "X-CK-Appid": this.root.appid || "",
        "X-CK-Nonce": nonce(),
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
