export class AddRoom {
    /**
     * Create 1 new room
     *
     * @param options - The family information.
     * @param options.familyId - The family id.
     * @param options.name - The room name.
     * @param options.sort - The room sort. 1: positive sequence, 2: reverse sequence.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async addRoom(options) {
        const body = {
            familyid: options.familyId,
            name: options.name,
            sort: options.sort
        };
        return await this.root.request.post("/v2/family/room", body, {
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
