export class SetGroup {
    /**
     * Update the name of the group
     *
     * @param options - The group information.
     * @param options.newName - The new name of the group.
     * @param options.id - The group id.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async setGroup(options) {
        const body = {
            name: options.newName,
            id: options.id
        };
        return await this.root.request.put("/v2/device/group", body, {
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
