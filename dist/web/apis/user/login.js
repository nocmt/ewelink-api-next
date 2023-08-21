import { sign } from "../../../utils/index.js";
export class Login {
    /**
     * Login
     * @description You should log in before you access device data or other resources
     *
     * @param options - The account information.
     * @param options.account - The account.
     * @param options.password - The password.
     * @param options.areaCode - The area code.
     * @param options.lang - option, The language, cn or en. Default is cn.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async login(options) {
        const body = {
            countryCode: options.areaCode,
            password: options.password
        };
        body[`${options.account.indexOf("@") !== -1 ? "email" : "phoneNumber"}`] = options.account;
        if (options?.lang) {
            body["lang"] = options.lang;
        }
        const res = await this.root.request.post("/v2/user/login", body, {
            headers: {
                "X-CK-Appid": this.root.appId || "",
                Authorization: `Sign ${sign(body, this.root.appSecret || "")}`
            }
        });
        if (res.status === 200 && res.error === 0) {
            this.root.account = options.account;
            this.root.at = res.data?.at;
            this.root.rt = res.data?.rt;
            this.root.userApiKey = res.data?.user?.apikey;
        }
        return res;
    }
}
