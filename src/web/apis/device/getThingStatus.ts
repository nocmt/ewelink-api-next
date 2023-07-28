import { BaseWebAPI } from "../../WebAPI.js";

export type thingInfo = {
  type: number | 1 | 2;
  id: string;
  params?: string;
};

export interface GetThingStatus extends BaseWebAPI {}

export class GetThingStatus {
  /**
   * Get Device Status
   *
   * @param options - The things information.
   * @param options.type - The things type. 1: user's own device, 2: devices shared by others.
   * @param options.id - The things id.
   * @param options.params - option, The things params.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
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
