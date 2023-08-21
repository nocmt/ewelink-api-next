import { WebAPI } from "../../WebAPI.js";
import { GetMessage } from "./getMessage.js";
export declare class Message {
    protected readonly root: WebAPI;
    constructor(root: WebAPI);
}
export interface Message extends GetMessage {
}
