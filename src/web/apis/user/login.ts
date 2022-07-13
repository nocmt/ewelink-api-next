import { BaseWebAPI } from '../../WebAPI.js'
import { nonce, sign } from '../../../utils/index.js'

export type accountInfo = {
    account: string,
    password: string,
    areaCode: string
}

export interface Login extends BaseWebAPI {}

export class Login {
    async login(options: accountInfo) {
        const body = {
            countryCode: options?.areaCode,
            password: options?.password
        }
        body[`${options.account.indexOf("@") !== -1 ? "email" : "phoneNumber"}` as keyof typeof body] = options.account;

        return await this.root.request.post('/v2/user/login', body ,{
            headers: {
                "X-CK-Appid": this.root.appid || "",
                "X-CK-Nonce": nonce(),
                "Authorization": `Sign ${sign(body, this.root.appsecret || "")}`
            }
        })
    }
}
