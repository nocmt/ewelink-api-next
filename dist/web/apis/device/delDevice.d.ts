import { BaseWebAPI } from "../../WebAPI.js";
export declare type deviceInfo = {
    id: string;
};
export interface DelDevice extends BaseWebAPI {
}
export declare class DelDevice {
    /**
     * Delete a Device.
     *
     * @param options - The device information.
     * @param options.id - The device id.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    delDevice(options: deviceInfo): Promise<any>;
}
