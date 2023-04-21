import log4js from "log4js";
import path from "path";

export const createLogger = (
  name: string,
  logLevel?: string | "info" | "debug" | "warn" | "error" | "fatal",
  filename?: string
) => {
  log4js.configure({
    appenders: {
      // allLog: { type: "dateFile", filename: "./logs/t", pattern: "yyyy-MM-dd.log", alwaysIncludePattern: true },
      // http请求日志  http请求日志需要引用一下， 这样才会自动记录每次的请求信息
      // HTTP request log HTTP request log requires app Use to quote, so that each request information can be automatically recorded
      httpLog: {
        type: "dateFile",
        filename: filename || path.join("logs", "default.log"),
        pattern: "yyyy-MM-dd",
        keepFileExt: true,
        alwaysIncludePattern: true,
        flags: "a" // 'a' is to append log, 'w' is the one before deletion
      }
    },
    categories: {
      default: { appenders: ["httpLog"], level: logLevel || "debug" }
    }
  });
  return log4js.getLogger(name);
};
