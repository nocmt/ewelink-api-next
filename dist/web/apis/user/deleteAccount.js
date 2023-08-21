export class DeleteAccount {
    /**
     * Delete Account
     * @description Delete account
     *
     * @param options - The base information.
     * @param options.code - Verification code.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async deleteAccount(options) {
        const body = {
            verificationCode: options.code
        };
        return await this.root.request.post("/v2/user/close-account", body, {
            headers: {
                "X-CK-Appid": this.root.appId || "",
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
