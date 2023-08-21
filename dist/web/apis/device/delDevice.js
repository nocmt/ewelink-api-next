export class DelDevice {
    /**
     * Delete a Device.
     *
     * @param options - The device information.
     * @param options.id - The device id.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async delDevice(options) {
        return await this.root.request.delete("/v2/device", {
            params: {
                deviceid: options.id
            },
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
