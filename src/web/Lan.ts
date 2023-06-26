import { Bonjour, Service } from "bonjour-service";
import { creatRequest } from "../utils/request.js";
import { AxiosInstance } from "axios";
import CryptoJS from "crypto-js";

let _logger: any;

// Type of parameter transferred when controlling equipment
export type controlOptions = {
  ip: string;
  port: string;
  deviceId: string;
  data: any;
  encrypt: boolean;
  secretKey?: string;
  iv?: string;
  selfApikey?: string;
};

export type serverOptions = {
  method: string | "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  ip: string;
  port: string;
  path: string;
  deviceId: string;
  data: any;
  encrypt: boolean;
  secretKey?: string;
  iv?: string;
  selfApikey?: string;
};

export type LanOptions = {
  selfApikey: string;
  logObj?: any;
  request?: string;
};

// let lanServerList: Service[] = []; // Service list 服务列表
// let lanServerDict: { [key: string]: Service } = {}; // Mapping table of device ID and service 设备ID与服务的映射表

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

  /**
   * Discover eWeLink devices in LAN
   * @param onDiscover callback function
   * @param type default: ewelink
   * @returns bonjourClient Bonjour Object
   */
  discovery(onDiscover: (server: Service) => void, type: string = "ewelink", ) {
    const bonjourClient = new Bonjour();
    bonjourClient.find({ type: type }, function (service: Service) {
      if (_logger) {
        _logger.info("Found an eWeLink mDns server: ", service);
      }
      // lanServerList.push(service);
      // storage.set("lanServerList", lanServerList);
      // lanServerDict[service.txt.id] = service;
      // storage.set("lanServerDict", lanServerDict);
      onDiscover(service);
    });
    return bonjourClient;
  }

  // getLocalServerList() {
  //   if (_logger) {
  //     _logger.info("lanServerList:", lanServerList);
  //   }
  //   return lanServerList;
  // }

  // getLocalServerDict() {
  //   if (_logger) {
  //     _logger.info("lanServerDict:", lanServerDict);
  //   }
  //   return lanServerDict;
  // }

  /**
   * data encrypt
   * @param {string} data -  data
   * @param {string} secretKey - secretKey
   * @param {string} iv - iv
   * @returns {string} encrypted data - encrypted data
   */
  encrypt(data: any, secretKey: string, iv: string): string {
    if (!data) return "";
    const cipher = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Hex.parse(secretKey), {
      iv: CryptoJS.enc.Base64.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return cipher.ciphertext.toString(CryptoJS.enc.Base64);
  }

  /**
   * data decrypt
   * @param {string} data -  encrypted data
   * @param {string} secretKey - secretKey
   * @param {string} iv - iv
   * @returns {Object} decrypted data - decrypted data
   */
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
  getDeviceIpPort(server: Service): {
    ip?: string;
    port?: number;
  } {
    if (server && server?.addresses) {
      const addresses = server.addresses || [];
      const ips: string[] = addresses.filter((ip: string) => {
        if (ip.length <= 32) {
          return {
            ip: ip,
            port: server.port || 8081
          };
        }
      });
      if (ips.length > 0) {
        return {
          ip: ips[0],
          port: server.port || 8081
        };
      }
    }
    return {};
  }

  async generalRequest(serverOptions: serverOptions) {
    if (serverOptions.encrypt) {
      if (!serverOptions?.iv && !serverOptions?.secretKey) {
        return new Error("iv is required when encrypt is true");
      }
      serverOptions.data = this.encrypt(serverOptions.data, serverOptions.secretKey || "", serverOptions.iv || "");
    }

    const body = {
      deviceid: serverOptions.deviceId,
      sequence: new Date().getTime().toString(),
      selfApikey: serverOptions.selfApikey || this.selfApikey,
      iv: serverOptions.iv,
      encrypt: serverOptions.encrypt,
      data: !serverOptions.encrypt ? JSON.stringify(serverOptions.data) : serverOptions.data
    };

    try {
      let requestConfig: { [key: string]: string | object } = {
        url: `http://${serverOptions.ip}:${serverOptions.port}${serverOptions.path}`,
        method: serverOptions.method.toLowerCase()
      };
      if (["post", "put", "patch", "putForm", "patchForm", "postForm"].includes(serverOptions.method.toLowerCase())) {
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
    switch: async (controlOptions: {
      ip: string;
      port: string;
      deviceId: string;
      data: { switch: "on" | "off" };
      encrypt: boolean;
      secretKey?: string;
      iv?: string;
      selfApikey?: string;
    }) => {
      return await this.generalRequest({
        ...controlOptions,
        path: "/zeroconf/switch",
        method: "post"
      });
    },

    // 多通道设备开关
    // Switch multiple channels
    switches: async (controlOptions: {
      ip: string;
      port: string;
      deviceId: string;
      data: {
        switches: [
          { switch: "on" | "off"; outlet: 0 },
          { switch: "on" | "off"; outlet: 1 },
          { switch: "on" | "off"; outlet: 2 },
          { switch: "on" | "off"; outlet: 3 }
        ];
      };
      encrypt: boolean;
      secretKey?: string;
      iv?: string;
      selfApikey?: string;
    }) => {
      return await this.generalRequest({
        ...controlOptions,
        path: "/zeroconf/switches",
        method: "post"
      });
    },

    // 调节灯的颜色、亮度、色温
    // Adjust the color, brightness, color temperature of the light
    dimmable: async (controlOptions: {
      ip: string;
      port: string;
      deviceId: string;
      data: {
        ltype: "white" | "color" | "party" | string;
        white?: { br: number; ct: number };
        party?: { br: number; r: number; g: number; b: number; tf: number; sp: number };
        color?: { br: number; r: number; g: number; b: number };
      };
      encrypt: boolean;
      secretKey?: string;
      iv?: string;
      selfApikey?: string;
    }) => {
      return await this.generalRequest({
        ...controlOptions,
        path: "/zeroconf/dimmable",
        method: "post"
      });
    },

    // 网络指示灯开关
    // Switch network indicator light
    sledOnline: async (controlOptions: {
      ip: string;
      port: string;
      deviceId: string;
      data: {
        sledOnline: boolean;
      };
      encrypt: boolean;
      secretKey?: string;
      iv?: string;
      selfApikey?: string;
    }) => {
      return await this.generalRequest({
        ...controlOptions,
        path: "/zeroconf/sledonline",
        method: "post"
      });
    },

    // 设备上电状态设置
    // Set device power on status
    startups: async (controlOptions: {
      ip: string;
      port: string;
      deviceId: string;
      data: {
        configure: [
          { startup: "on" | "off" | "stay"; outlet: 0 },
          { startup: "on" | "off" | "stay"; outlet: 1 },
          { startup: "on" | "off" | "stay"; outlet: 2 },
          { startup: "on" | "off" | "stay"; outlet: 3 }
        ];
      };
      encrypt: boolean;
      secretKey?: string;
      iv?: string;
      selfApikey?: string;
    }) => {
      return await this.generalRequest({
        ...controlOptions,
        path: "/zeroconf/startups",
        method: "post"
      });
    },

    // 设备打开后自动关闭设置
    // Set device auto close after open
    pulses: async (controlOptions: {
      ip: string;
      port: string;
      deviceId: string;
      data: {
        pulses: [
          {
            pulse: "on" | "off";
            width: number;
            outlet: 0;
          },
          {
            pulse: "on" | "off";
            width: number;
            outlet: 1;
          },
          {
            pulse: "on" | "off";
            width: number;
            outlet: 2;
          },
          {
            pulse: "on" | "off";
            width: number;
            outlet: 3;
          }
        ];
      };
      encrypt: boolean;
      secretKey?: string;
      iv?: string;
      selfApikey?: string;
    }) => {
      return await this.generalRequest({
        ...controlOptions,
        path: "/zeroconf/pulses",
        method: "post"
      });
    },

    // 传输是否加密
    // Whether to encrypt the transmission
    encrypt: async (controlOptions: {
      ip: string;
      port: string;
      deviceId: string;
      data: { encrypt: boolean };
      encrypt: boolean;
      secretKey?: string;
      iv?: string;
      selfApikey?: string;
    }) => {
      return await this.generalRequest({
        ...controlOptions,
        path: "/zeroconf/encrypt",
        method: "post"
      });
    },

    // 设置加密密码
    // Set encryption password
    password: async (controlOptions: {
      ip: string;
      port: string;
      deviceId: string;
      data: {
        newPassword: string;
        oldPassword: string;
      };
      encrypt: boolean;
      secretKey?: string;
      iv?: string;
      selfApikey?: string;
    }) => {
      return await this.generalRequest({
        ...controlOptions,
        path: "/zeroconf/encrypt",
        method: "post"
      });
    }
  };
}
