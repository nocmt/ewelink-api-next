import { BaseWebAPI } from "../../WebAPI.js";
import { nonce } from "../../../utils/index.js";

export type userInfo = {
  nickname?: string; // 要更新的用户昵称,如果字段为空或 NULL，表示不更新昵称
  acceptEmailAd?: boolean; // 是否接受邮件订阅广告，如果字段为空或 NULL，表示不更新
  accountConsult?: true | null; // 是否接受过会员咨询反馈，固定值 true，填写其它值则返回参数错误，如果字段为空或 NULL，表示不更新
};

export interface UpdateUserInfo extends BaseWebAPI {}

export class UpdateUserInfo {
  async updateUserInfo(options: userInfo) {
    const body = {
      nickname: options?.nickname,
      acceptEmailAd: options?.acceptEmailAd,
      accountConsult: options?.accountConsult
    };
    return await this.root.request.post("/v2/user/profile", body, {
      headers: {
        "X-CK-Appid": this.root.appid || "",
        "X-CK-Nonce": nonce(),
        Authorization: `Bearer ${this.root.token}`
      }
    });
  }
}
