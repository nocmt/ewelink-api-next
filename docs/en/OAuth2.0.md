# OAuth2.0

## oauth.createLoginUrl({redirectUrl, state, grantType})

Function: Generate login link for authorization page

Parameter type: Object

Params:

| Name        | Type   | Allows empty | Description                                                                     |
|:------------|:-------|:-------------|:--------------------------------------------------------------------------------|
| redirectUrl | String | N            | The redirect URL after login                                                    |
| state       | String | N            | The state, Similar to user ID, perform identification judgment when redirecting |
| grantType   | String | Y            | The grant type, default: `authorization_code`                                   |

Return：

| Name | Type   | Allows empty | Description   |
|:-----|:-------|:-------------|:--------------|
| url  | String | N            | The login URL |

## oauth.getToken({region, redirectUrl, code, grantType})

Function: get token according to code

Type: Object

Params:

| Name | Type | Allows empty | Description                                                                                                         |
| :---------- | :----- | :------- | :-------------------------------------------- |
| region      | String | N        | The region                                    |
| redirectUrl | String | N        | The redirect URL after login                  |
| code        | String | N        | The authorization code                        |
| grantType   | String | Y        | The grant type, default: `authorization_code` |

Response data parameters:

| Name | Type | Allows empty | Description                                                                                                         |
| :--------------- | :----- | :------- | :-------------------- |
| accessToken      | String | N        | The access token      |
| refreshToken     | String | N        | The refresh token     |
| region           | String | N        | The region            |
| user             | Object | N        | The user information  |
| user.apikey      | String | N        | The user ID           |
| user.email       | String | Y        | The user email        |
| user.phoneNumber | String | Y        | The user phone number |
| user.countryCode | String | N        | The user country code |
