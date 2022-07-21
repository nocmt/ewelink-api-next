import { BaseWebAPI } from "../../WebAPI.js";

export type deviceInfo = {
  deviceid: string;
  apiKey: string;
};

export interface DelShare extends BaseWebAPI {}

export class DelShare {
  async delShare(options: deviceInfo) {
    const params = {
      deviceid: options.deviceid,
      apiKey: options.apiKey
    };
    return await this.root.request.delete("/v2/device/share", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
