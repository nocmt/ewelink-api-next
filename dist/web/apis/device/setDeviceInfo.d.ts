import { BaseWebAPI } from "../../WebAPI.js";
export declare type deviceInfo = {
    newName?: string;
    deviceId: string;
    newRoomId?: string;
};
export interface SetDeviceInfo extends BaseWebAPI {
}
export declare class SetDeviceInfo {
    /**
     * Update the basic information of the device
     *
     * @param options - The device information.
     * @param options.newName - option, The new name of the device.
     * @param options.deviceId - The device id.
     * @param options.newRoomId - option, The new room id of the device.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setDeviceInfo(options: deviceInfo): Promise<any>;
}
