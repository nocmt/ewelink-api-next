export class CoverGroupDeviceList {
    /**
     * Adding or deleting devices in a group
     *
     * @param options - The group information.
     * @param options.id - The device group id.
     * @param options.coverDeviceidList - The device group cover deviceidList.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async coverGroupDeviceList(options) {
        if (options.coverDeviceidList.length < 1) {
            throw new Error("addDeviceidList length must be greater than 0");
        }
        const body = {
            id: options.id,
            deviceidList: options.coverDeviceidList
        };
        return await this.root.request.post("/v2/device/group/update", body, {
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
