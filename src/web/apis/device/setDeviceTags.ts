import { BaseWebAPI } from "../../WebAPI.js";

export type deviceInfo = {
  type: string | "replace" | "merge";
  deviceId: string;
  tags: object;
};

export interface SetDeviceTags extends BaseWebAPI {}

export class SetDeviceTags {
  async setDeviceTags(options: deviceInfo) {
    const body = {
      type: options.type,
      deviceid: options.deviceId,
      tags: options.tags
    };
    return await this.root.request.post("/v2/device/tags", body, {
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
