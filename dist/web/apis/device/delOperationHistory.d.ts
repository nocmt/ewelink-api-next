import { BaseWebAPI } from "../../WebAPI.js";
export declare type thingInfo = {
    deviceId: string;
};
export interface DelOperationHistory extends BaseWebAPI {
}
export declare class DelOperationHistory {
    /**
     * Delete device's operation history
     *
     * @param options - The things information.
     * @param options.deviceId - The device id.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    delOperationHistory(options: thingInfo): Promise<any>;
}
