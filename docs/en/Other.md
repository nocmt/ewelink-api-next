# Other

## other.dispatch(region)

Function: Obtain the long connection server address used by the APP

Params:

| Name | Type | Allows empty | Description                                                                                                         |
| :----- | :----- | :------- | :--------------------------------- |
| region | String | N        | Server area, such as:cn、us、eu、as、ir |

Response:

| Name | Type | Allows empty | Description                                                                                                         |
| :----- | :----- | :------- | :------- |
| IP     | string | N            | The IP address of the server for persistent connection                                                                                                                                                                                                                                                                           |
| port   | number | N            | The port of the server for persistent connection                                                                                                                                                                                                                                                                                 |
| domain | string | N            | The domain name of the persistent connection server.Currently only the app will return the domain name.The android client should choose to establish a long connection by IP, which can avoid the problems caused by DNS resolution. The js version of the client cannot skip the certificate check, so only the IP can be used. |
| error  | number | N            | "error:0": success                                                                                                                                                                                                                                                                                                               |
| reason | string | N            | "OK": success                                                                                                                                                                                                                                                                                                                    |
