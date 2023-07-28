import { BaseWebAPI } from "../../WebAPI.js";

export type deviceInfo = {
  user: {
    countryCode: string;
    phoneNumber?: string;
    email?: string;
  };
  deviceidList: string[];
  permit: number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 15;
  comment: string | "";
  shareType: number | 1;
};

export interface Share extends BaseWebAPI {}

export class Share {
  /**
   * Sharing devices
   *
   * @param options - The device information.
   * @param options.user - The user information.
   * @param options.user.countryCode - The user's countryCode.
   * @param options.user.phoneNumber - option, The user's phoneNumber.
   * @param options.user.email - option, The user's email.
   * @param options.deviceidList - The device id list.
   * @param options.permit - The sharing permissions.
   * @param options.comment - option, The sharing comment.
   * @param options.shareType - option, The sharing type.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async share(options: deviceInfo) {
    const body = {
      deviceidList: options.deviceidList,
      permit: options.permit,
      comment: options.comment,
      shareType: options.shareType,
      user: options.user
    };
    return await this.root.request.post("/v2/device/share", body, {
      headers: {
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
