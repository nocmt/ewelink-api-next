import { BaseWebAPI } from "../../WebAPI.js";

export type thingInfo = {
  familyid?: string;
  lang?: "en" | "cn";
  num?: number | 30;
  beginIndex?: number | -9999999;
};

export interface GetAllThings extends BaseWebAPI {}

export class GetAllThings {
  async getAllThings(options: thingInfo) {
    const params = {
      lang: options?.lang,
      familyid: options?.familyid,
      num: options?.num,
      beginIndex: options?.beginIndex
    };
    return await this.root.request.get("/v2/device/thing", {
      params: params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
