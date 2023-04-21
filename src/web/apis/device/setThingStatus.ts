import { BaseWebAPI } from "../../WebAPI.js";

export type thingInfo = {
  type: number | 1 | 2;
  id: string;
  params: object;
};

export interface SetThingStatus extends BaseWebAPI {}

export class SetThingStatus {
  async setThingStatus(options: thingInfo) {
    const body = {
      type: options.type,
      id: options.id,
      params: options.params
    };
    return await this.root.request.post("/v2/device/thing/status", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
