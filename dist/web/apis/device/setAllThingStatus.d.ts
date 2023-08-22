import { BaseWebAPI } from "../../WebAPI.js";
export declare type thingInfo = {
    thingList: Array<{
        type: number | 1 | 2;
        id: string;
        params: object;
    }>;
    timeout?: number;
};
export interface SetAllThingStatus extends BaseWebAPI {
}
export declare class SetAllThingStatus {
    /**
     * Set the status of the device or group
     *
     * @param options - The things information.
     * @param options.thingList - The things information.
     * @param options.thingList.type - The things type. 1: user's own device, 2: devices shared by others.
     * @param options.thingList.id - The things id.
     * @param options.thingList.params - The things params.
     * @param options.timeout - The timeout. 0-8000ms.default 0ms.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setAllThingStatus(options: thingInfo): Promise<any>;
}
