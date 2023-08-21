import { BaseWebAPI } from "../../WebAPI.js";
export declare type deviceInfo = {
    name: string;
    id: string;
    familyId?: string;
    roomId?: string;
    sort?: 1 | 2;
};
export interface AddGSMDevice extends BaseWebAPI {
}
export declare class AddGSMDevice {
    /**
     * Add a new 4G、GPRS Device.
     *
     * @param options - The device information.
     * @param options.name - The device name.
     * @param options.id - The GSM ID.
     * @param options.familyId - option, The device familyId.
     * @param options.roomId - option, The device roomId.
     * @param options.sort - The device sort. 1: positive sequence, 2: reverse sequence
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    addGSMDevice(options: deviceInfo): Promise<any>;
}
