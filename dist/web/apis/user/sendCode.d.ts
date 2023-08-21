import { BaseWebAPI } from "../../WebAPI.js";
export declare type accountInfo = {
    type: number | string;
    account: string;
};
export interface SendCode extends BaseWebAPI {
}
export declare class SendCode {
    /**
     * Send Verification Code
     * @description Send verification code to email or phone number.
     *
     * @param options - The account information.
     * @param options.type - The type of Verification code
     * @param options.account - The account.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    sendCode(options: accountInfo): Promise<any>;
}
