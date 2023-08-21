import { eWeLinkBase } from "../Base.js";
import { Connect } from "./wss/index.js";
export declare class BaseWsAPI {
    protected readonly root: Ws;
    constructor(root: Ws);
}
export declare class Ws extends eWeLinkBase {
    Connect: Connect;
}
export interface Ws {
}
