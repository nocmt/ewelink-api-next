import { BaseWebAPI } from "../../WebAPI.js";
export declare type accountInfo = {
    oldPassword: string;
    newPassword: string;
};
export interface ChangePwd extends BaseWebAPI {
}
export declare class ChangePwd {
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
    changePwd(options: accountInfo): Promise<any>;
}
