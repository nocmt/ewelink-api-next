import { BaseWebAPI } from "../../WebAPI.js";

export type thingInfo = {
  thingList: Array<{
    type: number | 1 | 2;
    id: string;
    params: object;
  }>;
  timeout: number;
};

export interface SetAllThingStatus extends BaseWebAPI {}

export class SetAllThingStatus {
  async setAllThingStatus(options: thingInfo) {
    if (options.timeout < 0 || options.timeout > 8000) {
      throw new Error("timeout must be between 0 and 8000");
    }
    const body = {
      thingList: options.thingList,
      timeout: options.timeout
    };
    return await this.root.request.post("/v2/device/thing/batch-status", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
