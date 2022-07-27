import { BaseWebAPI } from "../../WebAPI.js";

export type homePageInfo = {
  familyId?: string;
  from?: string;
  num?: number | 30;
};

export interface GetMessage extends BaseWebAPI {}

export class GetMessage {
  async getMessage(options: homePageInfo) {
    const params = {
      lang: options?.familyId,
      from: options?.from,
      num: options?.num
    };
    return await this.root.request.get("/v2/message/read", {
      params: params,
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
