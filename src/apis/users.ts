import { instance } from "../helpers/service";

export const users = {
    login : async (account:string="",password:string="",areaCode:string="") => {
        return await instance.post('/user/login', {
            account,
            password,
            "countryCode": areaCode
        })
    }
}