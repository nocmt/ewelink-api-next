import { eWeLinkBase } from "../Base.js";
import { User } from "./apis/user/index.js";
import { Home } from "./apis/home/index.js";
import { Device } from "./apis/device/index.js";
import { Message } from "./apis/message/index.js";
import { Other } from "./apis/other/index.js";
import { OAuth } from "./apis/oauth/index.js";
export declare class BaseWebAPI {
    protected readonly root: WebAPI;
    constructor(root: WebAPI);
}
export declare class WebAPI extends eWeLinkBase {
    user: User;
    home: Home;
    device: Device;
    message: Message;
    oauth: OAuth;
    other: Other;
}
export interface WebAPI {
}
