# Other

## other.dispatch(region)

Function: Obtain the long connection server address used by the APP

Params:

| Name | Type | Allows empty | Description                                                                                                         |
| :----- | :----- | :------- | :--------------------------------- |
| region | String | N        | Server area, such as:cn、us、eu、as、ir |

Response:

| Name | Type   | Allows empty | Description                                                                                                         |
| :----- |:-------| :------- | :------- |
| IP     | String | N            | The IP address of the server for persistent connection                                                                                                                                                                                                                                                                           |
| port   | Number | N            | The port of the server for persistent connection                                                                                                                                                                                                                                                                                 |
| domain | String | N            | The domain name of the persistent connection server.Currently only the app will return the domain name.The android client should choose to establish a long connection by IP, which can avoid the problems caused by DNS resolution. The js version of the client cannot skip the certificate check, so only the IP can be used. |
| error  | Number | N            | "error:0": success                                                                                                                                                                                                                                                                                                               |
| reason | String | N            | "OK": success                                                                                                                                                                                                                                                                                                                    |
