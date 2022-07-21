import { BaseWebAPI } from "../../WebAPI.js";

export type deviceInfo = {
  deviceid: string;
};

export interface DelDevice extends BaseWebAPI {}

export class DelDevice {
  async delDevice(options: deviceInfo) {
    return await this.root.request.delete("/v2/device/update-info", {
      params: {
        deviceid: options.deviceid
      },
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
