export class GetFamily {
    /**
     * Obtaining Family Information
     *
     * @param options - The family information.
     * @param options.lang - option, The language. en: English, cn: Chinese.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async getFamily(options) {
        const params = {
            lang: options?.lang
        };
        return await this.root.request.get("/v2/family", {
            params,
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
