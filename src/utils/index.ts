import { createHmac } from "crypto";
import { storage } from "../cache/index.js";
import dayjs from "dayjs";

// 混合模式，将其他类的方法添加到 derivedCtor 类的原型上。
export const applyMixins = (derivedCtor: any, constructors: any[]) => {
  constructors.forEach((baseCtor) => {
    // 获取baseCtor的属性名称，循环输出
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      // 定义属性
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        // 获取自己的属性描述符
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
      );
    });
  });
};
// Random {size}-digit alphanumeric
export const nonce = (size: Number = 8): string => Math.random().toString(36).slice(-size);

export const fnParams2Url = (obj: any) => {
  let aUrl = [];
  let fnAdd = function (key: string, value: string) {
    return key + "=" + value;
  };
  for (let k in obj) {
    aUrl.push(fnAdd(k, obj[k]));
  }
  return encodeURIComponent(aUrl.join("&"));
};

// Hmac-Sha256 Sign
export const sign = (msg: object, appSecret: string, isFormat: boolean = false): string => {
  let buffer;
  if (isFormat) {
    let txt: Array<string> = [];
    Object.keys(msg).forEach((key: string) => {
      // Type-Expression：
      // https://bobbyhadz.com/blog/typescript-element-implicitly-has-any-type-expression
      // https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions
      txt.push(`${key}=${msg[key as keyof typeof msg]}`);
    });
    buffer = txt.join("&");
  } else {
    buffer = Buffer.from(JSON.stringify(msg), "utf-8");
  }
  return createHmac("sha256", appSecret).update(buffer).digest("base64");
};

// 存储token
export const saveToken = (res: any, account: string) => {
  storage.set(res.data.region, {
    [account]: {
      at: res.data.at,
      rt: res.data.rt,
      createTime: dayjs().format()
    }
  });
};

// 读取token
export const getToken = (region: string, account: string) => {
  const valueObj = storage.get(region);
  if (valueObj[account]) {
    return valueObj[account].at;
  }
  return "";
};
