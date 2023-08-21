import { BaseWebAPI } from "../../WebAPI.js";

export type userInfo = {
  // 要更新的用户昵称,如果字段为空或 NULL，表示不更新昵称
  // The user nickname to be updated. If the field is empty or null, it means that the nickname will not be updated
  nickname?: string;
  // 是否接受邮件订阅广告，如果字段为空或 NULL，表示不更新
  // Whether to accept email subscription advertisements. If the field is empty or null, it means that it will not be updated
  acceptEmailAd?: boolean;
  // 是否接受过会员咨询反馈，固定值 true，填写其它值则返回参数错误，如果字段为空或 NULL，表示不更新
  // Have you received member consultation feedback? The fixed value is true. If you fill in other values, the parameter error will be returned. If the field is empty or null, it means that it will not be updated
  accountConsult?: true | null;
  timezone?: {
    id: string;
    offset: number;
  };
  language?: string;
  lang?: string | "en" | "cn";
  emailSubscription?: {
    email: string;
  };
};

export interface UpdateUserInfo extends BaseWebAPI {}

export class UpdateUserInfo {
  /**
   * Update User Info
   * @description Update the information of current account such as the nickname.
   *
   * @param options - The account information.
   * @param options.nickname - option, The nickname.
   * @param options.acceptEmailAd - option, Whether to accept email subscription advertisements.
   * @param options.accountConsult - option, Have you received member consultation feedback?
   * @param options.timezone - option, The timezone.
   * @param options.language - option, option, The language.
   * @param options.lang - option, The language, cn or en. Default is cn.
   * @param options.emailSubscription - option, The email subscription.
   * @param options.emailSubscription.email - The email.
   * @returns response - Please refer to the online API documentation
   *
   * @beta
   */
  async updateUserInfo(options: userInfo) {
    return await this.root.request.post("/v2/user/profile", options, {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Bearer ${this.root.at}`
      }
    });
  }
}
