# Message Center

## message.getMessage({familyId, from, num})

Function: Get message list

Note: The list is sorted by time. If the client wants to obtain more data, it can call this interface again by adding the timestamp of the last item to the 'from' field.

Parameter type: Object

Params:

| Name    | Type | Allows empty | Description |
| :---------- | :------- | :--------------- | :-------------- |
| familyid | String   | Y                | Home ID. If left blank, it will default to the current home.                                                            |
| from     | Number     | Y                | Timestamp, accurate to milliseconds. The time from which to get notification messages. The default is the current time. |
| num      | Number      | Y                | The maximum number of messages to obtained. 1<= num <= 30. If not offered, the default is 30.                           |

Response data parameters:

| Name    | Type | Allows empty | Description |
| :---------- | :------- | :--------------- | :-------------- |
| messageList | Array    | N                | Message list    |

MessageList items:

| Name | Type | Allows empty | Description                                                                                                                                                                                                                                                              |
| :------- | :------- | :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| msgid    | String   | N                | Message ID                                                                                                                                                                                                                                                                   |
| msgType  | String   | N                | Message type. "shareNotify_v2": Share notification, "cancelShareNotify_v2": Cancel sharing notification, "opsNotify_v2": Device action notification, "pushNotify_v2": regular device push, "alarmNotify_v2": sensor/alarm alert push, "IOTCameraNotify_v2": IOT camera push. |
| message  | Object   | N                | Message content. The definition of this field differs from msgType.                                                                                                                                                                                                          |
| date     | Number     | N                | The timestamp of the message, accurate to milliseconds.                                                                                                                                                                                                                      |