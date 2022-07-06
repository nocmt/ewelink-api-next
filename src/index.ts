import { users } from './apis/users'
import { instance } from './helpers/service'

const eWeLink = class {
    config = {
        appId: "",
        appSecret: "",
        region: "",
        apiPath: ""
    };

    public constructor(appId: string, appSecret: string, region:string = "cn") {
        this.config.appId = appId;
        this.config.appSecret = appSecret;
        this.config.region = region;
        this.config.apiPath = `https://${region}.apia.coolkit.${ region==="cn"? "cn":"cc"}`;
        instance.defaults.baseURL = this.config.apiPath;
    }

    public greet() {
        return this.config.apiPath;
    }

};

Object.assign(eWeLink.prototype, users);

export default eWeLink;