import { BaseWebAPI } from "../../WebAPI.js";

export type deviceInfo = {
  id: string;
};

export interface DelDevice extends BaseWebAPI {}

export class DelDevice {
  async delDevice(options: deviceInfo) {
    return await this.root.request.delete("/v2/device", {
      params: {
        deviceid: options.id
      },
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
