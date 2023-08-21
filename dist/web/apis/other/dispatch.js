export class Dispatch {
    /**
     * Obtain the info for establishing a WebSocket connection
     * @description Obtain the info for establishing a WebSocket connection
     *
     * @param region - The region of the user's account
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async dispatch(region) {
        let url = `https://${region}-dispa.coolkit.${["cn", "test", "wx"].includes(region) ? "cn" : "cc"}/dispatch/app`;
        if (region === "wx") {
            url = "https://wx-disp.coolkit.cn:8080/dispatch/app";
        }
        return await this.root.request.get(url, {});
    }
}
