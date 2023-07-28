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
   * Add a new 4G、GPRS Device.
   *
   * @param options - The device information.
   * @param options.name - The device name.
   * @param options.id - The GSM ID.
   * @param options.familyid - option, The device familyid.
   * @param options.roomid - option, The device roomid.
   * @param options.sort - The device sort. 1: positive sequence, 2: reverse sequence
   * @returns response - Please refer to the online API documentation
   *
   * @beta
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
