import { BaseWebAPI } from "../../WebAPI.js";
export declare type baseInfo = {
    region: string;
    redirectUrl: string;
    code: string;
    grantType?: string | "authorization_code";
};
export interface GetToken extends BaseWebAPI {
}
export declare class GetToken {
    /**
     * Obtain token using authorization code
     * @description Obtain token using authorization code
     *
     * @param options - baseInfo
     * @param options.region - The region
     * @param options.redirectUrl - The redirect URL after login
     * @param options.code - The authorization code
     * @param options.grantType - option, The grant type, default: `authorization_code`
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getToken(options: baseInfo): Promise<any>;
}
