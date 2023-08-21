import { BaseWebAPI } from "../../WebAPI.js";
export declare type thingInfo = {
    type: number | 1 | 2;
    id: string;
    params?: string;
};
export interface GetThingStatus extends BaseWebAPI {
}
export declare class GetThingStatus {
    /**
     * Get Device Status
     *
     * @param options - The things information.
     * @param options.type - The things type. 1: user's own device, 2: devices shared by others.
     * @param options.id - The things id.
     * @param options.params - option, The things params.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getThingStatus(options: thingInfo): Promise<any>;
}
