import { Bonjour, Service } from "bonjour-service";
import { AxiosInstance } from "axios";
export declare type controlOptions = {
    ip: string;
    port: string;
    deviceId: string;
    data: any;
    encrypt: boolean;
    secretKey?: string;
    iv?: string;
    selfApikey?: string;
};
export declare type serverOptions = {
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
export declare type LanOptions = {
    selfApikey: string;
    logObj?: any;
    request?: string;
};
export declare class Lan {
    logObj?: any;
    selfApikey: string;
    request: AxiosInstance | any;
    constructor(options?: LanOptions);
    /**
     * Discover eWeLink devices in LAN
     *
     * @param onDiscover - callback function
     * @param type - default: ewelink
     * @returns bonjourClient - Bonjour Object
     *
     * @beta
     */
    discovery(onDiscover: (server: Service) => void, type?: string): Bonjour;
    /**
     * data encrypt
     *
     * @param data -  data
     * @param secretKey - secretKey
     * @param iv - iv
     * @returns encrypted data - encrypted data
     *
     * @beta
     */
    encrypt(data: any, secretKey: string, iv: string): string;
    /**
     * data decrypt
     * @param data -  encrypted data
     * @param secretKey - secretKey
     * @param iv - iv
     * @returns decrypted data - decrypted data
     *
     * @beta
     */
    decrypt(data: string, secretKey: string, iv: string): object;
    /**
     * Obtain the device's IP and port from the service
     *
     * @param server
     * @return ip - ip
     * @return port - port
     *
     * @beta
     */
    getDeviceIpPort(server: Service): {
        ip?: string;
        port?: number;
    };
    /**
     * General Request
     * @param serverOptions - serverOptions
     * @param serverOptions.method - Request method
     * @param serverOptions.ip - Device IP
     * @param serverOptions.port - Device port
     * @param serverOptions.path - Request path
     * @param serverOptions.deviceId - Device ID
     * @param serverOptions.data - Request data
     * @param serverOptions.encrypt - Whether to encrypt the request data
     * @param serverOptions.secretKey - Encryption password
     * @param serverOptions.iv - iv
     * @param serverOptions.selfApikey - selfApikey
     *
     * @returns response - Data returned by the device
     *
     * @beta
     */
    generalRequest(serverOptions: serverOptions): Promise<any>;
    zeroconf: {
        /**
         * Switch single channel device
         */
        switch: (controlOptions: {
            ip: string;
            port: string;
            deviceId: string;
            data: {
                switch: "on" | "off";
            };
            encrypt: boolean;
            secretKey?: string;
            iv?: string;
            selfApikey?: string;
        }) => Promise<any>;
        /**
         * Switch multiple channels
         */
        switches: (controlOptions: {
            ip: string;
            port: string;
            deviceId: string;
            data: {
                switches: [
                    {
                        switch: "on" | "off";
                        outlet: 0;
                    },
                    {
                        switch: "on" | "off";
                        outlet: 1;
                    },
                    {
                        switch: "on" | "off";
                        outlet: 2;
                    },
                    {
                        switch: "on" | "off";
                        outlet: 3;
                    }
                ];
            };
            encrypt: boolean;
            secretKey?: string;
            iv?: string;
            selfApikey?: string;
        }) => Promise<any>;
        /**
         * Adjust the color, brightness, color temperature of the light
         */
        dimmable: (controlOptions: {
            ip: string;
            port: string;
            deviceId: string;
            data: {
                ltype: "white" | "color" | "party" | string;
                white?: {
                    br: number;
                    ct: number;
                };
                party?: {
                    br: number;
                    r: number;
                    g: number;
                    b: number;
                    tf: number;
                    sp: number;
                };
                color?: {
                    br: number;
                    r: number;
                    g: number;
                    b: number;
                };
            };
            encrypt: boolean;
            secretKey?: string;
            iv?: string;
            selfApikey?: string;
        }) => Promise<any>;
        /**
         * Switch network indicator light
         */
        sledOnline: (controlOptions: {
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
        }) => Promise<any>;
        /**
         * Set device power on status
         */
        startups: (controlOptions: {
            ip: string;
            port: string;
            deviceId: string;
            data: {
                configure: [
                    {
                        startup: "on" | "off" | "stay";
                        outlet: 0;
                    },
                    {
                        startup: "on" | "off" | "stay";
                        outlet: 1;
                    },
                    {
                        startup: "on" | "off" | "stay";
                        outlet: 2;
                    },
                    {
                        startup: "on" | "off" | "stay";
                        outlet: 3;
                    }
                ];
            };
            encrypt: boolean;
            secretKey?: string;
            iv?: string;
            selfApikey?: string;
        }) => Promise<any>;
        /**
         * Set device auto close after open
         */
        pulses: (controlOptions: {
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
        }) => Promise<any>;
        /**
         * Whether to encrypt the transmission
         */
        encrypt: (controlOptions: {
            ip: string;
            port: string;
            deviceId: string;
            data: {
                encrypt: boolean;
            };
            encrypt: boolean;
            secretKey?: string;
            iv?: string;
            selfApikey?: string;
        }) => Promise<any>;
        /**
         * Set encryption password
         */
        password: (controlOptions: {
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
        }) => Promise<any>;
    };
}
