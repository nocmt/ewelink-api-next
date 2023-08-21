import { sign } from "../../../utils/index.js";
export class SMSLogin {
    /**
     * SMS Login
     * @description Only users registered by phone number in mainland China has access to this.
     *
     * @param options - The account information.
     * @param options.phoneNumber - The phone number.
     * @param options.areaCode - The area code.
     * @param options.code - Verification code.
     * @param options.lang - option, The language, cn or en. Default is cn.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async smsLogin(options) {
        const body = {
            countryCode: options.areaCode,
            phoneNumber: options.phoneNumber,
            lang: options?.lang || "en",
            verificationCode: options.code
        };
        const res = await this.root.request.post("/v2/user/sms-login", body, {
            headers: {
                "X-CK-Appid": this.root.appId || "",
                Authorization: `Sign ${sign(body, this.root.appSecret || "")}`
            }
        });
        if (res.status === 200 && res.error === 0) {
            // saveToken(res, options.phoneNumber);
            this.root.account = options.phoneNumber;
            this.root.at = res.data?.at;
            this.root.rt = res.data?.rt;
            this.root.userApiKey = res.data?.user?.apikey;
        }
        return res;
    }
}
