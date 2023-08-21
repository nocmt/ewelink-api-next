import { BaseWebAPI } from "../../WebAPI.js";
export declare type groupInfo = {
    name: string;
    mainDeviceId: string;
    familyId?: string;
    roomId?: string;
    sort?: 1 | 2;
    deviceidList: string[];
};
export interface AddGroup extends BaseWebAPI {
}
export declare class AddGroup {
    /**
     * Creates a new Device Group.
     *
     * @param options - The device information.
     * @param options.name - The device group name.
     * @param options.mainDeviceId - The device group main device id.
     * @param options.familyId - option, The device group familyId.
     * @param options.roomId - option, The device group roomId.
     * @param options.sort - The device group sort. 1: positive sequence, 2: reverse sequence
     * @param options.deviceidList - The device group deviceidList.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    addGroup(options: groupInfo): Promise<any>;
}
