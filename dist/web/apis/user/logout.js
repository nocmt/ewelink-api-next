export class Logout {
    /**
     * logout
     * @description logout
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async logout() {
        return await this.root.request.delete("/v2/user/logout", {
            headers: {
                "X-CK-Appid": this.root.appId || "",
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
