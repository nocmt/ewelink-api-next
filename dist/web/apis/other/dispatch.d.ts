import { BaseWebAPI } from "../../WebAPI.js";
export interface Dispatch extends BaseWebAPI {
}
export declare class Dispatch {
    /**
     * Obtain the info for establishing a WebSocket connection
     * @description Obtain the info for establishing a WebSocket connection
     *
     * @param region - The region of the user's account
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    dispatch(region: string | "cn" | "as" | "us" | "eu" | "wx"): Promise<any>;
}
