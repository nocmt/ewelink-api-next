import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  region: string | "cn" | "as" | "us" | "eu" | "wx";
};

export interface Dispatch extends BaseWebAPI {}

export class Dispatch {
  async dispatch(options: baseInfo) {
    let url = `https://${options.region}-dispa.coolkit.${
      ["cn", "test", "wx"].includes(options.region) ? "cn" : "cc"
    }/dispatch/app`;
    if (options.region === "wx") {
      url = "https://wx-disp.coolkit.cn:8080/dispatch/app";
    }
    return await this.root.request.get(url, {});
  }
}
