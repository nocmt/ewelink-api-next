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
  /**
   * HomePage
   * @description Allows you to check messages, scenes, things, homes, and user info.
   *
   * @param options - The home page information.
   * @param options.lang - option, The language. en: English, cn: Chinese.
   * @param options.clientInfo - option, The client information.
   * @param options.clientInfo.model - option, The client model.
   * @param options.clientInfo.os - option, The client os.
   * @param options.clientInfo.imei - option, The client imei.
   * @param options.clientInfo.romVersion - option, The client romVersion.
   * @param options.clientInfo.appVersion - option, The client appVersion.
   * @param options.getUser - option, The user information.
   * @param options.getFamily - option, The family information.
   * @param options.getThing - option, The thing information.
   * @param options.getThing.num - option, The thing num.
   * @param options.getThing.beginIndex - option, The thing beginIndex.
   * @param options.getScene - option, The scene information.
   * @param options.getMessage - option, The message information.
   * @param options.getMessage.from - option, The message from.
   * @param options.getMessage.num - option, The message num.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */

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
