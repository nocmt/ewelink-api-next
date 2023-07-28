import { BaseWebAPI } from "../../WebAPI.js";

export type baseInfo = {
  id?: string;
  newName: string;
};

export interface SetFamily extends BaseWebAPI {}

export class SetFamily {
  /**
   * Change Home Name
   * @description Currently, it only allows you to change the name of a home
   *
   * @param options - The base information.
   * @param options.id - option, The family id. Default is the current family.
   * @param options.newName - The new family name.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async setFamily(options: baseInfo) {
    const body = {
      id: options?.id,
      name: options.newName
    };
    return await this.root.request.put("/v2/family", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
