import { BaseWebAPI } from "../../WebAPI.js";
export interface GetUserInfo extends BaseWebAPI {
}
export declare class GetUserInfo {
    /**
     * Get User Info
     * @description Get the information of current account such as the nickname.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getUserInfo(): Promise<any>;
}
