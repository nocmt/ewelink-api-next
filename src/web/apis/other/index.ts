import { applyMixins } from "../../../utils/index.js";
import { WebAPI } from "../../WebAPI.js";
import { Dispatch } from "./dispatch.js";

export class Other {
  constructor(protected readonly root: WebAPI) {}
}

export interface Other extends Dispatch {}

applyMixins(Other, [Dispatch]);
