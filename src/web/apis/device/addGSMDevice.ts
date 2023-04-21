import { BaseWebAPI } from "../../WebAPI.js";

export type deviceInfo = {
  name: string;
  id: string;
  familyid?: string;
  roomid?: string;
  sort?: 1 | 2;
};

export interface AddGSMDevice extends BaseWebAPI {}

export class AddGSMDevice {
  /**
   * Creates a new 4G、GPRS Device.
   * @returns full device info in 'response.data'
   * @param options
   */
  async addGSMDevice(options: deviceInfo) {
    const body = {
      name: options.name,
      id: options.id,
      familyid: options?.familyid,
      roomid: options?.roomid,
      sort: options?.sort
    };
    return await this.root.request.post("/v2/device/add-gsm", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
