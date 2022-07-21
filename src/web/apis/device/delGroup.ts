import { BaseWebAPI } from "../../WebAPI.js";

export type groupInfo = {
  id: string;
};

export interface DelGroup extends BaseWebAPI {}

export class DelGroup {
  async delGroup(options: groupInfo) {
    const params = {
      id: options.id
    };
    return await this.root.request.delete("/v2/device/group", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
