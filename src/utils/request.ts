import axios, { AxiosInstance } from "axios";

// 创建axios的实例对象，添加全局配置
export const request: AxiosInstance = axios.create({
  baseURL: "",
  timeout: 80
});

// 请求拦截
request.interceptors.request.use((req) => {
  if (["post", "put"].includes(typeof req.method === "string" ? req.method : "get")) {
    if (req.headers) {
      req.headers["Content-Type"] = "application/json";
    }
  }
  return req;
});

// 响应拦截
request.interceptors.response.use((res) => {
  return Object.assign({ status: res.status }, res.data);
});
