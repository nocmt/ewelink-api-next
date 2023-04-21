import { applyMixins } from "../../../utils/index.js";
import { WebAPI } from "../../WebAPI.js";
import { HomePage } from "./homePage.js";
import { AddFamily } from "./addFamily.js";
import { AddRoom } from "./addRoom.js";
import { DelFamily } from "./delFamily.js";
import { DelRoom } from "./delRoom.js";
import { GetFamily } from "./getFamily.js";
import { SetFamily } from "./setFamily.js";
import { SetRoom } from "./setRoom.js";
import { SetThing } from "./setThing.js";
import { SortRoom } from "./sortRoom.js";
import { SortThing } from "./sortThing.js";
import { SwitchFamily } from "./switchFamily.js";

export class Home {
  constructor(protected readonly root: WebAPI) {}
}

export interface Home
  extends HomePage,
    AddFamily,
    AddRoom,
    DelFamily,
    DelRoom,
    GetFamily,
    SetFamily,
    SetRoom,
    SetThing,
    SortRoom,
    SortThing,
    SwitchFamily {}

applyMixins(Home, [
  HomePage,
  AddFamily,
  AddRoom,
  DelFamily,
  DelRoom,
  GetFamily,
  SetFamily,
  SetRoom,
  SetThing,
  SortRoom,
  SortThing,
  SwitchFamily
]);
