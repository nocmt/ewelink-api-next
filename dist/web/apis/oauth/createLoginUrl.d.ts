import { BaseWebAPI } from "../../WebAPI.js";
export declare type loginPageInfo = {
    redirectUrl: string;
    grantType?: string | "authorization_code";
    state: string;
};
export interface CreateLoginUrl extends BaseWebAPI {
}
export declare class CreateLoginUrl {
    /**
     * Create a URL for OAuth login
     * @description Create a URL for OAuth login
     *
     * @param options - loginPageInfo
     * @param options.redirectUrl - The redirect URL after login
     * @param options.grantType - option, The grant type, default: `authorization_code`
     * @param options.state - The state
     * @returns loginUrl - which is a URL for OAuth login
     *
     * @beta
     */
    createLoginUrl(options: loginPageInfo): string;
}
