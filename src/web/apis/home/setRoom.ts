import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  id: string;
  newName: string;
};

export interface SetRoom extends BaseWebAPI {}

export class SetRoom {
  async setRoom(options: baseInfo) {
    const body = {
      id: options.id,
      name: options.newName
    };
    return await this.root.request.put("/v2/family/room", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
