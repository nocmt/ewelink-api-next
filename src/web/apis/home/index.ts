import { applyMixins } from "../../../utils/index.js";
import { WebAPI } from "../../WebAPI.js";
import { HomePage } from "./homePage.js";

export class Home {
  constructor(protected readonly root: WebAPI) {}
}

export interface Home extends HomePage {}

applyMixins(Home, [HomePage]);
