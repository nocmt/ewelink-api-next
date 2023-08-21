import { BaseWebAPI } from "../../WebAPI.js";
export declare type baseInfo = {
    familyId?: string;
    idList: string[];
};
export interface SortRoom extends BaseWebAPI {
}
export declare class SortRoom {
    /**
     * Sort Rooms
     * @description To change the order, you must designate the order of each room in the home.
     *
     * @param options - The base information.
     * @param options.familyId - option, The family id. Default is the current family.
     * @param options.idList - The room id list.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    sortRoom(options: baseInfo): Promise<any>;
}
