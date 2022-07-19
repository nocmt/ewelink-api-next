// 本地存储配置
import { LocalStorage } from "node-localstorage";

const localStorage = new LocalStorage("cache");

export const storage = {
  set(key: string, value: any) {
    let valueObj = this.get(key) || {};
    if (valueObj[Object.keys(value)[0]]) {
      valueObj[Object.keys(value)[0]] = value[Object.keys(value)[0]];
    } else {
      valueObj = value;
    }
    localStorage.setItem(key, JSON.stringify(valueObj));
  },
  get(key: string) {
    return JSON.parse(<string>localStorage.getItem(key)) || {};
  },
  remove(key: string) {
    localStorage.removeItem(key);
  }
};
