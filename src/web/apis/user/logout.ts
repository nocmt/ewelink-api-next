import { BaseWebAPI } from "../../WebAPI.js";
import { storage } from "../../../cache/index.js";

export interface Logout extends BaseWebAPI {}

export type accountInfo = {
  account: string;
};
export class Logout {
  async logout(options: accountInfo) {
    let at;
    if (this.root.region) {
      const valueObj = storage.get(this.root.region);
      if (valueObj && valueObj[options.account || ""]) {
        at = valueObj[options.account].at;
      }
    }
    const res = await this.root.request.delete("/v2/user/logout", {
      headers: {
        "X-CK-Appid": this.root.appId || "",
        Authorization: `Bearer ${at || this.root.token}`
      }
    });
    if (res.status === 200 && res.error === 0) {
      if (this.root.region) {
        const valueObj = storage.get(this.root.region);
        if (valueObj && valueObj[options.account || ""]) {
          delete valueObj[options.account];
          if (valueObj.length === 0) {
            storage.remove(this.root.region);
          }
          storage.set(this.root.region, valueObj);
        }
      }
    }
    return res;
  }
}
