import { BaseWebAPI } from "../../WebAPI.js";

export type homePageInfo = {
  familyid?: string;
  from?: string;
  num?: number | 30;
};

export interface GetMessage extends BaseWebAPI {}

export class GetMessage {
  async getMessage(options: homePageInfo) {
    const body = {
      lang: options?.familyid,
      from: options?.from,
      num: options?.num
    };
    return await this.root.request.post("/v2/message/read", body, {
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
