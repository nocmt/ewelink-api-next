import { BaseWebAPI } from "../../WebAPI.js";
export declare type accountInfo = {
    account: string;
    password: string;
    areaCode: string;
    lang?: "en" | "cn";
};
export interface Login extends BaseWebAPI {
}
export declare class Login {
    /**
     * Login
     * @description You should log in before you access device data or other resources
     *
     * @param options - The account information.
     * @param options.account - The account.
     * @param options.password - The password.
     * @param options.areaCode - The area code.
     * @param options.lang - option, The language, cn or en. Default is cn.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    login(options: accountInfo): Promise<any>;
}
