import axios from "axios";
import { nonce } from "./index.js";
import dayjs from "dayjs";
export const creatRequest = (config, logObj) => {
    // 创建axios的实例对象，添加全局配置
    // Create an instance object of Axios and add a global configuration
    const instance = axios.create(config || {
        baseURL: "",
        timeout: 20000
    });
    // 请求拦截
    // Request interception
    instance.interceptors.request.use((req) => {
        if (["post", "put"].includes(req.method || "")) {
            if (req.headers) {
                req.headers["Content-Type"] = "application/json";
            }
        }
        if (req.headers) {
            req.headers["X-CK-Nonce"] = nonce();
            req.headers["Date"] = String(dayjs().valueOf());
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
    }, function (error) {
        // 对请求错误做些什么
        // Do something with request error
        if (logObj) {
            logObj.error("request was aborted: ", error);
        }
        return Promise.reject(error);
    });
    // 响应拦截
    // Response interception
    instance.interceptors.response.use((res) => {
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
    }, function (error) {
        // 对响应错误做点什么
        // Do something with response error
        if (logObj) {
            logObj.error("Incorrect response received: ", error);
        }
        return Promise.reject(error);
    });
    return instance;
};
