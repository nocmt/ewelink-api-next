import { BaseWebAPI } from "../../WebAPI.js";

export type groupInfo = {
  id: string;
  delDeviceidList: string[];
};

export interface DelGroupDeviceList extends BaseWebAPI {}

export class DelGroupDeviceList {
  async delGroupDeviceList(options: groupInfo) {
    if (options.delDeviceidList.length < 1 || options.delDeviceidList.length > 30) {
      throw new Error("addDeviceidList length must be between 1 and 30");
    }
    const body = {
      id: options.id,
      deviceidList: options.delDeviceidList
    };
    return await this.root.request.post("/v2/device/group/delete", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
