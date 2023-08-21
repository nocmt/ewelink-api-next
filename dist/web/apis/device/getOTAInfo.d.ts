import { BaseWebAPI } from "../../WebAPI.js";
export declare type deviceInfo = {
    deviceInfoList: Array<{
        deviceId: string;
        model: string;
        version: string;
    }>;
};
export interface GetOTAInfo extends BaseWebAPI {
}
export declare class GetOTAInfo {
    /**
     * Get Devices OTA info
     *
     * @param options - The device information.
     * @param options.deviceInfoList - The device information list.
     * @param options.deviceInfoList[].deviceId - The device id.
     * @param options.deviceInfoList[].model - The device model.
     * @param options.deviceInfoList[].version - The device current version.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getOTAInfo(options: deviceInfo): Promise<any>;
}
