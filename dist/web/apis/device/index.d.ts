import { WebAPI } from "../../WebAPI.js";
import { GetAllThings } from "../device/getAllThings.js";
import { AddDevice } from "./addDevice.js";
import { AddGroup } from "./addGroup.js";
import { AddGSMDevice } from "./addGSMDevice.js";
import { CoverGroupDeviceList } from "./coverGroupDeviceList.js";
import { DelDevice } from "./delDevice.js";
import { SetDeviceInfo } from "./setDeviceInfo.js";
import { DelGroup } from "./delGroup.js";
import { DelOperationHistory } from "./delOperationHistory.js";
import { DelShare } from "./delShare.js";
import { GetGroups } from "./getGroups.js";
import { GetOperationHistory } from "./getOperationHistory.js";
import { GetOTAInfo } from "./getOTAInfo.js";
import { GetThings } from "./getThings.js";
import { GetThingStatus } from "./getThingStatus.js";
import { SetAllThingStatus } from "./setAllThingStatus.js";
import { SetDeviceTags } from "./setDeviceTags.js";
import { SetGroup } from "./setGroup.js";
import { SetGroupStatus } from "./setGroupStatus.js";
import { SetShare } from "./setShare.js";
import { SetThingStatus } from "./setThingStatus.js";
import { Share } from "./share.js";
export declare class Device {
    protected readonly root: WebAPI;
    constructor(root: WebAPI);
}
export interface Device extends GetAllThings, AddDevice, AddGroup, AddGSMDevice, CoverGroupDeviceList, DelDevice, DelGroup, DelOperationHistory, DelShare, GetGroups, GetOperationHistory, GetOTAInfo, GetThings, GetThingStatus, SetAllThingStatus, SetDeviceTags, SetDeviceInfo, SetGroup, SetGroupStatus, SetShare, SetThingStatus, Share {
}
