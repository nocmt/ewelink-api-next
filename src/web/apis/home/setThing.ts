import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  roomid: string;
  oldThingList: string[];
  newThingList: string[];
};

export interface SetThing extends BaseWebAPI {}

export class SetThing {
  async setThing(options: baseInfo) {
    const body = {
      roomid: options.roomid,
      oldThingList: options.oldThingList,
      newThingList: options.newThingList
    };
    return await this.root.request.post("/v2/family/room/thing", body, {
      headers: {
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
