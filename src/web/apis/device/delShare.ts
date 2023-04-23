import { BaseWebAPI } from "../../WebAPI.js";

export type deviceInfo = {
  deviceId: string;
  apiKey: string;
};

export interface DelShare extends BaseWebAPI {}

export class DelShare {
  async delShare(options: deviceInfo) {
    const params = {
      deviceid: options.deviceId,
      apikey: options.apiKey
    };
    return await this.root.request.delete("/v2/device/share", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
