import { BaseWebAPI } from "../../WebAPI.js";

export type accountInfo = {
  oldPassword: string;
  newPassword: string;
};

export interface ChangePwd extends BaseWebAPI {}

export class ChangePwd {
  /**
   * Change Password
   * @description After you have logged in, you can use this endpoint to change your password with your old password.
   *
   * @param options - The base information.
   * @param options.oldPassword - The old password.
   * @param options.newPassword - The new password.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async changePwd(options: accountInfo) {
    const body = {
      oldPassword: options?.oldPassword,
      newPassword: options?.newPassword
    };
    return await this.root.request.post("/v2/user/change-pwd", body, {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
