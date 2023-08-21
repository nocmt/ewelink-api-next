import { BaseWebAPI } from "../../WebAPI.js";
export declare type accountInfo = {
    account: string;
    newPassword: string;
    code: string;
};
export interface ResetPwd extends BaseWebAPI {
}
export declare class ResetPwd {
    /**
     * Reset Password
     * @description When you forgot your password, reset password with this endpoint.
     *
     * @param options - The account information.
     * @param options.account - The account.
     * @param options.newPassword - The new password.
     * @param options.code - Verification code.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    resetPwd(options: accountInfo): Promise<any>;
}
