import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  id?: string;
  newName: string;
};

export interface SetFamily extends BaseWebAPI {}

export class SetFamily {
  async setFamily(options: baseInfo) {
    const body = {
      id: options?.id,
      name: options.newName
    };
    return await this.root.request.put("/v2/family", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
