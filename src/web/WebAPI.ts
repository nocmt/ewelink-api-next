import { eWeLinkBase } from "../Base.js";
import { User } from "./apis/user/index.js";
import { Home } from "./apis/home/index.js";
import { Device } from "./apis/device/index.js";

export class BaseWebAPI {
  // 创建一个私有只读的 root 属性，用于存储实例化的对象
  constructor(protected readonly root: WebAPI) {}
}

export class WebAPI extends eWeLinkBase {
  // 账号管理接口
  user = new User(this);

  // 家庭管理接口
  home = new Home(this);

  // 设备管理接口
  device = new Device(this);
}

export interface WebAPI {}
