import { WebAPI } from "../../WebAPI.js";
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
export declare class User {
    protected readonly root: WebAPI;
    constructor(root: WebAPI);
}
export interface User extends GetRegion, Login, Register, SMSLogin, SendCode, ResetPwd, ChangePwd, GetUserInfo, UpdateUserInfo, RefreshToken, Logout, DeleteAccount {
}
