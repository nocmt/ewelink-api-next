export class Share {
    /**
     * Sharing devices
     *
     * @param options - The device information.
     * @param options.user - The user information.
     * @param options.user.countryCode - The user's countryCode.
     * @param options.user.phoneNumber - option, The user's phoneNumber.
     * @param options.user.email - option, The user's email.
     * @param options.deviceidList - The device id list.
     * @param options.permit - The sharing permissions.
     * @param options.comment - option, The sharing comment.
     * @param options.shareType - option, The sharing type.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async share(options) {
        const body = {
            deviceidList: options.deviceidList,
            permit: options.permit,
            comment: options.comment,
            shareType: options.shareType,
            user: options.user
        };
        return await this.root.request.post("/v2/device/share", body, {
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
