import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  id: string;
};

export interface DelRoom extends BaseWebAPI {}

export class DelRoom {
  async delRoom(options: baseInfo) {
    const params = {
      id: options.id
    };
    return await this.root.request.delete("/v2/family/room", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
