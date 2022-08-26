import { Bonjour, Service } from "bonjour-service";
import { createLogger } from "../utils/logger.js";
import log4js from "log4js";
import { request } from "../utils/request.js";
import { AxiosInstance } from "axios";

import CryptoJS from "crypto-js";

let _logger: any;

export type LanOptions = {
  logObj?: any;
  logLevel?: string | "info" | "debug" | "warn" | "error" | "fatal";
  selfApikey: string;
};

let serverList: Service[] = []; // 服务列表
let serverDict: { [key: string]: Service } = {}; // 设备ID与服务的映射表

export class Lan {
  logger?: log4js.Logger | Console | any;
  logLevel?: string | "info" | "debug" | "warn" | "error" | "fatal";
  selfApikey: string = "";
  request: AxiosInstance | any = request;

  constructor(options?: LanOptions) {
    if (!options) return;

    this.logLevel = options.logLevel || "debug";
    this.logger = options.logObj || createLogger("lan", this.logLevel);
    _logger = this.logger;
    this.selfApikey = options.selfApikey;
  }

  // 发现局域网内易微联设备
  // Discover eWeLink devices in LAN
  discovery(type: string = "ewelink") {
    const bonjourClient = new Bonjour();
    bonjourClient.find({ type: type }, function (service: Service) {
      _logger.info("Found an eWeLink mdns server:", service);
      serverList.push(service);
      serverDict[service.txt.id] = service;
    });
    return bonjourClient;
  }

  getServerList() {
    _logger.info("serverList:", serverList);
    return serverList;
  }

  getServerDict() {
    _logger.info("serverDict:", serverDict);
    return serverDict;
  }

  // data encrypt
  encrypt(data: any, secretKey: string, iv: string): string {
    if (!data) return "";
    const cipher = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Hex.parse(secretKey), {
      iv: CryptoJS.enc.Base64.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return cipher.ciphertext.toString(CryptoJS.enc.Base64);
  }

  // data decrypt
  decrypt(data: string, secretKey: string, iv: string): object {
    if (!data) return {};
    return JSON.parse(
      CryptoJS.AES.decrypt(data, CryptoJS.enc.Hex.parse(secretKey), {
        iv: CryptoJS.enc.Base64.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8)
    );
  }

  // Get device ID + port
  getDeviceIpPort(deviceId: string): string {
    if (serverDict[deviceId] && serverDict[deviceId]?.addresses) {
      const addresses = serverDict[deviceId].addresses || [];
      const ips: string[] = addresses.filter((ip: string) => {
        if (ip.length <= 32) {
          return `${ip}:${serverDict[deviceId].port || "8081"}`;
        }
      });
      if (ips.length > 0) {
        return ips[0];
      }
    }
    return "";
  }
  async generalRequest(
    deviceId: string,
    data: object,
    method: string | "GET" | "POST" | "PUT" | "DELETE",
    api: string
  ) {
    const url = this.getDeviceIpPort(deviceId);
    if (url) throw new Error("Device not found");
    let body = {
      deviceid: deviceId,
      sequence: new Date().getTime().toString(),
      selfApikey: this.selfApikey,
      data: data
    };

    return await request.request({
      url: `http://${url}${api}`,
      method: method.toLowerCase(),
      data: body,
      headers: {}
    });
  }

  // General interface
  zeroconf = {
    // 单通道设备开关
    // Switch single channel device
    switch: async (
      deviceId: string,
      data:
        | {
            switch: "on" | "off";
          }
        | { [key: string]: any }
    ) => {
      return await this.generalRequest(deviceId, data, "POST", `/zeroconf/switch`);
    },

    // 多通道设备开关
    // Switch multiple channels
    switches: async (
      deviceId: string,
      data:
        | {
            switches: [
              { switch: "on" | "off"; outlet: 0 },
              { switch: "on" | "off"; outlet: 1 },
              { switch: "on" | "off"; outlet: 2 },
              { switch: "on" | "off"; outlet: 3 }
            ];
          }
        | { [key: string]: any }
    ) => {
      return await this.generalRequest(deviceId, data, "POST", `/zeroconf/switches`);
    },

    // 调节灯的颜色、亮度、色温
    // Adjust the color, brightness, color temperature of the light
    dimmable: async (deviceId: string, data: object) => {
      return await this.generalRequest(deviceId, data, "POST", `/zeroconf/dimmable`);
    },

    // // 学习通道键值
    // // Learning channel key value
    // capture: async (
    //   deviceId: string,
    //   data: {
    //     rfChl: number;
    //   }
    // ) => {
    //   return await this.generalRequest(deviceId, data, "POST", `/zeroconf/capture`);
    // },
    //
    // // 退出学习通道键值
    // // Exit learning channel key value
    // cancelCapture: async (deviceId: string) => {
    //   return await this.generalRequest(deviceId, {}, "POST", `/zeroconf/capture/cancel`);
    // },
    //
    // // 获取通道键值列表
    // // Get channel key value list
    // getRFList: async (
    //   deviceId: string,
    //   data: {
    //     rangeStart: number;
    //     rangeEnd: number;
    //   }
    // ) => {
    //   if (data.rangeEnd > data.rangeStart && data.rangeEnd - data.rangeStart < 24) {
    //     return await this.generalRequest(deviceId, data, "POST", `/zeroconf/rflist/get`);
    //   } else {
    //     throw new Error("rangeEnd must be greater than rangeStart and rangeEnd - rangeStart must be less than 24");
    //   }
    // },
    //
    // // 发送通道键值
    // // Send channel key value
    // transmit: async (
    //   deviceId: string,
    //   data: {
    //     rfChl: number;
    //   }
    // ) => {
    //   return await this.generalRequest(deviceId, data, "POST", `/zeroconf/transmit`);
    // },

    // 网络指示灯开关
    // Switch network indicator light
    sledOnline: async (deviceId: string, data: object) => {
      return await this.generalRequest(deviceId, data, "POST", `/zeroconf/sledonline`);
    },

    // 设备上电状态设置
    // Set device power on status
    startups: async (deviceId: string, data: object) => {
      return await this.generalRequest(deviceId, data, "POST", `/zeroconf/startups`);
    },

    // 设备打开后自动关闭设置
    // Set device auto close after open
    pulses: async (deviceId: string, data: object) => {
      return await this.generalRequest(deviceId, data, "POST", `/zeroconf/pulses`);
    },

    // 传输是否加密
    // Whether to encrypt the transmission
    encrypt: async (
      deviceId: string,
      data: {
        encrypt: boolean;
      }
    ) => {
      return await this.generalRequest(deviceId, data, "POST", `/zeroconf/encrypt`);
    },

    // 设置加密密码
    // Set encryption password
    password: async (
      deviceId: string,
      data: {
        newPassword: string;
        oldPassword: string;
      }
    ) => {
      return await this.generalRequest(deviceId, data, "POST", `/zeroconf/password`);
    }
  };
}
