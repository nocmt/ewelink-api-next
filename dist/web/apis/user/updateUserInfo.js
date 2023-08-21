export class UpdateUserInfo {
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
    async updateUserInfo(options) {
        return await this.root.request.post("/v2/user/profile", options, {
            headers: {
                "X-CK-Appid": this.root.appId || "",
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
