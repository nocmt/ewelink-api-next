import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { nonce } from "./index.js";
import dayjs from "dayjs";

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

  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

export const creatRequest = (config?: AxiosRequestConfig, logObj?: any): AxiosInstance => {
  // 创建axios的实例对象，添加全局配置
  // Create an instance object of Axios and add a global configuration
  const instance: AxiosInstance = axios.create(
    config || {
      baseURL: "",
      timeout: 20000
    }
  );

  // 请求拦截
  // Request interception
  instance.interceptors.request.use(
    (req: AxiosRequestConfig) => {
      if (["post", "put"].includes(typeof req.method === "string" ? req.method : "get")) {
        if (req.headers) {
          req.headers["Content-Type"] = "application/json";
          req.headers["X-CK-Nonce"] = nonce();
          req.headers["Date"] = String(dayjs().valueOf());
        }
      }
      if (logObj) {
        logObj.info("Send request: ", {
          url: req.url,
          method: req.method,
          baseURL: req.baseURL,
          headers: req.headers,
          params: req?.params,
          data: JSON.stringify(req?.data)
        });
      }
      return req;
    },
    function (error: any) {
      // 对请求错误做些什么
      // Do something with request error
      if (logObj) {
        logObj.error("request was aborted: ", error);
      }
      return Promise.reject(error);
    }
  );

  // 响应拦截
  // Response interception
  instance.interceptors.response.use(
    (res: { status: number; responseTime: number; data: any; config: any }) => {
      // 对响应数据做点什么
      // Do something with response data
      const responseTime = res.config?.headers?.Date
        ? parseInt(String(dayjs().valueOf())) - parseInt(res.config.headers?.Date)
        : null;

      const response = Object.assign({ status: res.status, responseTime }, res.data);
      if (logObj) {
        logObj.info("Response received：", JSON.stringify(response));
      }
      return response;
    },
    function (error: any) {
      // 对响应错误做点什么
      // Do something with response error
      if (logObj) {
        logObj.error("Incorrect response received: ", error);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
