import { BaseWebAPI } from "../../WebAPI.js";

export type groupInfo = {
  newName: string;
  id: string;
};

export interface SetGroup extends BaseWebAPI {}

export class SetGroup {
  /**
   * Update the name of the group
   *
   * @param options - The group information.
   * @param options.newName - The new name of the group.
   * @param options.id - The group id.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setGroup(options: groupInfo) {
    const body = {
      name: options.newName,
      id: options.id
    };
    return await this.root.request.put("/v2/device/group", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
