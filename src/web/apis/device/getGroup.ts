import { BaseWebAPI } from "../../WebAPI.js";
export type baseInfo = {
  lang?: "cn" | "en";
};

export interface GetGroup extends BaseWebAPI {}

export class GetGroup {
  async getGroup(options: baseInfo) {
    const params = {
      lang: options?.lang
    };
    return await this.root.request.get("/v2/device/group", {
      params: params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
