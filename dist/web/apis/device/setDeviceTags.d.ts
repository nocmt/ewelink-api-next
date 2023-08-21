import { BaseWebAPI } from "../../WebAPI.js";
export declare type deviceInfo = {
    type: string | "replace" | "merge";
    deviceId: string;
    tags: object;
};
export interface SetDeviceTags extends BaseWebAPI {
}
export declare class SetDeviceTags {
    /**
     * Set the tags of the device
     *
     * @param options - The device information.
     * @param options.type - The type of the operation. 'replace' or 'merge'.
     * @param options.deviceId - The device id.
     * @param options.tags - The tags of the device.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setDeviceTags(options: deviceInfo): Promise<any>;
}
