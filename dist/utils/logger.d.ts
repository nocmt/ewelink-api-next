import log4js from "log4js";
export declare const createLogger: (name: string, logLevel?: string | "info" | "debug" | "warn" | "error" | "fatal", filename?: string) => log4js.Logger;
