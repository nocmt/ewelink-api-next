export class DelOperationHistory {
    /**
     * Delete device's operation history
     *
     * @param options - The things information.
     * @param options.deviceId - The device id.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async delOperationHistory(options) {
        const params = {
            deviceid: options.deviceId
        };
        return await this.root.request.delete("/v2/device/history", {
            params: params,
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
