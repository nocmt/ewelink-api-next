import { BaseWebAPI } from "../../WebAPI.js";
export declare type thingInfo = {
    deviceId: string;
    from?: string;
    num?: number | 30;
};
export interface GetOperationHistory extends BaseWebAPI {
}
export declare class GetOperationHistory {
    /**
     * Get Device operation history
     *
     * @param options - The things information.
     * @param options.deviceId - The device id.
     * @param options.from - The start time of the query, in the format of timestamp, such as 1614211200000.
     * @param options.num - The number of records to query, the default is 30, and the maximum is 30.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getOperationHistory(options: thingInfo): Promise<any>;
}
