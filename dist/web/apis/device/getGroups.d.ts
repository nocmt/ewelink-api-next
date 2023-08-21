import { BaseWebAPI } from "../../WebAPI.js";
export declare type baseInfo = {
    lang?: "cn" | "en";
};
export interface GetGroups extends BaseWebAPI {
}
export declare class GetGroups {
    /**
     * Get Group List
     *
     * @param options - The group information.
     * @param options.lang -  option, The language. 'en' or 'cn'.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getGroups(options: baseInfo): Promise<any>;
}
