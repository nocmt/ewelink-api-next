import { applyMixins } from "../../../utils/index.js";
import { GetMessage } from "./getMessage.js";
export class Message {
    root;
    constructor(root) {
        this.root = root;
    }
}
applyMixins(Message, [GetMessage]);
