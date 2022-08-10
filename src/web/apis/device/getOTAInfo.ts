import { BaseWebAPI } from "../../WebAPI.js";

export type deviceInfo = {
  deviceInfoList: Array<{
    deviceid: string;
    model: string;
    version: string;
  }>;
};

export interface GetOTAInfo extends BaseWebAPI {}

export class GetOTAInfo {
  async getOTAInfo(options: deviceInfo) {
    const body = {
      deviceInfoList: options.deviceInfoList
    };
    return await this.root.request.post("/v2/device/ota/query", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
