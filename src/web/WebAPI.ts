import { User } from './apis/user'
import { eWeLinkBase } from '../Base';

export class BaseWebAPI {
    // 创建一个私有只读的 root 属性，用于存储实例化的对象
    constructor(protected readonly root: WebAPI) {}
}

export class WebAPI extends eWeLinkBase {

    // 账号管理接口
    user = new User(this)

}

export interface WebAPI {}
