import { BaseWebAPI } from "../../WebAPI.js";

export type deviceInfo = {
  deviceInfoList: Array<{
    deviceId: string;
    model: string;
    version: string;
  }>;
};

export interface GetOTAInfo extends BaseWebAPI {}

export class GetOTAInfo {
  /**
   * Get Devices OTA info
   *
   * @param options - The device information.
   * @param options.deviceInfoList - The device information list.
   * @param options.deviceInfoList[].deviceId - The device id.
   * @param options.deviceInfoList[].model - The device model.
   * @param options.deviceInfoList[].version - The device current version.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getOTAInfo(options: deviceInfo) {
    let deviceInfoList: { deviceid: string; model: string; version: string }[] = [];
    options.deviceInfoList.forEach((item) => {
      deviceInfoList.push({
        deviceid: item.deviceId,
        model: item.model,
        version: item.version
      });
    });
    const body = {
      deviceInfoList: deviceInfoList
    };
    return await this.root.request.post("/v2/device/ota/query", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
