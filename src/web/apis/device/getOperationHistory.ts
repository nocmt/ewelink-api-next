import { BaseWebAPI } from "../../WebAPI.js";

export type thingInfo = {
  deviceid?: string;
  from?: string;
  num?: number | 30;
};

export interface GetOperationHistory extends BaseWebAPI {}

export class GetOperationHistory {
  async getOperationHistory(options: thingInfo) {
    if (options?.num && (options?.num < 0 || options?.num > 30)) {
      throw new Error("num must be between 0 and 30");
    }
    const params = {
      deviceid: options?.deviceid,
      from: options?.from,
      num: options?.num
    };
    return await this.root.request.get("/v2/device/history", {
      params: params,
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
