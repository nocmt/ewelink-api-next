import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  lang?: "en" | "cn";
};

export interface GetFamily extends BaseWebAPI {}

export class GetFamily {
  async getFamily(options: baseInfo) {
    const params = {
      lang: options?.lang
    };
    return await this.root.request.get("/v2/family", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
