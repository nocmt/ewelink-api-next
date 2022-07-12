// 本地存储配置
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./');

export const storage = {
    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key: string) {
        return JSON.parse(<string>localStorage.getItem(key)) || "";
    },
    remove(key: string) {
        localStorage.removeItem(key);
    },
};