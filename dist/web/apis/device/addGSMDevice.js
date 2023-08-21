export class AddGSMDevice {
    /**
     * Add a new 4G、GPRS Device.
     *
     * @param options - The device information.
     * @param options.name - The device name.
     * @param options.id - The GSM ID.
     * @param options.familyId - option, The device familyId.
     * @param options.roomId - option, The device roomId.
     * @param options.sort - The device sort. 1: positive sequence, 2: reverse sequence
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async addGSMDevice(options) {
        const body = {
            name: options.name,
            id: options.id,
            familyid: options?.familyId,
            roomid: options?.roomId,
            sort: options?.sort
        };
        return await this.root.request.post("/v2/device/add-gsm", body, {
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
