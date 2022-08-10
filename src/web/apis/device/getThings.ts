import { BaseWebAPI } from "../../WebAPI.js";

export type thingInfo = {
  thingList: {
    itemType: Number | 1 | 2 | 3;
    id: string;
  };
};

export interface GetThings extends BaseWebAPI {}

export class GetThings {
  async getThings(options: thingInfo) {
    const body = {
      thingList: options.thingList
    };
    return await this.root.request.post("/v2/device/thing", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
