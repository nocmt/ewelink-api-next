import { BaseWebAPI } from "../../WebAPI.js";
export declare type deviceInfo = {
    deviceId: string;
    apiKey: string;
    permit: number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 15;
};
export interface SetShare extends BaseWebAPI {
}
export declare class SetShare {
    /**
     * Modify sharing permissions
     *
     * @param options - The device information.
     * @param options.deviceId - The device id.
     * @param options.apiKey - The user's apiKey.
     * @param options.permit - The sharing permissions.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setShare(options: deviceInfo): Promise<any>;
}
