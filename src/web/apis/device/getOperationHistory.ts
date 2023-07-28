import { BaseWebAPI } from "../../WebAPI.js";

export type thingInfo = {
  deviceId: string;
  from?: string;
  num?: number | 30;
};

export interface GetOperationHistory extends BaseWebAPI {}

export class GetOperationHistory {
  /**
   * Get Device operation history
   *
   * @param options - The things information.
   * @param options.deviceId - The device id.
   * @param options.from - The start time of the query, in the format of timestamp, such as 1614211200000.
   * @param options.num - The number of records to query, the default is 30, and the maximum is 30.
   *
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async getOperationHistory(options: thingInfo) {
    if (options?.num && (options?.num < 0 || options?.num > 30)) {
      throw new Error("num must be between 0 and 30");
    }
    const params = {
      deviceid: options?.deviceId,
      from: options?.from,
      num: options?.num
    };
    return await this.root.request.get("/v2/device/history", {
      params: params,
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
