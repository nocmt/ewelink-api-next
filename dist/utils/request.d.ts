import { AxiosInstance, AxiosRequestConfig } from "axios";
declare module "axios" {
    interface AxiosResponse<T = any> {
        error: number;
        msg: string;
        IP: string;
        port: number;
        domain: string;
        reason: string;
        responseTime: number;
    }
    function create(config?: AxiosRequestConfig): AxiosInstance;
}
export declare const creatRequest: (config?: AxiosRequestConfig, logObj?: any) => AxiosInstance;
