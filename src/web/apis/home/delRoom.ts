import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  id: string;
};

export interface DelRoom extends BaseWebAPI {}

export class DelRoom {
  /**
   * Delete 1 room
   *
   * @param options - The room information.
   * @param options.id - The room id.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async delRoom(options: baseInfo) {
    const params = {
      id: options.id
    };
    return await this.root.request.delete("/v2/family/room", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
