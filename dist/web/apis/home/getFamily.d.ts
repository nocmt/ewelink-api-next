import { BaseWebAPI } from "../../WebAPI.js";
export declare type baseInfo = {
    lang?: "en" | "cn";
};
export interface GetFamily extends BaseWebAPI {
}
export declare class GetFamily {
    /**
     * Obtaining Family Information
     *
     * @param options - The family information.
     * @param options.lang - option, The language. en: English, cn: Chinese.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getFamily(options: baseInfo): Promise<any>;
}
