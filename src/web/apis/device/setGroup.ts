import { BaseWebAPI } from "../../WebAPI.js";

export type groupInfo = {
  newName: string;
  id: string;
};

export interface SetGroup extends BaseWebAPI {}

export class SetGroup {
  async setGroup(options: groupInfo) {
    const body = {
      name: options.newName,
      id: options.id
    };
    return await this.root.request.put("/v2/device/group", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
