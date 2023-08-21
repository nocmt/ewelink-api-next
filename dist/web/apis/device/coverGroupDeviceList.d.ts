import { BaseWebAPI } from "../../WebAPI.js";
export declare type groupInfo = {
    id: string;
    coverDeviceidList: string[];
};
export interface CoverGroupDeviceList extends BaseWebAPI {
}
export declare class CoverGroupDeviceList {
    /**
     * Adding or deleting devices in a group
     *
     * @param options - The group information.
     * @param options.id - The device group id.
     * @param options.coverDeviceidList - The device group cover deviceidList.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    coverGroupDeviceList(options: groupInfo): Promise<any>;
}
