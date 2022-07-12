import { createHmac } from "crypto";

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
            )
        })
    })
}
// 随机8位字母数字
export const nonce =  (): string => Math.random().toString(36).slice(5);

// Hmac-Sha256签名
export const sign = (msg: string | object = "", appsecret: string): string => {
    let buffer = typeof msg === "string" ? msg : Buffer.from(JSON.stringify(msg), "utf-8");
    return createHmac("sha256", appsecret).update(buffer).digest("base64");
};