import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  roomId: string;
  oldThingList: string[];
  newThingList: string[];
};

export interface SetThing extends BaseWebAPI {}

export class SetThing {
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
