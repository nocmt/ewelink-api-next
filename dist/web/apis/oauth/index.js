import { applyMixins } from "../../../utils/index.js";
import { CreateLoginUrl } from "./createLoginUrl.js";
import { GetToken } from "./getToken.js";
export class OAuth {
    root;
    constructor(root) {
        this.root = root;
    }
}
applyMixins(OAuth, [CreateLoginUrl, GetToken]);
