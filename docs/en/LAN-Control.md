# LAN Control
 
## discovery((server)=>{console.info(server)}, type='ewelink')

Params:

| Name       | Type                      | Allows empty | Description                    |
|:-----------|:--------------------------|:-------------|:-------------------------------|
| onDiscover | (server: Service) => void | Y            | callback function              |
| type       | String                    | Y            | service type, Default: ewelink |

If a device that meets the criteria is found, a Service object is returned, which contains the following attributes:

| Name     | Type   | Allows empty | Description                                    |
|:---------|:-------|:-------------|:-----------------------------------------------|
| name     | String | N            | device name                                    |
| host     | String | N            | Device IP address                              |
| port     | Number | N            | Device Port                                    |
| type     | String | N            | Device type                                    |
| subtypes | Array  | Y            | Device subtypes, such as:[ 'switch', 'light' ] |
| protocol | String | Y            | Transmission protocol, udp or tcp,Default: tcp |
| txt      | Object | Y            | TXT record                                     |

TXT record:

| Name    | Type   | Allows empty | Description                                                                                                                                                                                                                                                                                                                                     |
|:--------|:-------|:-------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id      | String | N            | device id                                                                                                                                                                                                                                                                                                                                       |
| txtvers | String | N            | TXT record version number, must be 1                                                                                                                                                                                                                                                                                                            |
| type    | String | N            | device type, such as:switch                                                                                                                                                                                                                                                                                                                     |
| apivers | String | N            | Device API interface version, such as:1                                                                                                                                                                                                                                                                                                         |
| encrypt | String | N            | Is it encrypted, such as:true                                                                                                                                                                                                                                                                                                                   |
| data1   | String | N            | Device status information, such as {"switch": "on"}, encrypted by default                                                                                                                                                                                                                                                                       |
| seq     | String | N            | TXT record sequence number, a positive integer incrementing from 1, used to indicate the order of TXT record updates                                                                                                                                                                                                                            |
| iv      | String | N            | The initialization vector for encryption must be "AES-128-CBC/PKCS7Padding" (AES-128 Cipher Block Chaining (CBC) with PKCS7 Padding). When the length of device information (unencrypted or encrypted string) exceeds 249 bytes, the first 249 bytes must be stored in data1, and the remaining bytes must be stored in data2, data3, and data4 |

## encrypt(data, secretKey, iv)

Function: Encryption

Params:

| Name      | Type   | Allows empty | Description             |
|:----------|:-------|:-------------|:------------------------|
| data      | String | N            | Content to be encrypted |
| secretKey | String | N            | secret key              |
| iv        | String | N            | iv                      |

Return：

| Name | Type | Allows empty | Description|
| :--- | :----- | :------- | :------- |
| data | String | N        | Encrypted Content |

## decrypt(data, secretKey, iv)

Function: Decryption

Params:

| Name | Type | Allows empty | Description|
| :-------- | :----- | :------- | :--------- |
| data      | String | N        | Content to be decrypted |
| secretKey | String | N        | secret key       |
| iv        | String | N        | iv       |

Return：

| Name | Type | Allows empty | Description|
| :--- | :----- | :------- | :--------- |
| data | Object | N        | Decrypted content |

## getDeviceIpPort(server)

Function: Obtain the IP and port of the device

Params:

| Name | Type | Allows empty | Description|
| :----- | :------ | :------- | :-------- |
| server | Service | N        | mDNS server |

Return：

Parameter type: Object

| Name | Type | Allows empty | Description|
| :--- | :----- | :------- | :------- |
| ip   | String | N        | Device IP  |
| port | Number | N        | Device Port |

## generalRequest(serverOptions)

Function: Send LAN control requests

Params:

| Name | Type | Allows empty | Description|
| :----------------------- | :------ | :------- | :-------------------- |
| serverOptions            | Object  | N        | service content               |
| serverOptions.method     | String  | N        | Request Method              |
| serverOptions.ip         | String  | N        | Device IP               |
| serverOptions.port       | Number  | N        | Device Port              |
| serverOptions.path       | String  | N        | Request Path              |
| serverOptions.deviceId   | String  | N        | Device ID               |
| serverOptions.data       | Object  | N        | Control instructions              |
| serverOptions.encrypt    | Boolean | N        | Encrypt request data      |
| serverOptions.secretKey  | String  | Y        | Encrypt password              |
| serverOptions.iv         | String  | Y        | iv                    |
| serverOptions.selfApikey | String  | Y        | Current user's Apikey |

Return：

Parameter type: Object

| Name | Type | Allows empty | Description|
| :------- | :------ | :------- | :----------------------- |
| sequence | String  | N        | time stamp                   |
| error    | Number  | N        | Error code                   |
| encrypt  | Boolean | N        | Is it encrypted                 |
| seq      | Number  | N        | Request serial number,+1 for each control |

## zeroconf.switch({...controlOptions, data: {switch: 'on'}})

Function: Single channel device switch

Params:

| Name | Type | Allows empty | Description|
| :------------------------ | :------ | :------- | :----------------------- | ------- |
| controlOptions            | Object  | N        | Control Options                 |
| controlOptions.ip         | String  | N        | Target IP                  |
| controlOptions.port       | Number  | N        | Target Port                 |
| controlOptions.deviceId   | String  | N        | Device ID                  |
| controlOptions.data       | Object  | N        | Control instructions, { switch: "on" | "off" } |
| controlOptions.encrypt    | Boolean | N        | Encrypt request data         |
| controlOptions.secretKey  | String  | Y        | Encrypt password                 |
| controlOptions.iv         | String  | Y        | iv                       |
| controlOptions.selfApikey | String  | Y        | Current user's Apikey    |

Return：

Parameter type: Object

| Name | Type | Allows empty | Description|
| :------- | :------ | :------- | :----------------------- |
| sequence | String  | N        | time stamp                   |
| error    | Number  | N        | Error code                   |
| encrypt  | Boolean | N        | Is it encrypted                 |
| seq      | Number  | N        | Request serial number,+1 for each control |

## zeroconf.switches({...controlOptions, data: {switches: [ {switch: 'on', outlet: 0}, {switch: 'on', outlet: 1}, {switch: 'on', outlet: 2}, {switch: 'on', outlet: 3}]}})

Function: multi-channel device switch

Params:

Data parameter description:

| Name | Type | Allows empty | Description|
| :------------------- | :----- | :------- | :------------------ |
| switches             | Array  | N        | 4 个通道的开关状态  |
| switches[num].switch | String | N        | 开关状态，on 或 off |
| switches[num]outlet  | Number | N        | 通道号，从 0 开始   |

Other consistent with zeroconf.switch

## zeroconf.sledOnline({...controlOptions, data: {sledOnline: true}})

Function: Network indicator light switch

Params:

Data parameter description:

| Name | Type | Allows empty | Description|
| :--------- | :------ | :------- | :------------- |
| sledOnline | Boolean | N        | Network indicator switch |

Other consistent with zeroconf.switch

## zeroconf.startups({...controlOptions, data: {configure: [{startup: 'on', outlet: 0}, {startup: 'on', outlet: 1}, {startup: 'on', outlet: 2}, {startup: 'on', outlet: 3}], startup: {0: {startup: 'on'}, 1: {startup: 'on'}, 2: {startup: 'on'}, 3: {startup: 'on'}}})

Function: Four channel device power on status setting

Params:

Data parameter description:

| Name | Type | Allows empty | Description|
| :------------------- | :----- | :------- | :------------------------- |
| configure            | Array  | N        | Status of 4 channels             |
| startup              | Object | N        | Status of channels                   |
| startup[num].startup | String | N        | Power on status, on, off or stay |
| startup[num]outlet   | Number | N        | Channel number, starting from 0          |

Other consistent with zeroconf.switch

## zeroconf.pulses({...controlOptions,data: {pulses: [{width: 500, outlet: 0, pulse: 'off'}, {width: 500, outlet: 1, pulse: 'off'}, {width: 500, outlet: 2, pulse: 'off'}, {width: 500, outlet: 3, pulse: 'off'}]}})

Function: Four channel device pulse setting

Params:

Data parameter description:

| Name | Type | Allows empty | Description|
| :---------------- | :----- | :------- | :------------------------------- |
| pulses            | Array  | N        | Status of 4 channels                   |
| pulses[num].width | Number | N        | Pulse time, in milliseconds, in steps of 500ms |
| pulses[num]outlet | Number | N        | Channel number, starting from 0                |
| pulses[num]pulse  | Number | N        | Status, on, off         |

Other consistent with zeroconf.switch

## zeroconf.encrypt(...controlOptions,data: { encrypt: true }}})

Function: Encryption settings (affecting APP control)

Params:

Data parameter description:

| Name | Type | Allows empty | Description|
| :------ | :------ | :------- | :------- |
| encrypt | Boolean | N        | Is it encrypted |

Other consistent with zeroconf.switch

## zeroconf.password({...controlOptions,data: {oldPassword, newPassword}}})

Function: Modify encrypted password (affecting APP control)

Params:

Data parameter description:

| Name | Type | Allows empty | Description|
| :---------- | :----- | :------- | :------- |
| newPassword | String | N        | new Password |
| oldPassword | String | N        | old Password   |

Other consistent with zeroconf.switch
