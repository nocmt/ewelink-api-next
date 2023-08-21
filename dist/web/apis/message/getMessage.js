export class GetMessage {
    /**
     * Get the List of Messages
     * @description Get share notifications, device notification, and other messages.
     *
     * @param options - The HomePage information.
     * @param options.familyId - option, The familyId.
     * @param options.from - option, The 'from'. timestamp in milliseconds, default now
     * @param options.num - option, The num. default 30
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async getMessage(options) {
        const params = {
            lang: options?.familyId,
            from: options?.from,
            num: options?.num
        };
        return await this.root.request.get("/v2/message/read", {
            params: params,
            headers: {
                Authorization: `Bearer ${this.root.at}`
            }
        });
    }
}
