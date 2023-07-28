import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  familyId?: string;
  idList: string[];
};

export interface SortRoom extends BaseWebAPI {}

export class SortRoom {
  /**
   * Sort Rooms
   * @description To change the order, you must designate the order of each room in the home.
   *
   * @param options - The base information.
   * @param options.familyId - option, The family id. Default is the current family.
   * @param options.idList - The room id list.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async sortRoom(options: baseInfo) {
    const body = {
      familyid: options?.familyId,
      idList: options.idList
    };
    return await this.root.request.post("/v2/family/room/index", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
