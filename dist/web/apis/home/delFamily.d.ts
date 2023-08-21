import { BaseWebAPI } from "../../WebAPI.js";
export declare type baseInfo = {
    id: string;
    deviceFamily: string;
    switchFamily: string;
};
export interface DelFamily extends BaseWebAPI {
}
export declare class DelFamily {
    /**
     * Delete 1 family
     *
     * @param options - The family information.
     * @param options.id - The family id.
     * @param options.deviceFamily - Family ID of mobile device.
     * @param options.switchFamily - Family ID of switch.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    delFamily(options: baseInfo): Promise<any>;
}
