import { BaseWebAPI } from "../../WebAPI.js";
export declare type accountInfo = {
    rt?: string;
};
export interface RefreshToken extends BaseWebAPI {
}
export declare class RefreshToken {
    /**
     * Refresh Access Token
     * @description 'access token' expires in 30 days (for security reasons) by default. When this happens, no need to log in again to GET@'access token', just use 'Refresh Token' endpoint to refresh the 'access token'.
     *
     * @param options - The account information.
     * @param options.rt - Refresh token.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    refreshToken(options: accountInfo): Promise<any>;
}
