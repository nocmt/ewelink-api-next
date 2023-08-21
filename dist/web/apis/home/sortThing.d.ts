import { BaseWebAPI } from "../../WebAPI.js";
export declare type baseInfo = {
    familyId?: string;
    thingList: Array<{
        itemType?: string;
        id?: string;
    }>;
};
export interface SortThing extends BaseWebAPI {
}
export declare class SortThing {
    /**
     * Sort Things in a Home
     * @description To change the order, you must specify the order of each device or group in the home.
     *
     * @param options - The base information.
     * @param options.familyId - option, The family id. Default is the current family.
     * @param options.thingList - The thing list.
     * @param options.thingList[].itemType - The thing type. Default is "thing".
     * @param options.thingList[].id - The thing id.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    sortThing(options: baseInfo): Promise<any>;
}
