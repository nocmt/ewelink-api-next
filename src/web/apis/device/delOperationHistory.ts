import { BaseWebAPI } from "../../WebAPI.js";

export type thingInfo = {
  deviceId: string;
};

export interface DelOperationHistory extends BaseWebAPI {}

export class DelOperationHistory {
  async delOperationHistory(options: thingInfo) {
    const params = {
      deviceid: options.deviceId
    };
    return await this.root.request.delete("/v2/device/history", {
      params: params,
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
