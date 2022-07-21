import { BaseWebAPI } from "../../WebAPI.js";
export type groupInfo = {
  name: string;
  mainDeviceId: string;
  familyid?: string;
  roomid?: string;
  sort?: 1 | 2;
  deviceidList?: string[];
};

export interface AddGroup extends BaseWebAPI {}

export class AddGroup {
  async addGroup(options: groupInfo) {
    const body = {
      name: options.name,
      mainDeviceId: options.mainDeviceId,
      familyid: options?.familyid,
      roomid: options?.roomid,
      sort: options?.sort,
      deviceidList: options?.deviceidList || []
    };
    return await this.root.request.post("/v2/device/group", body, {
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
