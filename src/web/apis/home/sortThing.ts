import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  familyid?: string;
  thingList: Array<{
    itemTyp: string;
    id: string;
  }>;
};

export interface SortThing extends BaseWebAPI {}

export class SortThing {
  async sortThing(options: baseInfo) {
    const body = {
      familyid: options?.familyid,
      thingList: options.thingList
    };
    return await this.root.request.post("/v2/family/thing/sort", body, {
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
