import { Bonjour, Service } from "bonjour-service";
import { creatRequest } from "../utils/request.js";
import { AxiosInstance } from "axios";
import { storage } from "../cache/index.js";
import CryptoJS from "crypto-js";

let _logger: any;

// Type of parameter transferred when controlling equipment
export type ControlOptions = {
  deviceId: string;
  data: any;
  secretKey: string;
  iv?: string;
  encrypt?: boolean;
  ipPort?: string;
};

export type LanOptions = {
  selfApikey: string;
  logObj?: any;
  request?: string;
};

let lanServerList: Service[] = []; // Service list 服务列表
let lanServerDict: { [key: string]: Service } = {}; // Mapping table of device ID and service 设备ID与服务的映射表

export class Lan {
  logObj?: any;
  selfApikey: string = "";
  request: AxiosInstance | any;

  constructor(options?: LanOptions) {
    if (!options) return;
    _logger = this.logObj = options.logObj;
    this.request = options.request || creatRequest(undefined, this.logObj);
    this.selfApikey = options.selfApikey;
  }

  // 发现局域网内易微联设备
  // Discover eWeLink devices in LAN
  discovery(type: string = "ewelink", onDiscover?: (server: Service) => void) {
    const bonjourClient = new Bonjour();
    bonjourClient.find({ type: type }, function (service: Service) {
      if (_logger) {
        _logger.info("Found an eWeLink mdns server:", service);
      }
      lanServerList.push(service);
      storage.set("lanServerList", lanServerList);
      lanServerDict[service.txt.id] = service;
      storage.set("lanServerDict", lanServerDict);
      if (onDiscover) {
        onDiscover(service);
      }
    });
    return bonjourClient;
  }

  getLocalServerList() {
    if (_logger) {
      _logger.info("lanServerList:", lanServerList);
    }
    return lanServerList;
  }

  getLocalServerDict() {
    if (_logger) {
      _logger.info("lanServerDict:", lanServerDict);
    }
    return lanServerDict;
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
  getDeviceIpPort(server: Service): string {
    if (server && server?.addresses) {
      const addresses = server.addresses || [];
      const ips: string[] = addresses.filter((ip: string) => {
        if (ip.length <= 32) {
          return ip;
        }
      });
      if (ips.length > 0) {
        return `${ips[0]}:${server.port || "8081"}`;
      }
    }
    return "";
  }

  async generalRequest(
    method: string | "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    api: string,
    deviceId: string,
    data: any,
    secretKey: string,
    iv?: string,
    encrypt?: boolean,
    ipPort?: string
  ) {
    // encrypt undefined,false,true
    encrypt = encrypt === undefined ? true : encrypt; // default true
    // If the device ID is not passed in, it is obtained from the local cache
    if (!iv || !ipPort) {
      // Get real-time records
      if (lanServerDict[deviceId]) {
        iv = iv || lanServerDict[deviceId].txt.iv;
        ipPort = ipPort || this.getDeviceIpPort(lanServerDict[deviceId]);
      } else {
        // Get local records
        const _lanServerDict = storage.get("lanServerDict") || {};
        if (_lanServerDict[deviceId]) {
          iv = iv || _lanServerDict[deviceId].txt.iv;
          ipPort = ipPort || this.getDeviceIpPort(_lanServerDict[deviceId]);
        }
      }
    }

    if (!ipPort) {
      throw new Error("Device ipPort is empty, Device may not be in LAN");
    }

    if (encrypt && iv) {
      data = this.encrypt(data, secretKey, iv);
    }

    const body = {
      deviceid: deviceId,
      sequence: new Date().getTime().toString(),
      selfApikey: this.selfApikey,
      iv: iv,
      encrypt: encrypt,
      data: !encrypt ? JSON.stringify(data) : data
    };

    try {
      let requestConfig: { [key: string]: string | object } = {
        url: `http://${ipPort}${api}`,
        method: method.toLowerCase()
      };
      if (["post", "put", "patch", "putForm", "patchForm", "postForm"].includes(method.toLowerCase())) {
        requestConfig["data"] = body;
      } else {
        requestConfig["params"] = body;
      }

      return await this.request.request(requestConfig);
    } catch (error) {
      if (_logger) {
        _logger.error(error);
      }
      throw new Error("Request error, please check the network, or the device not online.");
    }
  }

  // General interface
  zeroconf = {
    // 单通道设备开关
    // Switch single channel device
    switch: async (controlOptions: ControlOptions) => {
      return await this.generalRequest(
        "POST",
        "/zeroconf/switch",
        controlOptions.deviceId,
        controlOptions.data,
        controlOptions.secretKey,
        controlOptions?.iv,
        controlOptions?.encrypt,
        controlOptions?.ipPort
      );
    },

    // 多通道设备开关
    // Switch multiple channels
    switches: async (controlOptions: ControlOptions) => {
      return await this.generalRequest(
        "POST",
        "/zeroconf/switches",
        controlOptions.deviceId,
        controlOptions.data,
        controlOptions.secretKey,
        controlOptions?.iv,
        controlOptions?.encrypt,
        controlOptions?.ipPort
      );
    },

    // 调节灯的颜色、亮度、色温
    // Adjust the color, brightness, color temperature of the light
    dimmable: async (controlOptions: ControlOptions) => {
      return await this.generalRequest(
        "POST",
        "/zeroconf/dimmable",
        controlOptions.deviceId,
        controlOptions.data,
        controlOptions.secretKey,
        controlOptions?.iv,
        controlOptions?.encrypt,
        controlOptions?.ipPort
      );
    },

    // 网络指示灯开关
    // Switch network indicator light
    sledOnline: async (controlOptions: ControlOptions) => {
      return await this.generalRequest(
        "POST",
        "/zeroconf/sledonline",
        controlOptions.deviceId,
        controlOptions.data,
        controlOptions.secretKey,
        controlOptions?.iv,
        controlOptions?.encrypt,
        controlOptions?.ipPort
      );
    },

    // 设备上电状态设置
    // Set device power on status
    startups: async (controlOptions: ControlOptions) => {
      return await this.generalRequest(
        "POST",
        "/zeroconf/startups",
        controlOptions.deviceId,
        controlOptions.data,
        controlOptions.secretKey,
        controlOptions?.iv,
        controlOptions?.encrypt,
        controlOptions?.ipPort
      );
    },

    // 设备打开后自动关闭设置
    // Set device auto close after open
    pulses: async (controlOptions: ControlOptions) => {
      return await this.generalRequest(
        "POST",
        "/zeroconf/pulses",
        controlOptions.deviceId,
        controlOptions.data,
        controlOptions.secretKey,
        controlOptions?.iv,
        controlOptions?.encrypt,
        controlOptions?.ipPort
      );
    },

    // 传输是否加密
    // Whether to encrypt the transmission
    encrypt: async (controlOptions: {
      deviceId: string;
      data: {
        encrypt: boolean;
      };
      ipPort?: string;
      secretKey: string;
      iv?: string;
      encrypt?: boolean;
    }) => {
      return await this.generalRequest(
        "POST",
        "/zeroconf/encrypt",
        controlOptions.deviceId,
        controlOptions.data,
        controlOptions.secretKey,
        controlOptions?.iv,
        controlOptions?.encrypt,
        controlOptions?.ipPort
      );
    },

    // 设置加密密码
    // Set encryption password
    password: async (controlOptions: {
      deviceId: string;
      data: {
        newPassword: string;
        oldPassword: string;
      };
      ipPort?: string;
      secretKey: string;
      iv?: string;
      encrypt?: boolean;
    }) => {
      return await this.generalRequest(
        "POST",
        "/zeroconf/password",
        controlOptions.deviceId,
        controlOptions.data,
        controlOptions.secretKey,
        controlOptions?.iv,
        controlOptions?.encrypt,
        controlOptions?.ipPort
      );
    }
  };
}
