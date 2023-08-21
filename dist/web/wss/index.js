import { nonce } from "../../utils/index.js";
import WebSocket from "ws";
let ws; // WebSocket instance
let hbIntervalTimer; // Heartbeat timer instance
export class Connect {
    root;
    constructor(root) {
        this.root = root;
    }
    /**
     * Get the assigned long connection address
     *
     * @param options - The connection information.
     * @param options.region - The region.
     * @param options.fullUrl - The fullUrl.
     * @returns { Promise<string> } WSS address
     *
     * @beta
     */
    getDispatch = async (options) => {
        let res;
        if (options?.fullUrl) {
            res = await this.root.request.get(options.fullUrl);
        }
        else if (options?.region) {
            res = await this.root.request.get(`https://${options?.region}-dispa.coolkit.${["cn", "test"].includes(options?.region) ? "cn" : "cc"}/dispatch/app`);
        }
        else {
            res = await this.root.request.get("https://dispa.coolkit.cc/dispatch/app");
        }
        let { port, domain, reason } = res;
        if (reason !== "ok")
            throw new Error("Long connection address acquisition failed");
        return `wss://${domain}:${port}/api/ws`;
    };
    // Creat a websocket heartbeat timer
    createHbTimer = ({ hb = 0, hbInterval = 145 } = {}) => {
        // Clear the previous heartbeat timer
        hbIntervalTimer && clearInterval(hbIntervalTimer);
        if (!hb)
            return;
        // Create a new heartbeat timer
        let intervalTime = Math.ceil(hbInterval * (0.8 + 0.2 * Math.random()));
        hbIntervalTimer = setInterval(() => {
            this.root.logObj?.info("Send ping: ping");
            ws.send("ping");
        }, intervalTime * 1000);
        this.root.logObj?.info(`A timer for sending heartbeat packets has been created. Time interval: ${intervalTime}s`);
    };
    /**
     * Create a websocket connection
     * @param { baseInfo } options
     * @param onOpen - The onOpen event.
     * @param onClose - The onClose event.
     * @param onError - The onError event.
     * @param onMessage - The onMessage event.
     * @returns { Promise<WebSocket> } WebSocket instance
     *
     * @beta
     */
    create = async (options, onOpen, onClose, onError, onMessage) => {
        // If fullUrl is provided, use it directly
        if (options?.fullUrl) {
            ws = new WebSocket(options.fullUrl);
        }
        else {
            if (!options?.region)
                throw new Error("region is required");
            ws = new WebSocket(await this.getDispatch({ region: options.region }));
        }
        // Set onopen event
        ws.onopen = () => {
            // Send userOnline message
            this.root.logObj?.info("WebSocket connection has been established");
            const data = {
                action: "userOnline",
                at: options.at || this.root.at || "",
                apikey: options.userApiKey || this.root.userApiKey || "",
                appid: options.appId || this.root.appId || "",
                nonce: nonce(),
                userAgent: "app",
                sequence: new Date().getTime().toString()
            };
            this.root.logObj?.info(`Send userOnline message: ${JSON.stringify(data)}`);
            ws?.send(JSON.stringify(data));
            if (onOpen) {
                onOpen(ws);
            }
        };
        // Set onclose event
        ws.onclose = () => {
            if (hbIntervalTimer) {
                clearInterval(hbIntervalTimer);
                this.root.logObj?.info("WebSocket hbIntervalTimer cleared");
            }
            this.root.logObj?.info("WebSocket connection has been closed");
            ws && ws.close();
            if (onClose) {
                onClose();
            }
        };
        // Set onerror event
        ws.onerror = (error) => {
            this.root.logObj?.info("WebSocket connection dropped, please reconnect, error: " + error.message);
            if (hbIntervalTimer) {
                clearInterval(hbIntervalTimer);
                this.root.logObj?.info("WebSocket hbIntervalTimer cleared");
            }
            if (onError) {
                onError(error);
            }
        };
        // Set onmessage event
        ws.onmessage = (message) => {
            this.root.logObj?.info("WebSocket response received: " + message.data);
            if (message.data.toString()[0] === "{" && JSON.parse(message.data.toString())?.config) {
                this.root.logObj?.info("WebSocket handshake succeeded, creating heartbeat timer");
                this.createHbTimer(JSON.parse(message.data.toString())?.config);
            }
            if (onMessage) {
                onMessage(ws, message);
            }
        };
        return ws;
    };
    // Get userOnline message for your own business
    getUserOnline = async (options) => {
        return JSON.stringify({
            action: "userOnline",
            at: options.at || this.root.at || "",
            apikey: options.userApiKey || this.root.userApiKey || "",
            appid: options.appId || this.root.appId || "",
            nonce: nonce(),
            userAgent: options?.userAgent || "app",
            sequence: new Date().getTime().toString()
        });
    };
    /**
     * Generate messages to update device status
     *
     * @param deviceId - The device id.
     * @param params - The device status.
     * @param action - The action.
     * @param userAgent - The userAgent.
     * @param userApiKey  - The userApiKey.
     *
     * @returns { string } message
     *
     * @beta
     */
    getUpdateState = (deviceId, params, action, userAgent, userApiKey) => {
        const data = {
            action: action || "update",
            apikey: userApiKey || this.root.userApiKey,
            deviceid: deviceId,
            params: params,
            userAgent: userAgent || "app",
            nonce: nonce(),
            sequence: new Date().getTime().toString()
        };
        return JSON.stringify(data);
    };
    /**
     * Update device status
     *
     * @param deviceId - The device id.
     * @param params - The device status.
     * @param action - The action.
     * @param userAgent - The userAgent.
     * @param userApiKey - The userApiKey.
     * @returns { null | undefined } null | undefined
     *
     * @beta
     */
    updateState = (deviceId, params, action, userAgent, userApiKey) => {
        if (ws.readyState !== 1) {
            this.root.logObj?.info("WebSocket is not connected");
            return null;
        }
        const data = this.getUpdateState(deviceId, params, action, userAgent, userApiKey);
        this.root.logObj?.info("Send update message:：" + data);
        ws?.send(data);
    };
}
