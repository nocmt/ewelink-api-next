import { BaseWebAPI } from "../../WebAPI.js";

export type homePageInfo = {
  lang?: "en" | "cn";
  clientInfo?: {
    model?: string;
    os?: "Android" | "iOS";
    imei?: string;
    romVersion?: string;
    appVersion?: string;
  };
  getUser?: Object;
  getFamily?: Object;
  getThing?: {
    num?: number | 30;
    beginIndex?: number | -9999999;
  };
  getScene?: Object;
  getMessage?: {
    from?: number;
    num?: number | 30;
  };
};

export interface HomePage extends BaseWebAPI {}

export class HomePage {
  async homePage(options: homePageInfo) {
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
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
