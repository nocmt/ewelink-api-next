import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  id: string;
  deviceFamily: string;
  switchFamily: string;
};

export interface DelFamily extends BaseWebAPI {}

export class DelFamily {
  /**
   * Delete 1 family
   *
   * @param options - The family information.
   * @param options.id - The family id.
   * @param options.deviceFamily - Family ID of mobile device.
   * @param options.switchFamily - Family ID of switch.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async delFamily(options: baseInfo) {
    const params = {
      id: options.id,
      deviceFamily: options.deviceFamily,
      switchFamily: options.switchFamily
    };
    return await this.root.request.delete("/v2/family", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
