import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  region: string | "cn" | "as" | "us" | "eu" | "wx";
};

export interface Dispatch extends BaseWebAPI {}

export class Dispatch {
  async dispatch(options: baseInfo) {
    const dispatchUrls = {
      cn: "https://cn-dispa.coolkit.cn/dispatch/app",
      us: "https://us-dispa.coolkit.cc/dispatch/app",
      eu: "https://eu-dispa.coolkit.cc/dispatch/app",
      as: "https://as-dispa.coolkit.cc/dispatch/app",
      wx: "https://wx-disp.coolkit.cn:8080/dispatch/app"
    };
    let url;
    // @ts-ignore
    if (dispatchUrls[options.region]) {
      // @ts-ignore
      url = dispatchUrls[options.region] as keyof typeof dispatchUrls;
    } else {
      url = `https://${options.region}-dispa.coolkit.cc/dispatch/app`;
    }
    return await this.root.request.get(url, {});
  }
}
