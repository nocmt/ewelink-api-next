import { BaseWebAPI } from "../../WebAPI.js";

export type groupInfo = {
  id: string;
};

export interface DelGroup extends BaseWebAPI {}

export class DelGroup {
  /**
   * Delete a Group.
   *
   * @param options - The group information.
   * @param options.id - The group id.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async delGroup(options: groupInfo) {
    const params = {
      id: options.id
    };
    return await this.root.request.delete("/v2/device/group", {
      params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
