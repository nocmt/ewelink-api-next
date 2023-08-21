import { sign } from "../../../utils/index.js";
export class GetRegion {
    /**
     * Obtain the region corresponding to the country/region code
     * @description Query the server area corresponding to the telephone area code
     *
     * @param options - The region information.
     * @param options.areaCode - The area code.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async getRegion(options) {
        const _options = {
            countryCode: options.areaCode.replace("+", "")
        };
        return await this.root.request.get("https://apia.coolkit.cn/v2/utils/get-region", {
            params: _options,
            headers: {
                "X-CK-Appid": this.root.appId || "",
                Authorization: `Sign ${sign(_options, this.root.appSecret || "", true)}`
            }
        });
    }
}
