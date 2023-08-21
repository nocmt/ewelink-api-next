import { BaseWebAPI } from "../../WebAPI.js";
export declare type userInfo = {
    nickname?: string;
    acceptEmailAd?: boolean;
    accountConsult?: true | null;
    timezone?: {
        id: string;
        offset: number;
    };
    language?: string;
    lang?: string | "en" | "cn";
    emailSubscription?: {
        email: string;
    };
};
export interface UpdateUserInfo extends BaseWebAPI {
}
export declare class UpdateUserInfo {
    /**
     * Update User Info
     * @description Update the information of current account such as the nickname.
     *
     * @param options - The account information.
     * @param options.nickname - option, The nickname.
     * @param options.acceptEmailAd - option, Whether to accept email subscription advertisements.
     * @param options.accountConsult - option, Have you received member consultation feedback?
     * @param options.timezone - option, The timezone.
     * @param options.language - option, option, The language.
     * @param options.lang - option, The language, cn or en. Default is cn.
     * @param options.emailSubscription - option, The email subscription.
     * @param options.emailSubscription.email - The email.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    updateUserInfo(options: userInfo): Promise<any>;
}
