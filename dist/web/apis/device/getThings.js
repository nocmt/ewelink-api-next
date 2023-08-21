export class GetThings {
    /**
     * Obtain specified device or group information
     *
     * @param options - The things information.
     * @param options.thingList - The things information.
     * @param options.thingList.itemType - The things itemType. 1: user's own device, 2: devices shared by others, 3: own group.
     * @param options.thingList.id - The things id.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async getThings(options) {
        const body = {
            thingList: options.thingList
        };
        return await this.root.request.post("/v2/device/thing", body, {
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
