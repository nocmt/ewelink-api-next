import { applyMixins } from "../../../utils/index.js";
import { WebAPI } from "../../WebAPI.js";
import { GetAllThings } from "../device/getAllThings.js";

export class Device {
  constructor(protected readonly root: WebAPI) {}
}

export interface Device extends GetAllThings {}

applyMixins(Device, [GetAllThings]);
