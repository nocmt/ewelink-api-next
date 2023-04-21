import { BaseWebAPI } from "../../WebAPI.js";

export type familyInfo = {
  familyId: string;
  name: string;
  sort: number | 1 | 2;
};

export interface AddRoom extends BaseWebAPI {}

export class AddRoom {
  async addRoom(options: familyInfo) {
    const body = {
      familyid: options.familyId,
      name: options.name,
      sort: options.sort
    };
    return await this.root.request.post("/v2/family/room", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
