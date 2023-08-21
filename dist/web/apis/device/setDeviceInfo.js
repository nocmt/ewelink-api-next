export class SetDeviceInfo {
    /**
     * Update the basic information of the device
     *
     * @param options - The device information.
     * @param options.newName - option, The new name of the device.
     * @param options.deviceId - The device id.
     * @param options.newRoomId - option, The new room id of the device.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async setDeviceInfo(options) {
        const body = {
            name: options?.newName,
            deviceid: options.deviceId,
            roomid: options?.newRoomId
        };
        return await this.root.request.post("/v2/device/update-info", body, {
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
