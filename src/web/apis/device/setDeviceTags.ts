import { BaseWebAPI } from "../../WebAPI.js";

export type deviceInfo = {
  type?: string | "replace" | "merge";
  deviceId: string;
  tags: object;
};

export interface SetDeviceTags extends BaseWebAPI {}

export class SetDeviceTags {
  /**
   * Set the tags of the device
   *
   * @param options - The device information.
   * @param options.type - The type of the operation. 'replace' or 'merge'.
   * @param options.deviceId - The device id.
   * @param options.tags - The tags of the device.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setDeviceTags(options: deviceInfo) {
    const body = {
      type: options.type || "replace",
      deviceid: options.deviceId,
      tags: options.tags
    };
    return await this.root.request.post("/v2/device/tags", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
