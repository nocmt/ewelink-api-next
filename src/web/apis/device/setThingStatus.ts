import { BaseWebAPI } from "../../WebAPI.js";

export type thingInfo = {
  type: number | 1 | 2;
  id: string;
  params: object;
};

export interface SetThingStatus extends BaseWebAPI {}

export class SetThingStatus {
  /**
   * Update the status of individual devices or groups
   *
   * @param options - The things information.
   * @param options.type - The things type. 1: user's own device, 2: devices shared by others.
   * @param options.id - The things id.
   * @param options.params - The things params.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
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
