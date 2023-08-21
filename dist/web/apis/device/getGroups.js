export class GetGroups {
    /**
     * Get Group List
     *
     * @param options - The group information.
     * @param options.lang -  option, The language. 'en' or 'cn'.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async getGroups(options) {
        const params = {
            lang: options?.lang
        };
        return await this.root.request.get("/v2/device/group", {
            params: params,
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
