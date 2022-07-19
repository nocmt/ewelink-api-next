import { BaseWebAPI } from "../../WebAPI.js";
import { nonce } from "../../../utils/index.js";
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
        "X-CK-Appid": this.root.appid || "",
        "X-CK-Nonce": nonce(),
        Authorization: `Bearer ${at || this.root.token}`
      }
    });
    if (res.status === 200 && res.error === 0) {
      if (this.root.region) {
        const valueObj = storage.get(this.root.region);
        if (valueObj && valueObj[options.account || ""]) {
          delete valueObj[options.account];
          storage.set(this.root.region, valueObj);
        }
      }
    }
    return res;
  }
}
