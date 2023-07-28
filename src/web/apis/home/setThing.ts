import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  roomId: string;
  oldThingList: string[];
  newThingList: string[];
};

export interface SetThing extends BaseWebAPI {}

export class SetThing {
  /**
   * Move Things
   * @description Move groups and devices to a specified room
   *
   * @param options - The base information.
   * @param options.roomId - The room id.
   * @param options.oldThingList - The old thing list.
   * @param options.newThingList - The new thing list.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setThing(options: baseInfo) {
    const body = {
      roomid: options.roomId,
      oldThingList: options.oldThingList,
      newThingList: options.newThingList
    };
    return await this.root.request.post("/v2/family/room/thing", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
