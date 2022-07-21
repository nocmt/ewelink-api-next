import { BaseWebAPI } from "../../WebAPI.js";
import { hashSha256 } from "../../../utils/index.js";

export type deviceInfo = {
  name?: string;
  deviceid: string;
  settings?: {
    opsNotify?: 0 | 1;
    opsHistory?: 0 | 1;
    alarmNotify?: 0 | 1;
  };
  ifrCode?: string;
  deviceKey: string;
  chipid?: string;
  familyid?: string;
  roomid?: string;
  sort?: 1 | 2;
};

export interface AddDevice extends BaseWebAPI {}

export class AddDevice {
  async addDevice(options: deviceInfo) {
    const body = {
      name: options?.name || `MyDevice${options.deviceid.slice(-5)}`,
      deviceid: options.deviceid.toLowerCase(),
      settings: options?.settings,
      ifrCode: options?.ifrCode,
      digest: hashSha256(`${options.deviceid.toLowerCase()}${options.deviceKey}`),
      chipid: options?.chipid,
      familyid: options?.familyid,
      roomid: options?.roomid,
      sort: options?.sort
    };
    return await this.root.request.post("/v2/device/add", body, {
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
