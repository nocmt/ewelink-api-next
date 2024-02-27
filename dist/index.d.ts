import * as axios from 'axios';
import { AxiosInstance } from 'axios';
import * as log4js from 'log4js';
import WebSocket, { ErrorEvent, MessageEvent } from 'ws';
import { Service, Bonjour } from 'bonjour-service';

type eWeLinkBaseOptions = {
    appId: string;
    appSecret: string;
    region: string;
    logObj?: any;
    request?: any;
};
declare class eWeLinkBase {
    appId?: string;
    appSecret?: string;
    region?: string;
    endpoint: string;
    at: string;
    rt: string;
    account: string;
    userApiKey: string;
    logObj?: any;
    request: AxiosInstance | any;
    constructor(options?: eWeLinkBaseOptions);
    /**
     * Set the URL for the request
     *
     * @param region - The region.
     * @returns null
     *
     * @beta
     */
    setUrl: (region: string) => void;
    /**
     * Set APPID and APP SECRET
     * @param appId - The APPID.
     * @param appSecret - The APP SECRET.
     * @returns null
     *
     * @beta
     */
    setAuthConfigs: (appId: string, appSecret: string) => void;
}
interface eWeLinkBase {
}

interface GetRegion extends BaseWebAPI {
}
declare class GetRegion {
    /**
     * Obtain the region corresponding to the country/region code
     * @description Query the server area corresponding to the telephone area code
     *
     * @param options - The region information.
     * @param options.areaCode - The area code.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getRegion(options: {
        areaCode: string;
    }): Promise<any>;
}

type accountInfo$6 = {
    account: string;
    password: string;
    areaCode: string;
    lang?: "en" | "cn";
};
interface Login extends BaseWebAPI {
}
declare class Login {
    /**
     * Login
     * @description You should log in before you access device data or other resources
     *
     * @param options - The account information.
     * @param options.account - The account.
     * @param options.password - The password.
     * @param options.areaCode - The area code.
     * @param options.lang - option, The language, cn or en. Default is cn.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    login(options: accountInfo$6): Promise<any>;
}

type accountInfo$5 = {
    account: string;
    password: string;
    areaCode: string;
    code: string;
};
interface Register extends BaseWebAPI {
}
declare class Register {
    /**
     * register
     * @description register
     *
     * @param options - The account information.
     * @param options.account - The account.
     * @param options.password - The password.
     * @param options.areaCode - The area code.
     * @param options.code - Verification code.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    register(options: accountInfo$5): Promise<any>;
}

type accountInfo$4 = {
    phoneNumber: string;
    areaCode: string;
    code: string;
    lang?: "en" | "cn";
};
interface SMSLogin extends BaseWebAPI {
}
declare class SMSLogin {
    /**
     * SMS Login
     * @description Only users registered by phone number in mainland China has access to this.
     *
     * @param options - The account information.
     * @param options.phoneNumber - The phone number.
     * @param options.areaCode - The area code.
     * @param options.code - Verification code.
     * @param options.lang - option, The language, cn or en. Default is cn.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    smsLogin(options: accountInfo$4): Promise<any>;
}

type accountInfo$3 = {
    type: number | string | "register" | "resetPwd" | "logout" | "SMSLogin";
    account: string;
};
interface SendCode extends BaseWebAPI {
}
declare class SendCode {
    /**
     * Send Verification Code
     * @description Send verification code to email or phone number.
     *
     * @param options - The account information.
     * @param options.type - The type of Verification code
     * @param options.account - The account.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    sendCode(options: accountInfo$3): Promise<any>;
}

type accountInfo$2 = {
    account: string;
    newPassword: string;
    code: string;
};
interface ResetPwd extends BaseWebAPI {
}
declare class ResetPwd {
    /**
     * Reset Password
     * @description When you forgot your password, reset password with this endpoint.
     *
     * @param options - The account information.
     * @param options.account - The account.
     * @param options.newPassword - The new password.
     * @param options.code - Verification code.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    resetPwd(options: accountInfo$2): Promise<any>;
}

type accountInfo$1 = {
    oldPassword: string;
    newPassword: string;
};
interface ChangePwd extends BaseWebAPI {
}
declare class ChangePwd {
    /**
     * Change Password
     * @description After you have logged in, you can use this endpoint to change your password with your old password.
     *
     * @param options - The base information.
     * @param options.oldPassword - The old password.
     * @param options.newPassword - The new password.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    changePwd(options: accountInfo$1): Promise<any>;
}

interface GetUserInfo extends BaseWebAPI {
}
declare class GetUserInfo {
    /**
     * Get User Info
     * @description Get the information of current account such as the nickname.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getUserInfo(): Promise<any>;
}

type userInfo = {
    nickname?: string;
    acceptEmailAd?: boolean;
    accountConsult?: true | null;
    timezone?: {
        id: string;
        offset: number;
    };
    language?: string;
    lang?: string | "en" | "cn";
    emailSubscription?: {
        email: string;
    };
};
interface UpdateUserInfo extends BaseWebAPI {
}
declare class UpdateUserInfo {
    /**
     * Update User Info
     * @description Update the information of current account such as the nickname.
     *
     * @param options - The account information.
     * @param options.nickname - option, The nickname.
     * @param options.acceptEmailAd - option, Whether to accept email subscription advertisements.
     * @param options.accountConsult - option, Have you received member consultation feedback?
     * @param options.timezone - option, The timezone.
     * @param options.language - option, option, The language.
     * @param options.lang - option, The language, cn or en. Default is cn.
     * @param options.emailSubscription - option, The email subscription.
     * @param options.emailSubscription.email - The email.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    updateUserInfo(options: userInfo): Promise<any>;
}

type accountInfo = {
    rt?: string;
};
interface RefreshToken extends BaseWebAPI {
}
declare class RefreshToken {
    /**
     * Refresh Access Token
     * @description 'access token' expires in 30 days (for security reasons) by default. When this happens, no need to log in again to GET@'access token', just use 'Refresh Token' endpoint to refresh the 'access token'.
     *
     * @param options - The account information.
     * @param options.rt - Refresh token.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    refreshToken(options: accountInfo): Promise<any>;
}

interface Logout extends BaseWebAPI {
}
declare class Logout {
    /**
     * logout
     * @description logout
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    logout(): Promise<any>;
}

type baseInfo$d = {
    code: string;
};
interface DeleteAccount extends BaseWebAPI {
}
declare class DeleteAccount {
    /**
     * Delete Account
     * @description Delete account
     *
     * @param options - The base information.
     * @param options.code - Verification code.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    deleteAccount(options: baseInfo$d): Promise<any>;
}

declare class User {
    protected readonly root: WebAPI;
    constructor(root: WebAPI);
}
interface User extends GetRegion, Login, Register, SMSLogin, SendCode, ResetPwd, ChangePwd, GetUserInfo, UpdateUserInfo, RefreshToken, Logout, DeleteAccount {
}

type homePageInfo$1 = {
    lang?: "en" | "cn";
    clientInfo?: {
        model?: string;
        os?: "Android" | "iOS";
        imei?: string;
        romVersion?: string;
        appVersion?: string;
    };
    getUser?: Object;
    getFamily?: Object;
    getThing?: {
        num?: number | 30;
        beginIndex?: number | -9999999;
    };
    getScene?: Object;
    getMessage?: {
        from?: number;
        num?: number | 30;
    };
};
interface HomePage extends BaseWebAPI {
}
declare class HomePage {
    /**
     * HomePage
     * @description Allows you to check messages, scenes, things, homes, and user info.
     *
     * @param options - The home page information.
     * @param options.lang - option, The language. en: English, cn: Chinese.
     * @param options.clientInfo - option, The client information.
     * @param options.clientInfo.model - option, The client model.
     * @param options.clientInfo.os - option, The client os.
     * @param options.clientInfo.imei - option, The client imei.
     * @param options.clientInfo.romVersion - option, The client romVersion.
     * @param options.clientInfo.appVersion - option, The client appVersion.
     * @param options.getUser - option, The user information.
     * @param options.getFamily - option, The family information.
     * @param options.getThing - option, The thing information.
     * @param options.getThing.num - option, The thing num.
     * @param options.getThing.beginIndex - option, The thing beginIndex.
     * @param options.getScene - option, The scene information.
     * @param options.getMessage - option, The message information.
     * @param options.getMessage.from - option, The message from.
     * @param options.getMessage.num - option, The message num.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    homePage(options: homePageInfo$1): Promise<any>;
}

type baseInfo$c = {
    name: string;
    sort: number | 1 | 2;
    roomNameList?: string[];
};
interface AddFamily extends BaseWebAPI {
}
declare class AddFamily {
    /**
     * Create 1 new family
     *
     * @param options - The base information.
     * @param options.name - The family name.
     * @param options.sort - The family sort. 1: positive sequence, 2: reverse sequence.
     * @param options.roomNameList - The room name list.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    addFamily(options: baseInfo$c): Promise<any>;
}

type familyInfo = {
    familyId: string;
    name: string;
    sort: number | 1 | 2;
};
interface AddRoom extends BaseWebAPI {
}
declare class AddRoom {
    /**
     * Create 1 new room
     *
     * @param options - The family information.
     * @param options.familyId - The family id.
     * @param options.name - The room name.
     * @param options.sort - The room sort. 1: positive sequence, 2: reverse sequence.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    addRoom(options: familyInfo): Promise<any>;
}

type baseInfo$b = {
    id: string;
    deviceFamily: string;
    switchFamily: string;
};
interface DelFamily extends BaseWebAPI {
}
declare class DelFamily {
    /**
     * Delete 1 family
     *
     * @param options - The family information.
     * @param options.id - The family id.
     * @param options.deviceFamily - Family ID of mobile device.
     * @param options.switchFamily - Family ID of switch.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    delFamily(options: baseInfo$b): Promise<any>;
}

type baseInfo$a = {
    id: string;
};
interface DelRoom extends BaseWebAPI {
}
declare class DelRoom {
    /**
     * Delete 1 room
     *
     * @param options - The room information.
     * @param options.id - The room id.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    delRoom(options: baseInfo$a): Promise<any>;
}

type baseInfo$9 = {
    lang?: "en" | "cn";
};
interface GetFamily extends BaseWebAPI {
}
declare class GetFamily {
    /**
     * Obtaining Family Information
     *
     * @param options - The family information.
     * @param options.lang - option, The language. en: English, cn: Chinese.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getFamily(options: baseInfo$9): Promise<any>;
}

type baseInfo$8 = {
    id?: string;
    newName: string;
};
interface SetFamily extends BaseWebAPI {
}
declare class SetFamily {
    /**
     * Change Home Name
     * @description Currently, it only allows you to change the name of a home
     *
     * @param options - The base information.
     * @param options.id - option, The family id. Default is the current family.
     * @param options.newName - The new family name.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setFamily(options: baseInfo$8): Promise<any>;
}

type baseInfo$7 = {
    id: string;
    newName: string;
};
interface SetRoom extends BaseWebAPI {
}
declare class SetRoom {
    /**
     * Change Room Name
     * @description Currently, it only allows you to change the name of a room
     *
     * @param options - The base information.
     * @param options.id - The room id.
     * @param options.newName - The new room name.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setRoom(options: baseInfo$7): Promise<any>;
}

type baseInfo$6 = {
    roomId: string;
    oldThingList: string[];
    newThingList: string[];
};
interface SetThing extends BaseWebAPI {
}
declare class SetThing {
    /**
     * Move Things
     * @description Move groups and devices to a specified room
     *
     * @param options - The base information.
     * @param options.roomId - The room id.
     * @param options.oldThingList - The old thing list.
     * @param options.newThingList - The new thing list.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setThing(options: baseInfo$6): Promise<any>;
}

type baseInfo$5 = {
    familyId?: string;
    idList: string[];
};
interface SortRoom extends BaseWebAPI {
}
declare class SortRoom {
    /**
     * Sort Rooms
     * @description To change the order, you must designate the order of each room in the home.
     *
     * @param options - The base information.
     * @param options.familyId - option, The family id. Default is the current family.
     * @param options.idList - The room id list.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    sortRoom(options: baseInfo$5): Promise<any>;
}

type baseInfo$4 = {
    familyId?: string;
    thingList: Array<{
        itemType?: string;
        id?: string;
    }>;
};
interface SortThing extends BaseWebAPI {
}
declare class SortThing {
    /**
     * Sort Things in a Home
     * @description To change the order, you must specify the order of each device or group in the home.
     *
     * @param options - The base information.
     * @param options.familyId - option, The family id. Default is the current family.
     * @param options.thingList - The thing list.
     * @param options.thingList[].itemType - The thing type. Default is "thing".
     * @param options.thingList[].id - The thing id.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    sortThing(options: baseInfo$4): Promise<any>;
}

type baseInfo$3 = {
    id: string;
};
interface SwitchFamily extends BaseWebAPI {
}
declare class SwitchFamily {
    /**
     * Switch Current Family
     * @description Switch to the default family
     *
     * @param options - The base information.
     * @param options.id - Target Family ID.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    switchFamily(options: baseInfo$3): Promise<any>;
}

declare class Home {
    protected readonly root: WebAPI;
    constructor(root: WebAPI);
}
interface Home extends HomePage, AddFamily, AddRoom, DelFamily, DelRoom, GetFamily, SetFamily, SetRoom, SetThing, SortRoom, SortThing, SwitchFamily {
}

type thingInfo$6 = {
    familyId?: string;
    lang?: "en" | "cn";
    num?: number | 30;
    beginIndex?: number | -9999999;
};
interface GetAllThings extends BaseWebAPI {
}
declare class GetAllThings {
    /**
     * Get all devices and groups under the user
     *
     * @param options - The things information.
     * @param options.familyId - option, The family id.
     * @param options.lang -  option, The language. 'en' or 'cn'.
     * @param options.num -  option, The number of things per page. Default is 0 means all things.
     * @param options.beginIndex - The index of the first thing. Default is -9999999.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getAllThings(options: thingInfo$6): Promise<any>;
    /**
     * Get all devices and groups under the user (All pages)
     *
     * @param options - The things information.
     * @param options.familyId - option, The family id.
     * @param options.lang -  option, The language. 'en' or 'cn'.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getAllThingsAllPages(options: thingInfo$6): Promise<{
        status: number;
        error: number;
        msg: string;
        data: {
            thingList: any[];
            total: number;
        };
    } | {
        status: number;
        error: number;
        msg: unknown;
        data: {
            thingList: never[];
            total: number;
        };
    }>;
}

type deviceInfo$8 = {
    name?: string;
    deviceId: string;
    settings?: {
        opsNotify?: 0 | 1;
        opsHistory?: 0 | 1;
        alarmNotify?: 0 | 1;
    };
    ifrCode?: string;
    deviceKey: string;
    chipId?: string;
    familyId?: string;
    roomId?: string;
    sort?: 1 | 2;
};
interface AddDevice extends BaseWebAPI {
}
declare class AddDevice {
    /**
     * Add a new Wi-Fi Device.
     *
     * @param options - The device information.
     * @param options.name - option, The device name.
     * @param options.deviceId - The device id.
     * @param options.settings - option, The device settings.
     * @param options.settings.opsNotify - option, The device settings.
     * @param options.settings.opsHistory - option, The device settings.
     * @param options.settings.alarmNotify - option, The device settings.
     * @param options.ifrCode - option, Code value of infrared devices.
     * @param options.deviceKey - The device apikey.
     * @param options.chipId - The device chipid.
     * @param options.familyId - option, The device familyId.
     * @param options.roomId - option, The device roomId.
     * @param options.sort - The device sort. 1: positive sequence, 2: reverse sequence
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    addDevice(options: deviceInfo$8): Promise<any>;
}

type groupInfo$4 = {
    name: string;
    mainDeviceId: string;
    familyId?: string;
    roomId?: string;
    sort?: 1 | 2;
    deviceidList: string[];
};
interface AddGroup extends BaseWebAPI {
}
declare class AddGroup {
    /**
     * Creates a new Device Group.
     *
     * @param options - The device information.
     * @param options.name - The device group name.
     * @param options.mainDeviceId - The device group main device id.
     * @param options.familyId - option, The device group familyId.
     * @param options.roomId - option, The device group roomId.
     * @param options.sort - The device group sort. 1: positive sequence, 2: reverse sequence
     * @param options.deviceidList - The device group deviceidList.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    addGroup(options: groupInfo$4): Promise<any>;
}

type deviceInfo$7 = {
    name: string;
    id: string;
    familyId?: string;
    roomId?: string;
    sort?: 1 | 2;
};
interface AddGSMDevice extends BaseWebAPI {
}
declare class AddGSMDevice {
    /**
     * Add a new 4G、GPRS Device.
     *
     * @param options - The device information.
     * @param options.name - The device name.
     * @param options.id - The GSM ID.
     * @param options.familyId - option, The device familyId.
     * @param options.roomId - option, The device roomId.
     * @param options.sort - The device sort. 1: positive sequence, 2: reverse sequence
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    addGSMDevice(options: deviceInfo$7): Promise<any>;
}

type groupInfo$3 = {
    id: string;
    coverDeviceidList: string[];
};
interface CoverGroupDeviceList extends BaseWebAPI {
}
declare class CoverGroupDeviceList {
    /**
     * Adding or deleting devices in a group
     *
     * @param options - The group information.
     * @param options.id - The device group id.
     * @param options.coverDeviceidList - The device group cover deviceidList.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    coverGroupDeviceList(options: groupInfo$3): Promise<any>;
}

type deviceInfo$6 = {
    id: string;
};
interface DelDevice extends BaseWebAPI {
}
declare class DelDevice {
    /**
     * Delete a Device.
     *
     * @param options - The device information.
     * @param options.id - The device id.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    delDevice(options: deviceInfo$6): Promise<any>;
}

type deviceInfo$5 = {
    newName?: string;
    deviceId: string;
    newRoomId?: string;
};
interface SetDeviceInfo extends BaseWebAPI {
}
declare class SetDeviceInfo {
    /**
     * Update the basic information of the device
     *
     * @param options - The device information.
     * @param options.newName - option, The new name of the device.
     * @param options.deviceId - The device id.
     * @param options.newRoomId - option, The new room id of the device.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setDeviceInfo(options: deviceInfo$5): Promise<any>;
}

type groupInfo$2 = {
    id: string;
};
interface DelGroup extends BaseWebAPI {
}
declare class DelGroup {
    /**
     * Delete a Group.
     *
     * @param options - The group information.
     * @param options.id - The group id.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    delGroup(options: groupInfo$2): Promise<any>;
}

type thingInfo$5 = {
    deviceId: string;
};
interface DelOperationHistory extends BaseWebAPI {
}
declare class DelOperationHistory {
    /**
     * Delete device's operation history
     *
     * @param options - The things information.
     * @param options.deviceId - The device id.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    delOperationHistory(options: thingInfo$5): Promise<any>;
}

type deviceInfo$4 = {
    deviceId: string;
    apiKey: string;
};
interface DelShare extends BaseWebAPI {
}
declare class DelShare {
    /**
     * Cancel sharing device
     *
     * @param options - The device information.
     * @param options.deviceId - The device id.
     * @param options.apiKey - The user's apiKey.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    delShare(options: deviceInfo$4): Promise<any>;
}

type baseInfo$2 = {
    lang?: "cn" | "en";
};
interface GetGroups extends BaseWebAPI {
}
declare class GetGroups {
    /**
     * Get Group List
     *
     * @param options - The group information.
     * @param options.lang -  option, The language. 'en' or 'cn'.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getGroups(options: baseInfo$2): Promise<any>;
}

type thingInfo$4 = {
    deviceId: string;
    from?: string;
    num?: number | 30;
};
interface GetOperationHistory extends BaseWebAPI {
}
declare class GetOperationHistory {
    /**
     * Get Device operation history
     *
     * @param options - The things information.
     * @param options.deviceId - The device id.
     * @param options.from - The start time of the query, in the format of timestamp, such as 1614211200000.
     * @param options.num - The number of records to query, the default is 30, and the maximum is 30.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getOperationHistory(options: thingInfo$4): Promise<any>;
}

type deviceInfo$3 = {
    deviceInfoList: Array<{
        deviceId: string;
        model: string;
        version: string;
    }>;
};
interface GetOTAInfo extends BaseWebAPI {
}
declare class GetOTAInfo {
    /**
     * Get Devices OTA info
     *
     * @param options - The device information.
     * @param options.deviceInfoList - The device information list.
     * @param options.deviceInfoList[].deviceId - The device id.
     * @param options.deviceInfoList[].model - The device model.
     * @param options.deviceInfoList[].version - The device current version.
     *
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getOTAInfo(options: deviceInfo$3): Promise<any>;
}

type thingInfo$3 = {
    thingList: {
        itemType: Number | 1 | 2 | 3;
        id: string;
    };
};
interface GetThings extends BaseWebAPI {
}
declare class GetThings {
    /**
     * Obtain specified device or group information
     *
     * @param options - The things information.
     * @param options.thingList - The things information.
     * @param options.thingList.itemType - The things itemType. 1: user's own device, 2: devices shared by others, 3: own group.
     * @param options.thingList.id - The things id.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getThings(options: thingInfo$3): Promise<any>;
}

type thingInfo$2 = {
    type?: number | string | 1 | 2 | "device" | "group";
    id: string;
    params?: string;
};
interface GetThingStatus extends BaseWebAPI {
}
declare class GetThingStatus {
    /**
     * Get Device Status
     *
     * @param options - The things information.
     * @param options.type - The things type. 1: devices status, 2: groups status.
     * @param options.id - The things id.
     * @param options.params - option, The things params.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getThingStatus(options: thingInfo$2): Promise<any>;
}

type thingInfo$1 = {
    thingList: Array<{
        type: number | 1 | 2;
        id: string;
        params: object;
    }>;
    timeout?: number;
};
interface SetAllThingStatus extends BaseWebAPI {
}
declare class SetAllThingStatus {
    /**
     * Set the status of the device or group
     *
     * @param options - The things information.
     * @param options.thingList - The things information.
     * @param options.thingList.type - The things type. 1: user's own device, 2: devices shared by others.
     * @param options.thingList.id - The things id.
     * @param options.thingList.params - The things params.
     * @param options.timeout - The timeout. 0-8000ms.default 0ms.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setAllThingStatus(options: thingInfo$1): Promise<any>;
}

type deviceInfo$2 = {
    type?: string | "replace" | "merge";
    deviceId: string;
    tags: object;
};
interface SetDeviceTags extends BaseWebAPI {
}
declare class SetDeviceTags {
    /**
     * Set the tags of the device
     *
     * @param options - The device information.
     * @param options.type - The type of the operation. 'replace' or 'merge'.
     * @param options.deviceId - The device id.
     * @param options.tags - The tags of the device.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setDeviceTags(options: deviceInfo$2): Promise<any>;
}

type groupInfo$1 = {
    newName: string;
    id: string;
};
interface SetGroup extends BaseWebAPI {
}
declare class SetGroup {
    /**
     * Update the name of the group
     *
     * @param options - The group information.
     * @param options.newName - The new name of the group.
     * @param options.id - The group id.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setGroup(options: groupInfo$1): Promise<any>;
}

type groupInfo = {
    id: string;
    params: object;
};
interface SetGroupStatus extends BaseWebAPI {
}
declare class SetGroupStatus {
    /**
     * Update the status of the group
     *
     * @param options - The group information.
     * @param options.id - The group id.
     * @param options.params - The group params.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setGroupStatus(options: groupInfo): Promise<any>;
}

type deviceInfo$1 = {
    deviceId: string;
    apiKey: string;
    permit: number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 15;
};
interface SetShare extends BaseWebAPI {
}
declare class SetShare {
    /**
     * Modify sharing permissions
     *
     * @param options - The device information.
     * @param options.deviceId - The device id.
     * @param options.apiKey - The user's apiKey.
     * @param options.permit - The sharing permissions.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setShare(options: deviceInfo$1): Promise<any>;
}

type thingInfo = {
    type?: number | string | 1 | 2 | "device" | "group";
    id: string;
    params: object;
};
interface SetThingStatus extends BaseWebAPI {
}
declare class SetThingStatus {
    /**
     * Update the status of individual devices or groups
     *
     * @param options - The things information.
     * @param options.type - The things type. 1: devices status, 2: groups status.
     * @param options.id - The things id.
     * @param options.params - The things params.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    setThingStatus(options: thingInfo): Promise<any>;
}

type deviceInfo = {
    user: {
        countryCode: string;
        phoneNumber?: string;
        email?: string;
    };
    deviceidList: string[];
    permit: number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 15;
    comment?: string | "";
    shareType?: number | 1;
};
interface Share extends BaseWebAPI {
}
declare class Share {
    /**
     * Sharing devices
     *
     * @param options - The device information.
     * @param options.user - The user information.
     * @param options.user.countryCode - The user's countryCode.
     * @param options.user.phoneNumber - option, The user's phoneNumber.
     * @param options.user.email - option, The user's email.
     * @param options.deviceidList - The device id list.
     * @param options.permit - The sharing permissions.
     * @param options.comment - option, The sharing comment.
     * @param options.shareType - option, The sharing type.
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    share(options: deviceInfo): Promise<any>;
}

declare class Device {
    protected readonly root: WebAPI;
    constructor(root: WebAPI);
}
interface Device extends GetAllThings, AddDevice, AddGroup, AddGSMDevice, CoverGroupDeviceList, DelDevice, DelGroup, DelOperationHistory, DelShare, GetGroups, GetOperationHistory, GetOTAInfo, GetThings, GetThingStatus, SetAllThingStatus, SetDeviceTags, SetDeviceInfo, SetGroup, SetGroupStatus, SetShare, SetThingStatus, Share {
}

type homePageInfo = {
    familyId?: string;
    from?: string;
    num?: number | 30;
};
interface GetMessage extends BaseWebAPI {
}
declare class GetMessage {
    /**
     * Get the List of Messages
     * @description Get share notifications, device notification, and other messages.
     *
     * @param options - The HomePage information.
     * @param options.familyId - option, The familyId.
     * @param options.from - option, The 'from'. timestamp in milliseconds, default now
     * @param options.num - option, The num. default 30
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getMessage(options: homePageInfo): Promise<any>;
}

declare class Message {
    protected readonly root: WebAPI;
    constructor(root: WebAPI);
}
interface Message extends GetMessage {
}

interface Dispatch extends BaseWebAPI {
}
declare class Dispatch {
    /**
     * Obtain the info for establishing a WebSocket connection
     * @description Obtain the info for establishing a WebSocket connection
     *
     * @param region - The region of the user's account
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    dispatch(region: string | "cn" | "as" | "us" | "eu" | "wx"): Promise<any>;
}

declare class Other {
    protected readonly root: WebAPI;
    constructor(root: WebAPI);
}
interface Other extends Dispatch {
}

type loginPageInfo = {
    redirectUrl: string;
    grantType?: string | "authorization_code";
    state: string;
};
interface CreateLoginUrl extends BaseWebAPI {
}
declare class CreateLoginUrl {
    /**
     * Create a URL for OAuth login
     * @description Create a URL for OAuth login
     *
     * @param options - loginPageInfo
     * @param options.redirectUrl - The redirect URL after login
     * @param options.grantType - option, The grant type, default: `authorization_code`
     * @param options.state - The state
     * @returns loginUrl - which is a URL for OAuth login
     *
     * @beta
     */
    createLoginUrl(options: loginPageInfo): string;
}

type baseInfo$1 = {
    region: string;
    redirectUrl: string;
    code: string;
    grantType?: string | "authorization_code";
};
interface GetToken extends BaseWebAPI {
}
declare class GetToken {
    /**
     * Obtain token using authorization code
     * @description Obtain token using authorization code
     *
     * @param options - baseInfo
     * @param options.region - The region
     * @param options.redirectUrl - The redirect URL after login
     * @param options.code - The authorization code
     * @param options.grantType - option, The grant type, default: `authorization_code`
     * @returns response - Please refer to the online API documentation
     *
     * @beta
     */
    getToken(options: baseInfo$1): Promise<any>;
}

declare class OAuth {
    protected readonly root: WebAPI;
    constructor(root: WebAPI);
}
interface OAuth extends CreateLoginUrl, GetToken {
}

declare class BaseWebAPI {
    protected readonly root: WebAPI;
    constructor(root: WebAPI);
}
declare class WebAPI extends eWeLinkBase {
    user: User;
    home: Home;
    device: Device;
    message: Message;
    oauth: OAuth;
    other: Other;
}
interface WebAPI {
}

type baseInfo = {
    region?: string | "cn" | "as" | "us" | "eu" | "test";
    fullUrl?: string;
};
type connectInfo = {
    region?: string | "cn" | "as" | "us" | "eu" | "test";
    fullUrl?: string;
    at: string;
    userApiKey: string;
    appId: string | "";
    userAgent?: string | "app";
};
declare class Connect {
    protected readonly root: Ws;
    constructor(root: Ws);
    /**
     * Get the assigned long connection address
     *
     * @param options - The connection information.
     * @param options.region - The region.
     * @param options.fullUrl - The fullUrl.
     * @returns { Promise<string> } WSS address
     *
     * @beta
     */
    getDispatch: (options: baseInfo) => Promise<string>;
    private createHbTimer;
    /**
     * Create a websocket connection
     * @param { baseInfo } options
     * @param onOpen - The onOpen event.
     * @param onClose - The onClose event.
     * @param onError - The onError event.
     * @param onMessage - The onMessage event.
     * @returns { Promise<WebSocket> } WebSocket instance
     *
     * @beta
     */
    create: (options: connectInfo, onOpen?: ((_ws: WebSocket) => void) | undefined, onClose?: () => void, onError?: ((error: ErrorEvent) => void) | undefined, onMessage?: ((_ws: WebSocket, message: MessageEvent) => void) | undefined) => Promise<WebSocket>;
    getUserOnline: (options: connectInfo) => Promise<string>;
    /**
     * Generate messages to update device status
     *
     * @param deviceId - The device id.
     * @param params - The device status.
     * @param action - The action.
     * @param userAgent - The userAgent.
     * @param userApiKey  - The userApiKey.
     *
     * @returns { string } message
     *
     * @beta
     */
    getUpdateState: (deviceId: string, params: object, action?: string | "update" | "upgrade" | "date", userAgent?: string | "app", userApiKey?: string) => string;
    /**
     * Update device status
     *
     * @param deviceId - The device id.
     * @param params - The device status.
     * @param action - The action.
     * @param userAgent - The userAgent.
     * @param userApiKey - The userApiKey.
     * @returns { null | undefined } null | undefined
     *
     * @beta
     */
    updateState: (deviceId: string, params: object, action?: string | "update" | "upgrade" | "date", userAgent?: string | "app", userApiKey?: string) => null | undefined;
}
interface Connect {
}

declare class Ws extends eWeLinkBase {
    Connect: Connect;
}
interface Ws {
}

type serverOptions = {
    method: string | "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    ip: string;
    port: string;
    path: string;
    deviceId: string;
    data: any;
    encrypt: boolean;
    secretKey?: string;
    iv?: string;
    selfApikey?: string;
};
type LanOptions = {
    selfApikey: string;
    logObj?: any;
    request?: string;
};
declare class Lan {
    logObj?: any;
    selfApikey: string;
    request: AxiosInstance | any;
    constructor(options?: LanOptions);
    /**
     * Discover eWeLink devices in LAN
     *
     * @param onDiscover - callback function
     * @param type - default: ewelink
     * @returns bonjourClient - Bonjour Object
     *
     * @beta
     */
    discovery(onDiscover: (server: Service) => void, type?: string): Bonjour;
    /**
     * data encrypt
     *
     * @param data -  data
     * @param secretKey - secretKey
     * @param iv - iv
     * @returns encrypted data - encrypted data
     *
     * @beta
     */
    encrypt(data: any, secretKey: string, iv: string): string;
    /**
     * data decrypt
     * @param data -  encrypted data
     * @param secretKey - secretKey
     * @param iv - iv
     * @returns decrypted data - decrypted data
     *
     * @beta
     */
    decrypt(data: string, secretKey: string, iv: string): object;
    /**
     * Obtain the device's IP and port from the service
     *
     * @param server
     * @return ip - ip
     * @return port - port
     *
     * @beta
     */
    getDeviceIpPort(server: Service): {
        ip?: string;
        port?: number;
    };
    /**
     * General Request
     * @param serverOptions - serverOptions
     * @param serverOptions.method - Request method
     * @param serverOptions.ip - Device IP
     * @param serverOptions.port - Device port
     * @param serverOptions.path - Request path
     * @param serverOptions.deviceId - Device ID
     * @param serverOptions.data - Request data
     * @param serverOptions.encrypt - Whether to encrypt the request data
     * @param serverOptions.secretKey - Encryption password
     * @param serverOptions.iv - iv
     * @param serverOptions.selfApikey - selfApikey
     *
     * @returns response - Data returned by the device
     *
     * @beta
     */
    generalRequest(serverOptions: serverOptions): Promise<any>;
    zeroconf: {
        /**
         * Switch single channel device
         */
        switch: (controlOptions: {
            ip: string;
            port: string;
            deviceId: string;
            data: {
                switch: "on" | "off";
            };
            encrypt: boolean;
            secretKey?: string;
            iv?: string;
            selfApikey?: string;
        }) => Promise<any>;
        /**
         * Switch multiple channels
         */
        switches: (controlOptions: {
            ip: string;
            port: string;
            deviceId: string;
            data: {
                switches: [
                    {
                        switch: "on" | "off";
                        outlet: 0;
                    },
                    {
                        switch: "on" | "off";
                        outlet: 1;
                    },
                    {
                        switch: "on" | "off";
                        outlet: 2;
                    },
                    {
                        switch: "on" | "off";
                        outlet: 3;
                    }
                ];
            };
            encrypt: boolean;
            secretKey?: string;
            iv?: string;
            selfApikey?: string;
        }) => Promise<any>;
        /**
         * Adjust the color, brightness, color temperature of the light
         */
        dimmable: (controlOptions: {
            ip: string;
            port: string;
            deviceId: string;
            data: {
                ltype: "white" | "color" | "party" | string;
                white?: {
                    br: number;
                    ct: number;
                };
                party?: {
                    br: number;
                    r: number;
                    g: number;
                    b: number;
                    tf: number;
                    sp: number;
                };
                color?: {
                    br: number;
                    r: number;
                    g: number;
                    b: number;
                };
            };
            encrypt: boolean;
            secretKey?: string;
            iv?: string;
            selfApikey?: string;
        }) => Promise<any>;
        /**
         * Switch network indicator light
         */
        sledOnline: (controlOptions: {
            ip: string;
            port: string;
            deviceId: string;
            data: {
                sledOnline: boolean;
            };
            encrypt: boolean;
            secretKey?: string;
            iv?: string;
            selfApikey?: string;
        }) => Promise<any>;
        /**
         * Set device power on status
         */
        startups: (controlOptions: {
            ip: string;
            port: string;
            deviceId: string;
            data: {
                configure: [
                    {
                        startup: "on" | "off" | "stay";
                        outlet: 0;
                    },
                    {
                        startup: "on" | "off" | "stay";
                        outlet: 1;
                    },
                    {
                        startup: "on" | "off" | "stay";
                        outlet: 2;
                    },
                    {
                        startup: "on" | "off" | "stay";
                        outlet: 3;
                    }
                ];
            };
            encrypt: boolean;
            secretKey?: string;
            iv?: string;
            selfApikey?: string;
        }) => Promise<any>;
        /**
         * Set device auto close after open
         */
        pulses: (controlOptions: {
            ip: string;
            port: string;
            deviceId: string;
            data: {
                pulses: [
                    {
                        pulse: "on" | "off";
                        width: number;
                        outlet: 0;
                    },
                    {
                        pulse: "on" | "off";
                        width: number;
                        outlet: 1;
                    },
                    {
                        pulse: "on" | "off";
                        width: number;
                        outlet: 2;
                    },
                    {
                        pulse: "on" | "off";
                        width: number;
                        outlet: 3;
                    }
                ];
            };
            encrypt: boolean;
            secretKey?: string;
            iv?: string;
            selfApikey?: string;
        }) => Promise<any>;
        /**
         * Whether to encrypt the transmission
         */
        encrypt: (controlOptions: {
            ip: string;
            port: string;
            deviceId: string;
            data: {
                encrypt: boolean;
            };
            encrypt: boolean;
            secretKey?: string;
            iv?: string;
            selfApikey?: string;
        }) => Promise<any>;
        /**
         * Set encryption password
         */
        password: (controlOptions: {
            ip: string;
            port: string;
            deviceId: string;
            data: {
                newPassword: string;
                oldPassword: string;
            };
            encrypt: boolean;
            secretKey?: string;
            iv?: string;
            selfApikey?: string;
        }) => Promise<any>;
    };
}

declare const _default: {
    WebAPI: typeof WebAPI;
    Ws: typeof Ws;
    Lan: typeof Lan;
    createLogger: (name: string, logLevel?: string | undefined, filename?: string | undefined) => log4js.Logger;
    creatRequest: (config?: axios.AxiosRequestConfig<any> | undefined, logObj?: any) => axios.AxiosInstance;
};

export { _default as default };
