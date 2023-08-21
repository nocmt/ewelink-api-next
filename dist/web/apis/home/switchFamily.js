export class SwitchFamily {
    /**
     * Switch Current Family
     * @description Switch to the default family
     *
     * @param options - The base information.
     * @param options.id - Target Family ID.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async switchFamily(options) {
        const body = {
            id: options.id
        };
        return await this.root.request.post("/v2/family/current", body, {
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
