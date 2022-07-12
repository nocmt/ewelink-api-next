import { BaseWebAPI } from '../../WebAPI'
import { nonce, sign } from '../../../utils/index'
export type regionInfo = {
    // 查询区号归属区域
    areaCode: string
}

export interface GetRegion extends BaseWebAPI {}

export class GetRegion {
    // 获取区号归属区域
    async getRegion(options: {
        // 区号
        areaCode: string
    }) {
        const _options = {
            countryCode: options?.areaCode.replace("+",""),
        }
        return await this.root.request.post('https://apia.coolkit.cn/v2/utils/get-region',_options,{
            headers: {
                "X-CK-Appid": this.root.appid || "",
                "X-CK-Nonce": nonce(),
                "Authorization": `Sign ${sign(_options, this.root.appsecret || "")}`,
                "Content-Type": "application/json",
            }
        })
    }
}
