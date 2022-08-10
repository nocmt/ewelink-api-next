import { BaseWebAPI } from "../../WebAPI.js";
import { hashSha256 } from "../../../utils/index.js";

export type deviceInfo = {
  name?: string;
  deviceId: string;
  settings?: {
    opsNotify?: 0 | 1;
    opsHistory?: 0 | 1;
    alarmNotify?: 0 | 1;
  };
  ifrCode?: string;
  deviceKey: string;
  chipId?: string;
  familyId?: string;
  roomId?: string;
  sort?: 1 | 2;
};

export interface AddDevice extends BaseWebAPI {}

export class AddDevice {
  async addDevice(options: deviceInfo) {
    const body = {
      name: options?.name || `MyDevice${options.deviceId.slice(-5)}`,
      deviceid: options.deviceId.toLowerCase(),
      settings: options?.settings,
      ifrCode: options?.ifrCode,
      digest: hashSha256(`${options.deviceId.toLowerCase()}${options.deviceKey}`),
      chipid: options?.chipId,
      familyid: options?.familyId,
      roomid: options?.roomId,
      sort: options?.sort
    };
    return await this.root.request.post("/v2/device/add", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
