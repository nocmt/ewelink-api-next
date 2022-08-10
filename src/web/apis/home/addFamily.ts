import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  name: string;
  sort: number | 1 | 2;
  roomNameList?: string[];
};

export interface AddFamily extends BaseWebAPI {}

export class AddFamily {
  async addFamily(options: baseInfo) {
    const body = {
      name: options.name,
      sort: options.sort,
      roomNameList: options?.roomNameList
    };
    return await this.root.request.post("/v2/family", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
