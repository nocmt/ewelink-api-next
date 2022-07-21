import { BaseWebAPI } from "../../WebAPI.js";

export type thingInfo = {
  deviceid?: string;
};

export interface DelOperationHistory extends BaseWebAPI {}

export class DelOperationHistory {
  async delOperationHistory(options: thingInfo) {
    const params = {
      deviceid: options?.deviceid
    };
    return await this.root.request.delete("/v2/device/history", {
      params: params,
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
