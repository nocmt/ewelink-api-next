import { BaseWebAPI } from "../../WebAPI.js";
export declare type homePageInfo = {
    familyId?: string;
    from?: string;
    num?: number | 30;
};
export interface GetMessage extends BaseWebAPI {
}
export declare class GetMessage {
    /**
     * Get the List of Messages
     * @description Get share notifications, device notification, and other messages.
     *
     * @param options - The HomePage information.
     * @param options.familyId - option, The familyId.
     * @param options.from - option, The 'from'. timestamp in milliseconds, default now
     * @param options.num - option, The num. default 30
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getMessage(options: homePageInfo): Promise<any>;
}
