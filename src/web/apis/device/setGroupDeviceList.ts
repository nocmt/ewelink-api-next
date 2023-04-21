import { BaseWebAPI } from "../../WebAPI.js";

export type groupInfo = {
  id: string;
  addDeviceidList: string[];
};

export interface SetGroupDeviceList extends BaseWebAPI {}

export class SetGroupDeviceList {
  async setGroupDeviceList(options: groupInfo) {
    if (options.addDeviceidList.length < 1 || options.addDeviceidList.length > 30) {
      throw new Error("addDeviceidList length must be between 1 and 30");
    }
    const body = {
      id: options.id,
      deviceidList: options.addDeviceidList
    };
    return await this.root.request.post("/v2/device/group/add", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
