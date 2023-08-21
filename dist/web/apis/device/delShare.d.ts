import { BaseWebAPI } from "../../WebAPI.js";
export declare type deviceInfo = {
    deviceId: string;
    apiKey: string;
};
export interface DelShare extends BaseWebAPI {
}
export declare class DelShare {
    /**
     * Cancel sharing device
     *
     * @param options - The device information.
     * @param options.deviceId - The device id.
     * @param options.apiKey - The user's apiKey.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    delShare(options: deviceInfo): Promise<any>;
}
