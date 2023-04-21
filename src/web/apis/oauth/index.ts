import { applyMixins } from "../../../utils/index.js";
import { WebAPI } from "../../WebAPI.js";
import { CreateLoginUrl } from "./createLoginUrl.js";
import { GetToken } from "./getToken.js";

export class OAuth {
  constructor(protected readonly root: WebAPI) {}
}

export interface OAuth extends CreateLoginUrl, GetToken {}

applyMixins(OAuth, [CreateLoginUrl, GetToken]);
