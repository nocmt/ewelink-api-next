import { BaseWebAPI } from "../../WebAPI.js";
import { sign } from "../../../utils/index.js";

export type regionInfo = {
  // 查询区号归属区域
  areaCode: string;
};

export interface GetRegion extends BaseWebAPI {}

export class GetRegion {
  // 获取区号归属区域
  async getRegion(options: {
    // 区号
    areaCode: string;
  }) {
    const _options = {
      countryCode: options.areaCode.replace("+", "")
    };
    return await this.root.request.get("https://apia.coolkit.cn/v2/utils/get-region", {
      params: _options,
      headers: {
        "X-CK-Appid": this.root.appid || "",
        Authorization: `Sign ${sign(_options, this.root.appSecret || "", true)}`
      }
    });
  }
}
