import { applyMixins } from "../../../utils/index.js";
import { GetRegion } from "./getRegion.js";
import { Login } from "./login.js";
import { Register } from "./register.js";
import { SMSLogin } from "./smsLogin.js";
import { SendCode } from "./sendCode.js";
import { ResetPwd } from "./resetPwd.js";
import { ChangePwd } from "./changePwd.js";
import { GetUserInfo } from "./getUserInfo.js";
import { UpdateUserInfo } from "./updateUserInfo.js";
import { RefreshToken } from "./refreshToken.js";
import { Logout } from "./logout.js";
import { DeleteAccount } from "./deleteAccount.js";
export class User {
    root;
    constructor(root) {
        this.root = root;
    }
}
applyMixins(User, [
    GetRegion,
    Login,
    Register,
    SMSLogin,
    SendCode,
    ResetPwd,
    ChangePwd,
    GetUserInfo,
    UpdateUserInfo,
    RefreshToken,
    Logout,
    DeleteAccount
]);
