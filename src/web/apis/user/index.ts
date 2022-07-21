import { applyMixins } from "../../../utils/index.js";
import { WebAPI } from "../../WebAPI.js";
import { GetRegion } from "./GetRegion.js";
import { Login } from "./login.js";
import { Register } from "./register.js";
import { SMSLogin } from "./smsLogin.js";
import { SendCode } from "./sendCode.js";
import { ResetPwd } from "./resetPwd.js";
import { ChangePwd } from "./changePwd.js";
import { GetUserInfo } from "./getUserInfo.js";
import { SetUserInfo } from "./setUserInfo.js";
import { RefreshToken } from "./refreshToken.js";
import { Logout } from "./logout.js";
import { DeleteAccount } from "./deleteAccount.js";

export class User {
  constructor(protected readonly root: WebAPI) {}
}

export interface User
  extends GetRegion,
    Login,
    Register,
    SMSLogin,
    SendCode,
    ResetPwd,
    ChangePwd,
    GetUserInfo,
    SetUserInfo,
    RefreshToken,
    Logout,
    DeleteAccount {}

applyMixins(User, [
  GetRegion,
  Login,
  Register,
  SMSLogin,
  SendCode,
  ResetPwd,
  ChangePwd,
  GetUserInfo,
  SetUserInfo,
  RefreshToken,
  Logout,
  DeleteAccount
]);
