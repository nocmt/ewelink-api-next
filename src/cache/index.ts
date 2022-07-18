// 本地存储配置
import { LocalStorage } from "node-localstorage";

const localStorage = new LocalStorage("./src/cache/temp");

export const storage = {
  set(key: string, value: any) {
    const valueObj = this.get(key);
    valueObj[Object.keys(value)[0]] = value;
    localStorage.setItem(key, JSON.stringify(valueObj));
  },
  get(key: string) {
    return JSON.parse(<string>localStorage.getItem(key)) || "";
  },
  remove(key: string) {
    localStorage.removeItem(key);
  }
};
