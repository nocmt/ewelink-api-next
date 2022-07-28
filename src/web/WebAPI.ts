import { eWeLinkBase } from "../Base.js";
import { User } from "./apis/user/index.js";
import { Home } from "./apis/home/index.js";
import { Device } from "./apis/device/index.js";
import { Message } from "./apis/message/index.js";
import { Other } from "./apis/other/index.js";

export class BaseWebAPI {
  // 创建一个私有只读的 root 属性，用于存储实例化的对象
  // Create a private read-only root attribute to store the instantiated object
  constructor(protected readonly root: WebAPI) {}
}

export class WebAPI extends eWeLinkBase {
  // 账号管理接口
  // Account management interface
  user = new User(this);

  // 家庭管理接口
  // Home management interface
  home = new Home(this);

  // 设备管理接口
  // Device management interface
  device = new Device(this);

  // 消息管理接口
  // Message management interface
  message = new Message(this);

  // 其他管理接口
  // Other management interface
  other = new Other(this);
}

export interface WebAPI {}
