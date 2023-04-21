import { BaseWebAPI } from "../../WebAPI.js";

export type groupInfo = {
  id: string;
  params: object;
};

export interface SetGroupStatus extends BaseWebAPI {}

export class SetGroupStatus {
  async setGroupStatus(options: groupInfo) {
    const body = {
      id: options.id,
      params: options.params
    };
    return await this.root.request.post("/v2/device/group/status", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
