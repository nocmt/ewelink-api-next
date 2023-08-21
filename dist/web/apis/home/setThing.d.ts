import { BaseWebAPI } from "../../WebAPI.js";
export declare type baseInfo = {
    roomId: string;
    oldThingList: string[];
    newThingList: string[];
};
export interface SetThing extends BaseWebAPI {
}
export declare class SetThing {
    /**
     * Move Things
     * @description Move groups and devices to a specified room
     *
     * @param options - The base information.
     * @param options.roomId - The room id.
     * @param options.oldThingList - The old thing list.
     * @param options.newThingList - The new thing list.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setThing(options: baseInfo): Promise<any>;
}
