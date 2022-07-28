import { BaseWebAPI } from "../../WebAPI.js";

export type deviceInfo = {
  newName?: string;
  deviceId: string;
  newRoomId?: string;
};

export interface SetDeviceInfo extends BaseWebAPI {}

export class SetDeviceInfo {
  async setDeviceInfo(options: deviceInfo) {
    const body = {
      name: options?.newName,
      deviceid: options.deviceId,
      roomid: options?.newRoomId
    };
    return await this.root.request.post("/v2/device/update-info", body, {
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
