import { BaseWebAPI } from "../../WebAPI.js";
export declare type thingInfo = {
    familyId?: string;
    lang?: "en" | "cn";
    num?: number | 30;
    beginIndex?: number | -9999999;
};
export interface GetAllThings extends BaseWebAPI {
}
export declare class GetAllThings {
    /**
     * Get all devices and groups under the user
     *
     * @param options - The things information.
     * @param options.familyId - option, The family id.
     * @param options.lang -  option, The language. 'en' or 'cn'.
     * @param options.num -  option, The number of things per page. Default is 0 means all things.
     * @param options.beginIndex - The index of the first thing. Default is -9999999.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getAllThings(options: thingInfo): Promise<any>;
    /**
     * Get all devices and groups under the user (All pages)
     *
     * @param options - The things information.
     * @param options.familyId - option, The family id.
     * @param options.lang -  option, The language. 'en' or 'cn'.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getAllThingsAllPages(options: thingInfo): Promise<{
        status: number;
        error: number;
        msg: string;
        data: {
            thingList: any[];
            total: number;
        };
    } | {
        status: number;
        error: number;
        msg: unknown;
        data: {
            thingList: never[];
            total: number;
        };
    }>;
}
