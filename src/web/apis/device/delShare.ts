import { BaseWebAPI } from "../../WebAPI.js";

export type deviceInfo = {
  deviceId: string;
  apiKey: string;
};

export interface DelShare extends BaseWebAPI {}

export class DelShare {
  /**
   * Cancel sharing device
   *
   * @param options - The device information.
   * @param options.deviceId - The device id.
   * @param options.apiKey - The user's apiKey.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
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
