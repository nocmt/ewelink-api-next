import { WebAPI } from "./web/WebAPI.js";
import { Ws } from "./web/Ws.js";
import { Lan } from "./web/Lan.js";
declare const _default: {
    WebAPI: typeof WebAPI;
    Ws: typeof Ws;
    Lan: typeof Lan;
    createLogger: (name: string, logLevel?: string | undefined, filename?: string | undefined) => import("log4js").Logger;
    creatRequest: (config?: import("axios").AxiosRequestConfig<any> | undefined, logObj?: any) => import("axios").AxiosInstance;
};
export default _default;
