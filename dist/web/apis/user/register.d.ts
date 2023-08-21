import { BaseWebAPI } from "../../WebAPI.js";
export declare type accountInfo = {
    account: string;
    password: string;
    areaCode: string;
    code: string;
};
export interface Register extends BaseWebAPI {
}
export declare class Register {
    /**
     * register
     * @description register
     *
     * @param options - The account information.
     * @param options.account - The account.
     * @param options.password - The password.
     * @param options.areaCode - The area code.
     * @param options.code - Verification code.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    register(options: accountInfo): Promise<any>;
}
