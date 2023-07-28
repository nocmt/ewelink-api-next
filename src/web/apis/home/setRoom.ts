import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  id: string;
  newName: string;
};

export interface SetRoom extends BaseWebAPI {}

export class SetRoom {
  /**
   * Change Room Name
   * @description Currently, it only allows you to change the name of a room
   *
   * @param options - The base information.
   * @param options.id - The room id.
   * @param options.newName - The new room name.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setRoom(options: baseInfo) {
    const body = {
      id: options.id,
      name: options.newName
    };
    return await this.root.request.put("/v2/family/room", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
