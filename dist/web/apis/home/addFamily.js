export class AddFamily {
    /**
     * Create 1 new family
     *
     * @param options - The base information.
     * @param options.name - The family name.
     * @param options.sort - The family sort. 1: positive sequence, 2: reverse sequence.
     * @param options.roomNameList - The room name list.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async addFamily(options) {
        const body = {
            name: options.name,
            sort: options.sort,
            roomNameList: options?.roomNameList
        };
        return await this.root.request.post("/v2/family", body, {
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
