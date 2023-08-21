# Built-inMethod

| Name | Type | Allows empty | Description                                                                                                         |
| :--------- | :----- | :------- | :----------------------------------------- |
| appId      | String | Y        | APPID                                      |
| appSecret  | String | Y        | APP SECRET                                 |
| region     | String | Y        | Server area, such as: cn、us、eu、as、ir         |
| endpoint   | String | Y        | API domain name, https://eu-apia.coolkit.cc |
| at         | String | Y        | Access Token                               |
| rt         | String | Y        | Refresh Token                              |
| account    | String | Y        | Default account                                   |
| userApiKey | String | Y        | User's API Key                               |
| logObj     | Object | Y        | Instance of log library                               |
| request    | Object | Y        | Request an instance of the library                               |
| storage    | Object | Y        | Instance of repository, initial directory:cache              |

## storage

Function: Storage

Built in method:

| Name | Type | Allows empty | Description                                                                                                         |
| :----------------------------------- | :------- | :------- | :------- |
| storage.set(key: string, value: any) | Function | Y        | save data     |
| storage.get(key: string)             | Function | Y        | get data |
| storage.remove(key: string)          | Function | Y        | delete data |

## setUrl(region)

Function: Set interface domain name

Params:

| Name | Type | Allows empty | Description                                                                                                         |
| :----- | :----- | :------- | :--- |
| region | String | N        | region |

## setAuthConfigs(appId,appSecret)

Function: APPID and APP SECRET

Params:

| Name | Type | Allows empty | Description                                                                                                         |
| :-------- | :----- | :------- | :--------- |
| appId     | String | N        | APPID      |
| appSecret | String | N        | APP SECRET |
