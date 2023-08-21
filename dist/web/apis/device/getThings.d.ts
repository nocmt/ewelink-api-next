import { BaseWebAPI } from "../../WebAPI.js";
export declare type thingInfo = {
    thingList: {
        itemType: Number | 1 | 2 | 3;
        id: string;
    };
};
export interface GetThings extends BaseWebAPI {
}
export declare class GetThings {
    /**
     * Obtain specified device or group information
     *
     * @param options - The things information.
     * @param options.thingList - The things information.
     * @param options.thingList.itemType - The things itemType. 1: user's own device, 2: devices shared by others, 3: own group.
     * @param options.thingList.id - The things id.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getThings(options: thingInfo): Promise<any>;
}
