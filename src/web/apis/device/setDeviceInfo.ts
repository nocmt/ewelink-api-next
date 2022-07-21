import { BaseWebAPI } from "../../WebAPI.js";

export type deviceInfo = {
  newName?: string;
  deviceid: string;
  newRoomid?: string;
};

export interface SetDeviceInfo extends BaseWebAPI {}

export class SetDeviceInfo {
  async setDeviceInfo(options: deviceInfo) {
    const body = {
      name: options?.newName,
      deviceid: options.deviceid,
      roomid: options?.newRoomid
    };
    return await this.root.request.post("/v2/device/update-info", body, {
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
