import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  familyid?: string;
  idList: string[];
};

export interface SortRoom extends BaseWebAPI {}

export class SortRoom {
  async sortRoom(options: baseInfo) {
    const body = {
      familyid: options?.familyid,
      idList: options.idList
    };
    return await this.root.request.post("/v2/family/room/index", body, {
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
