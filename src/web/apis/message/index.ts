import { applyMixins } from "../../../utils/index.js";
import { WebAPI } from "../../WebAPI.js";
import { GetMessage } from "./getMessage.js";

export class Message {
  constructor(protected readonly root: WebAPI) {}
}

export interface Message extends GetMessage {}

applyMixins(Message, [GetMessage]);
