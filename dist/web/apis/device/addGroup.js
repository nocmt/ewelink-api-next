export class AddGroup {
    /**
     * Creates a new Device Group.
     *
     * @param options - The device information.
     * @param options.name - The device group name.
     * @param options.mainDeviceId - The device group main device id.
     * @param options.familyId - option, The device group familyId.
     * @param options.roomId - option, The device group roomId.
     * @param options.sort - The device group sort. 1: positive sequence, 2: reverse sequence
     * @param options.deviceidList - The device group deviceidList.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async addGroup(options) {
        if (options.deviceidList.length < 1 || options.deviceidList.length > 30) {
            throw new Error("deviceidList length must be between 1 and 30");
        }
        const body = {
            name: options.name,
            mainDeviceId: options.mainDeviceId,
            familyid: options?.familyId,
            roomid: options?.roomId,
            sort: options?.sort,
            deviceidList: options.deviceidList
        };
        return await this.root.request.post("/v2/device/group", body, {
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
