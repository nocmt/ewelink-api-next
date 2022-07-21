import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  familyid: string;
};

export interface SetThing extends BaseWebAPI {}

export class SetThing {
  async setThing(options: baseInfo) {
    const body = {
      id: options.familyid
    };
    return await this.root.request.post("/v2/family/current", body, {
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
