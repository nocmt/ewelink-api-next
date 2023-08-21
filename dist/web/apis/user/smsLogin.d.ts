import { BaseWebAPI } from "../../WebAPI.js";
export declare type accountInfo = {
    phoneNumber: string;
    areaCode: string;
    code: string;
    lang?: "en" | "cn";
};
export interface SMSLogin extends BaseWebAPI {
}
export declare class SMSLogin {
    /**
     * SMS Login
     * @description Only users registered by phone number in mainland China has access to this.
     *
     * @param options - The account information.
     * @param options.phoneNumber - The phone number.
     * @param options.areaCode - The area code.
     * @param options.code - Verification code.
     * @param options.lang - option, The language, cn or en. Default is cn.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    smsLogin(options: accountInfo): Promise<any>;
}
