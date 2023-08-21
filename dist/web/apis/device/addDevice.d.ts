import { BaseWebAPI } from "../../WebAPI.js";
export declare type deviceInfo = {
    name?: string;
    deviceId: string;
    settings?: {
        opsNotify?: 0 | 1;
        opsHistory?: 0 | 1;
        alarmNotify?: 0 | 1;
    };
    ifrCode?: string;
    deviceKey: string;
    chipId?: string;
    familyId?: string;
    roomId?: string;
    sort?: 1 | 2;
};
export interface AddDevice extends BaseWebAPI {
}
export declare class AddDevice {
    /**
     * Add a new Wi-Fi Device.
     *
     * @param options - The device information.
     * @param options.name - option, The device name.
     * @param options.deviceId - The device id.
     * @param options.settings - option, The device settings.
     * @param options.settings.opsNotify - option, The device settings.
     * @param options.settings.opsHistory - option, The device settings.
     * @param options.settings.alarmNotify - option, The device settings.
     * @param options.ifrCode - option, Code value of infrared devices.
     * @param options.deviceKey - The device apikey.
     * @param options.chipId - The device chipid.
     * @param options.familyId - option, The device familyId.
     * @param options.roomId - option, The device roomId.
     * @param options.sort - The device sort. 1: positive sequence, 2: reverse sequence
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    addDevice(options: deviceInfo): Promise<any>;
}
