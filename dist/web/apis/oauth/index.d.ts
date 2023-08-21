import { WebAPI } from "../../WebAPI.js";
import { CreateLoginUrl } from "./createLoginUrl.js";
import { GetToken } from "./getToken.js";
export declare class OAuth {
    protected readonly root: WebAPI;
    constructor(root: WebAPI);
}
export interface OAuth extends CreateLoginUrl, GetToken {
}
