import { BaseWebAPI } from "../../WebAPI.js";
export interface Logout extends BaseWebAPI {
}
export declare class Logout {
    /**
     * logout
     * @description logout
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    logout(): Promise<any>;
}
