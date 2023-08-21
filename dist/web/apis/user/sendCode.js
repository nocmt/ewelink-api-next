import { sign } from "../../../utils/index.js";
export class SendCode {
    /**
     * Send Verification Code
     * @description Send verification code to email or phone number.
     *
     * @param options - The account information.
     * @param options.type - The type of Verification code
     * @param options.account - The account.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    async sendCode(options) {
        const body = {
            type: options.type
        };
        body[`${options.account.indexOf("@") !== -1 ? "email" : "phoneNumber"}`] = options.account;
        body["type"] = Number(options.type);
        return await this.root.request.post("/v2/user/verification-code", body, {
            headers: {
                "X-CK-Appid": this.root.appId || "",
                Authorization: `Sign ${sign(body, this.root.appSecret || "")}`
            }
        });
    }
}
