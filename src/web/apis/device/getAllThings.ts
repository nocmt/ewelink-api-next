import { BaseWebAPI } from "../../WebAPI.js";

export type thingInfo = {
  familyId?: string;
  lang?: "en" | "cn";
  num?: number | 30;
  beginIndex?: number | -9999999;
};

export interface GetAllThings extends BaseWebAPI {}

export class GetAllThings {
  /**
   * Get all devices and groups under the user
   *
   * @param options - The things information.
   * @param options.familyId - option, The family id.
   * @param options.lang -  option, The language. 'en' or 'cn'.
   * @param options.num -  option, The number of things per page. Default is 0 means all things.
   * @param options.beginIndex - The index of the first thing. Default is -9999999.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getAllThings(options: thingInfo) {
    const params = {
      lang: options?.lang,
      familyid: options?.familyId,
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

  /**
   * Get all devices and groups under the user (All pages)
   *
   * @param options - The things information.
   * @param options.familyId - option, The family id.
   * @param options.lang -  option, The language. 'en' or 'cn'.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getAllThingsAllPages(options: thingInfo) {
    try {
      let isContinue: boolean = true;
      let beginIndex: number = -99999;
      let thingList: any[] = [];
      while (isContinue) {
        let res = await this.root.request.get("/v2/device/thing", {
          params: {
            lang: options?.lang,
            familyid: options?.familyId,
            num: 30,
            beginIndex: beginIndex
          },
          headers: {
            Authorization: `Bearer ${this.root.at}`
          }
        });
        if (res.error !== 0) {
          isContinue = false;
        } else {
          thingList = thingList.concat(res.data?.thingList);
          if (res.data?.thingList.length === 0 || thingList.length >= res.data?.total) {
            isContinue = false;
          } else {
            beginIndex = res.data?.thingList[res.data?.thingList.length - 1].index;
          }
        }
      }
      return { status: 200, error: 0, msg: "", data: { thingList, total: thingList.length } };
    } catch (err) {
      return { status: 500, error: 500, msg: err, data: { thingList: [], total: 0 } };
    }
  }
}
