# WebSocketControl
 
## getDispatch({region,fullUrl})

Function：Get the assigned long connection address

Params:

| Name        | Type | Allows Empty | Description            |
| :--------- | :------------------------ | :------- | :-------------------------- |
| region     | String                    | Y        | The service region          |
| fullUrl    | String                    | Y        | The full url |

## createHbTimer({hb = 0, hbInterval = 145})

Function：Creat a websocket heartbeat timer

## create({connectInfo,onOpen,onClose,onError,onMessage})

Function:： Create a websocket connection

Params:

| Name        | Type | Allows Empty | Description            |
| :--------- | :------------------------ | :------- | :-------------------------- |
| connectInfo     | Object                                             | N        | The connect information   |
| onOpen          | (_ws: WebSocket) => void                           | Y        | The onOpen event  |
| onClose         | () => void                                         | Y        | The onClose event |
| onError         | (error: ErrorEvent) => void                        | Y        | The onError event |
| onMessage       | (_ws: WebSocket, message: MessageEvent) => void: Promise<WebSocket>     | Y        | The onMessage event |

connectInfo item description ：

| Name        | Type | Allows Empty | Description            |
| :--------- | :------------------------ | :------- | :-------------------------- |
| region     | String                    | Y        | The service region          |
| fullUrl    | String                    | Y        | The full url |
| at         | String                    | N        | The at         |
| userApiKey | String                    | N        | The user api key |
| appId      | String                    | N        | The app id          |
| userAgent  | String                    | Y        | The user agent |

## getUserOnline({connectInfo})

Function:： Get userOnline message for your own business

Params:

| Name        | Type | Allows Empty | Description            |
| :--------- | :------------------------ | :------- | :-------------------------- |
| connectInfo     | Object                | N        | The connect information   |

Return：

| Name        | Type | Allows Empty | Description            |
| :--------- | :------------------------ | :------- | :-------------------------- |
| action     | String                    | N        | The action        |
| at         | String                    | N        | The at |
| apikey     | String                    | N        | The apikey         |
| appid      | String                    | N        | The appid |
| nonce      | String                    | N        | The nonce         |
| userAgent  | String                    | N        | The user agent |
| sequence   | String                    | N        | The sequence |

## getUpdateState({deviceId,params,action,userAgent,userApiKey})

Function:：Generate messages to update device status

Params:

| Name        | Type | Allows Empty | Description            |
| :--------- | :------------------------ | :------- | :-------------------------- |
| deviceId     | String                  | N        | The device id   |
| params       | Object                  | N        | The device status  |
| action       | String                  | Y        | The action|
| userAgent    | String                  | Y        | The user agent |
| userApiKey   | String                  | Y        | The user api key |

## updateState({deviceId,params,action,userAgent,userApiKey})

Function:：Update device status

Params:

| Name        | Type | Allows Empty | Description            |
| :--------- | :------------------------ | :------- | :-------------------------- |
| deviceId     | String                  | N        | The device id  |
| params       | Object                  | N        | The device status  |
| action       | String                  | Y        | The action|
| userAgent    | String                  | Y        | The user agent |
| userApiKey   | String                  | Y        | The user apiKey |

Return：null | undefined
