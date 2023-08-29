# User Management

## user.login({account, password, areaCode, lang})

Function: Log in to an eWeLink account

Parameter type: Object

Params:

| Name | Type | Allows empty | Description                                                                                                         |
| :------- | :----- | :------- | :-------------------- |
| account  | String | N        | Mobile phone number or email      |
| password | String | N        | Password                  |
| areaCode | String | N        | Telephone area code or country/region code  |
| lang     | String | Y        | Push language, cn or en |

Response data parameter:

| Name | Type | Allows empty | Description                                                                                                         |
| :----- | :------ | :------- | :--------------------------------------------------- |
| user   | Object  | N        | User information, see [user.register] method description                |
| at     | String  | N        | Access Token                                     |
| rt     | String  | N        | Refresh Token                                        |
| region | String  | N        | User's region cn=China region as=Asia region us=Americas region eu=Europe region |

When error is 10004, it indicates that the account is not in the current region, and the client needs to call the login interface in another region based on the returned region information. An example of returning data is as follows:

```json
{
  "status": 200,
  "responseTime": 200,
  "error": 10004,
  "msg": "redirection",
  "data": { "region": "eu" }
}
```

## user.register({account, password, areaCode, code})

Function: Register an Easy WeChat account

Parameter type: Object

Params:

| Name | Type | Allows empty | Description                                                                                                         |
| :------- | :----- | :------- | :------------------- |
| account  | String | N        | Mobile phone number or email     |
| password | String | N        | Password                 |
| areaCode | String | N        | Telephone area code or country/region code |
| code     | String | N        | Verification code               |

Response data parameter:

| Name | Type | Allows empty | Description                                                                                                         |
| :----- | :------ | :------- | :--------------------------------------------------- |
| user   | Object  | N        | User information, see [user.register] method description                |
| at     | String  | N        | Access Token                                       |
| rt     | String  | N        | Refresh Token                                        |
| region | String | N        | User's region cn=China region as=Asia region us=Americas region eu=Europe region |

User description:

| Name | Type | Allows empty | Description                                                                                                         |
| :------------- | :------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| countryCode    | String  | Y        | Telephone area code, starting with "+", such as "+86"                                                                                                                                                                                                                   |
| phoneNumber    | String  | Y        | User's mobile phone number with phone area code format:+8615815725225                                                                                                                                                                                                            |
| email          | String  | Y       | User email, user phone, and email will not be empty at the same time                                                                                                                                                                                                                  |
| apikey         | String  | N        | User id                                                                                                                                                                                                                                              |
| nickname       | String  | Y        | User nickname                                                                                                                                                                                                                                             |
| accountLevel   | Number  | N        | Account level, 10=Free 20=Advanced 30=Pro                                                                                                                                                                                                                  |
| levelExpiredAt | Number  | Y        | Member level expiration timestamp, accurate to milliseconds. If the field is empty or 0, it means there is no expiration time                                                                                                                                                                                   |
| denyRecharge   | Boolean | Y        | Is the current account no longer able to recharge members? If the field is empty or the value is false, it means recharge is allowed. If the value is true, it means recharge is prohibited                                                                                                                                                        |
| accountConsult | Boolean | Y        | Have you received feedback from member inquiries                                                                                                                                                                                                                               |
| ipCountry      | String  | Y        | The backend calculates the user's country and region based on the interface call IP, and the country and region code can be found in [here]（https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes）Alpha-2 code description for wall crossing. When requesting the "Get User Information" or "Home Page" interface, the server will return this field. |

## user.sendCode({account, areaCode, type})

Function: Send verification code

Parameter type: Object

Note: For the same email or phone number, there are restrictions on sending frequency as follows: - Cannot exceed 3 times in 1 minute - Cannot exceed 20 times in 1 hour - Cannot exceed 100 times in 1 day

Params:

| Name | Type | Allows empty | Description                                                                                                         |
| :------- | :----- | :------- | :------------------------------------------------------- |
| account  | String | N        | Mobile phone number or email                                         |
| areaCode | String | N        | Telephone area code or country/region code                                     |
| type     | Number | N        | Verification code type 0: Registration 1: Reset password 3: Account cancellation 4: Verification code login |

Response data parameter: {}

## user.changePwd({oldPassword, newPassword})

Function: Change password

Parameter type: Object

Params:

| Name | Type | Allows empty | Description                                                                                                         |
| :---------- | :----- | :------- | :----- |
| oldPassword | String | N        | old Password |
| newPassword | String | N        | new Password |

Response data parameter: {}

## user.deleteAccount({code})

Function: Delete account

Parameter type: Object

Params:

| Name | Type | Allows empty | Description                                                                                                         |
| :--- | :----- | :------- | :----- |
| code | String | N        | Verification code |

Response data parameter: {}

## user.getRegion({areaCode})

Function: Obtain the area code belonging to

Parameter type: Object

Params:

| Name | Type | Allows empty | Description                                                                                                         |
| :------- | :----- | :------- | :------- |
| areaCode | String | N        | Area Code  |

Response data parameter:

| Name | Type | Allows empty | Description                                                                                                         |
| :----- | :------ | :------- | :--------------------------------------------------- |
| region | String | N        | User's region cn=China region as=Asia region us=Americas region eu=Europe region |

## user.getUserInfo()

Function: Obtain user information

Parameter type: null

Params: null

Response data parameter: 

| Name | Type | Allows empty | Description                                                                                                         |
| :----- | :------ | :------- | :--------------------------------------------------- |
| user   | Object  | N        | User information, see [user.register] method description                    |
| region | String | N        | User's region cn=China region as=Asia region us=Americas region eu=Europe region |

## user.updateUserInfo({nickname, acceptEmailAd, accountConsult, timezone, language, lang, emailSubscription})

Function: Update user information

Parameter type: Object

Params:

| Name | Type | Allows empty | Description                                                                                                         |
| :---------------------- | :------ | :------- | :--------------------------------------------------------------------------------------------- |
| nickname       | String   | Y                | The user's nickname to be updated. If this field is empty or NULL, it means that the nickname will not be updated.                                                                             |
| acceptEmailAd  | Boolean  | Y                | Is the user subscribed to newsletter. If this field is empty or NULL, it means not to update.                                                                                                  |
| accountConsult | Boolean  | Y                | When the user has inquired subscription plans belore, the value will be fixed as true. Passing other values will cause error response. If this field is empty or NULL, it means not to update. |
| timezone                | Object  | Y        | Time zone information                                                                                       |
| timezone.id             | String  | N        | time zone ID                                                                                        |
| timezone.offset         | Number  | N        | Time zone offset                                                                                     |
| language                | String  | Y        | APP language|
| lang                    | String  | Y        | Push language, cn or en                                                                          |
| emailSubscription       | Object  | Y        | Email subscription information, if the field is empty or NULL, it means it will not be updated                                                  |
| emailSubscription.email | String  | N        | email|

Response data parameter:

| Name | Type | Allows empty | Description                                                                                                         |
| :--- | :----- | :------- | :-------------------------------- |
| user | Object | N        | User information, see [user.register] method description |

## user.logout()

Function: Log out and log in

Parameter type: null

Params: null

Response data parameter: {}

## user.refreshToken({rt})

Function: Refresh Token

Parameter type: Object

Params:

| Name | Type | Allows empty | Description                                                                                                         |
| :--- | :----- | :------- | :------------------------------------ |
| rt   | String | Y        | refresh Token，default：The current logged in user |

Response data parameter:

| Name | Type | Allows empty | Description                                                                                                         |
| :--- | :----- | :------- | :------------ |
| at   | String | N        | access Token  |
| rt   | String | N        | refresh Token |

## user.resetPwd({account, newPassword, code})

Function: Reset Password

Parameter type: Object

Params:

| Name | Type | Allows empty | Description                                                                                                         |
| :---------- | :----- | :------- | :--------------- |
| account     | String | N        | Mobile phone number or email |
| newPassword | String | N        | new Password           |
| code        | String | N        | Verification code           |

Response data parameter:

| Name | Type | Allows empty | Description                                                                                                         |
| :----- | :------ | :------- | :--------------------------------------------------- |
| user   | Object  | N        | User information, see [user.register] method description                |
| at     | String  | N        | Access Token                                        |
| rt     | String  | N        | Refresh Token                                        |
| region | String | N        | User's region cn=China region as=Asia region us=Americas region eu=Europe region |

## user.smsLogin({phoneNumber, code, areaCode, lang})

Function: Verification code login (China only)

Parameter type: Object

Params:

| Name | Type | Allows empty | Description                                                                                                         |
| :---------- | :----- | :------- | :-------------------- |
| phoneNumber | String | N        | phoneNumber              |
| code        | String | N        | Verification code                |
| areaCode    | String | N        | Telephone area code or country/region code  |
| lang        | String | Y        | Push language, cn or en |

Response data parameter:

| Name | Type | Allows empty | Description                                                                                                         |
| :----- | :------ | :------- | :--------------------------------------------------- |
| user   | Object  | N        | User information, see [user.register] method description                |
| at     | String  | N        | Access Token                                        |
| rt     | String  | N        | Refresh Token                                        |
| region | String | N        | User's region cn=China region as=Asia region us=Americas region eu=Europe region |
