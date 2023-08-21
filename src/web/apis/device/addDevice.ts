import { BaseWebAPI } from "../../WebAPI.js";
import { hashSha256 } from "../../../utils/index.js";

export type deviceInfo = {
  name?: string; // default: `MyDevice${options.deviceId.slice(-5)}`
  deviceId: string; // required，deviceid
  settings?: {
    // optional
    opsNotify?: 0 | 1; // 0: disable, 1: enable
    opsHistory?: 0 | 1; // 0: disable, 1: enable
    alarmNotify?: 0 | 1; // 0: disable, 1: enable
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
  /**
   * Add a new Wi-Fi Device.
   *
   * @param options - The device information.
   * @param options.name - option, The device name.
   * @param options.deviceId - The device id.
   * @param options.settings - option, The device settings.
   * @param options.settings.opsNotify - option, The device settings.
   * @param options.settings.opsHistory - option, The device settings.
   * @param options.settings.alarmNotify - option, The device settings.
   * @param options.ifrCode - option, Code value of infrared devices.
   * @param options.deviceKey - The device apikey.
   * @param options.chipId - The device chipid.
   * @param options.familyId - option, The device familyId.
   * @param options.roomId - option, The device roomId.
   * @param options.sort - The device sort. 1: positive sequence, 2: reverse sequence
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
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
