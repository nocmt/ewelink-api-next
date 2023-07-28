import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  region: string | "cn" | "as" | "us" | "eu" | "wx";
};

export interface Dispatch extends BaseWebAPI {}

export class Dispatch {
  /**
   * Obtain the info for establishing a WebSocket connection
   * @description Obtain the info for establishing a WebSocket connection
   *
   * @param options - baseInfo
   * @param options.region - The region of the user's account
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
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
