// 本地存储配置
import { LocalStorage } from "node-localstorage";

const localStorage = new LocalStorage("cache");

export const storage = {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key: string) {
    return JSON.parse(<string>localStorage.getItem(key));
  },
  remove(key: string) {
    localStorage.removeItem(key);
  }
};
