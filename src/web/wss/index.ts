import { Ws } from "../Ws.js";
import { storage } from "../../cache/index.js";
import { nonce } from "../../utils/index.js";
import WebSocket from "ws";

export type baseInfo = {
  region?: string | "cn" | "as" | "us" | "eu" | "test";
  fullUrl?: string;
};

export type connectInfo = {
  region?: string | "cn" | "as" | "us" | "eu" | "test";
  fullUrl?: string;
  at: string;
  userApiKey: string;
  appId: string;
};

export class LongConnection {
  constructor(protected readonly root: Ws) {}

  async getDispatch(options: baseInfo) {
    let res;
    if (options?.fullUrl) {
      res = await this.root.request.get(options.fullUrl);
    } else if (options?.region) {
      res = await this.root.request.get(
        `https://${options?.region}-dispa.coolkit.${
          ["cn", "test"].includes(options?.region) ? "cn" : "cc"
        }/dispatch/app`
      );
    } else {
      res = await this.root.request.get("https://dispa.coolkit.cc/dispatch/app");
    }
    let { IP, port, domain, reason } = res;
    if (reason !== "ok") throw new Error("Long connection address acquisition failed");
    storage.set("ws", { IP, port, domain });
    return `wss://${domain}:${port}/api/ws`;
  }

  ws: WebSocket | undefined;
  hbIntervalTimer: any = undefined; // 心跳定时器实例
  createHbTimer = ({ hb = 0, hbInterval = 130 } = {}) => {
    this.hbIntervalTimer && clearInterval(this.hbIntervalTimer);
    if (!hb) return;
    let intervalTime = Math.ceil(hbInterval * (0.8 + 0.2 * Math.random()));
    this.hbIntervalTimer = setInterval(() => {
      this.ws?.send("ping");
    }, intervalTime * 1000);
    this.root.logger?.info(`A timer for sending heartbeat packets has been created. Time interval: ${intervalTime}s`);
  };

  createConnect = async (options: connectInfo) => {
    if (options?.fullUrl) {
      this.ws = new WebSocket(options.fullUrl);
    } else {
      if (!options?.region) throw new Error("region is required");
      this.ws = new WebSocket(await this.getDispatch({ region: options.region }));
    }

    const _ws = this.ws;
    this.ws.on("open", () => {
      if (!_ws) {
        this.root.logger?.info("connection dropped, please reconnect");
        return;
      }
      _ws.send(
        JSON.stringify({
          action: "userOnline",
          at: options.at || this.root.at || "",
          apikey: options.userApiKey || this.root.userApiKey || "",
          appid: options.appId || this.root.appId || "",
          nonce: nonce(),
          userAgent: "app",
          sequence: new Date().getTime()
        })
      );
    });

    this.ws.on("close", (code, reason) => {
      if (_ws) {
        this.root.logger?.info(
          `connection dropped, please reconnect, code: ${code.toString()}, reason: ${reason.toString()}`
        );
      }
      if (this.hbIntervalTimer) {
        clearInterval(this.hbIntervalTimer);
        this.root.logger?.info("Timer cleared");
      }
      _ws && _ws.close();
    });

    this.ws.on("error", (err) => {
      this.root.logger?.info("connection dropped, please reconnect, error: " + err.message);
      // hbIntervalTimer && clearInterval(hbIntervalTimer) && Log.info('定时器已清除')
    });

    this.ws.on("message", (data) => {
      this.root.logger?.info("received: " + JSON.stringify(data));
      if (JSON.parse(JSON.stringify(data)) && JSON.parse(JSON.stringify(data)).config) {
        this.root.logger?.info("Handshake succeeded, please continue");
        this.createHbTimer(JSON.parse(JSON.stringify(data)).config);
      }
    });
    return this.ws;
  };
}
export interface LongConnection {}
