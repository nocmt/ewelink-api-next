import { Ws } from "../Ws.js";
import WebSocket, { ErrorEvent, MessageEvent } from "ws";
export declare type baseInfo = {
    region?: string | "cn" | "as" | "us" | "eu" | "test";
    fullUrl?: string;
};
export declare type connectInfo = {
    region?: string | "cn" | "as" | "us" | "eu" | "test";
    fullUrl?: string;
    at: string;
    userApiKey: string;
    appId: string | "";
    userAgent?: string | "app";
};
export declare class Connect {
    protected readonly root: Ws;
    constructor(root: Ws);
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
    getDispatch: (options: baseInfo) => Promise<string>;
    private createHbTimer;
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
    create: (options: connectInfo, onOpen?: ((_ws: WebSocket) => void) | undefined, onClose?: () => void, onError?: ((error: ErrorEvent) => void) | undefined, onMessage?: ((_ws: WebSocket, message: MessageEvent) => void) | undefined) => Promise<WebSocket>;
    getUserOnline: (options: connectInfo) => Promise<string>;
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
    getUpdateState: (deviceId: string, params: object, action?: string | "update" | "upgrade" | "date", userAgent?: string | "app", userApiKey?: string) => string;
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
    updateState: (deviceId: string, params: object, action?: string | "update" | "upgrade" | "date", userAgent?: string | "app", userApiKey?: string) => null | undefined;
}
export interface Connect {
}
