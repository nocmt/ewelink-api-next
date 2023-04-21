import { BaseWebAPI } from "../../WebAPI.js";

export type thingInfo = {
  type: number | 1 | 2;
  id: string;
  params?: string;
};

export interface GetThingStatus extends BaseWebAPI {}

export class GetThingStatus {
  async getThingStatus(options: thingInfo) {
    const params = {
      type: options.type,
      id: options.id,
      params: options?.params
    };
    return await this.root.request.get("/v2/device/thing/status", {
      params: params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
