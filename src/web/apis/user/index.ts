import { applyMixins } from "../../../utils/index.js";
import { WebAPI } from "../../WebAPI.js";
import { GetRegion } from "./GetRegion.js";
import { Login } from "./login.js";
import { Register } from "./register.js";

export class User {
  constructor(protected readonly root: WebAPI) {}
}

export interface User extends GetRegion, Login, Register {}

applyMixins(User, [GetRegion, Login, Register]);
