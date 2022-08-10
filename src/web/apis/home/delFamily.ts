import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  id: string;
  deviceFamily: string;
  switchFamily: string;
};

export interface DelFamily extends BaseWebAPI {}

export class DelFamily {
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
