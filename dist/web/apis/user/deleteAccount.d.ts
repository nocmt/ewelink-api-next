import { BaseWebAPI } from "../../WebAPI.js";
export declare type baseInfo = {
    code: string;
};
export interface DeleteAccount extends BaseWebAPI {
}
export declare class DeleteAccount {
    /**
     * Delete Account
     * @description Delete account
     *
     * @param options - The base information.
     * @param options.code - Verification code.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    deleteAccount(options: baseInfo): Promise<any>;
}
