# Specifications

## Example

For example, login interface:

```typescript
const response = await client.user.login({ account: "xxx@xxx.com", password: "12345678", areaCode: "+1" });
```

Under normal circumstances, the returned content is:

| Name         | Type   | Description                                                                                                                                                                                                                                       |
|:-------------|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| status       | String | HTTP status code                                                                                                                                                                                                                                  |
| responseTime | Number | Response time in milliseconds                                                                                                                                                                                                                     |
| error        | String | Error code, 0 successful, other failures, please refer to: https://coolkit-technologies.github.io/eWeLink-API/#/en/APICenterV2?id=error-codes                                                                                                     |
| msg          | String | Return the specific reason for the error                                                                                                                                                                                                          |
| data         | Object | The parameters obtained from the request are as follows: https://coolkit-technologies.github.io/eWeLink-API/#/en/OAuth2.0 、 https://coolkit-technologies.github.io/eWeLink-API/#/en/APICenterV2, Other method documents also provide explanations |

All characters are in a specified format, and the content in the data is returned differently depending on the interface. You can refer to other documents or confirm through the online documentation on the [CoolKit Open Platform](https://coolkit-technologies.github.io/eWeLink-API/).

## Other documents

- [Basic specifications](Specification.md)
- [Built-in method](Built-inMethod.md)
- [User management](UserManagement.md)
- [Device management](DeviceManagement.md)
- [Home management](HomeManagement.md)
- [Message center](MessageCenter.md)
- [OAuth2.0](OAuth2.0.md)
- [WebSocket control](WebSocketControl.md)
- [LAN control](LAN-Control.md)
- [Other](Other.md)