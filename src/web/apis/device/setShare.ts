import { BaseWebAPI } from "../../WebAPI.js";

export type deviceInfo = {
  deviceId: string;
  apiKey: string;
  permit: number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 15;
};

export interface SetShare extends BaseWebAPI {}

export class SetShare {
  async setShare(options: deviceInfo) {
    const body = {
      deviceId: options.deviceId,
      apiKey: options.apiKey,
      permit: options.permit
    };
    return await this.root.request.post("/v2/device/share/permit", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
