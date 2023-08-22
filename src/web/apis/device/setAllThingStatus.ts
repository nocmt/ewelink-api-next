import { BaseWebAPI } from "../../WebAPI.js";

export type thingInfo = {
  thingList: Array<{
    type: number | 1 | 2;
    id: string;
    params: object;
  }>;
  timeout?: number;
};

export interface SetAllThingStatus extends BaseWebAPI {}

export class SetAllThingStatus {
  /**
   * Set the status of the device or group
   *
   * @param options - The things information.
   * @param options.thingList - The things information.
   * @param options.thingList.type - The things type. 1: user's own device, 2: devices shared by others.
   * @param options.thingList.id - The things id.
   * @param options.thingList.params - The things params.
   * @param options.timeout - The timeout. 0-8000ms.default 0ms.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setAllThingStatus(options: thingInfo) {

    options.timeout = !options.timeout ? 0 : options.timeout
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
