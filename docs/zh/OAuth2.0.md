# OAuth2.0

## oauth.createLoginUrl({redirectUrl, state, grantType})

功能：生成授权页的登录链接

参数类型：Object

参数内容：

| 名称          | 类型     | 允许为空 | 说明                            |
|:------------|:-------|:-----|:------------------------------|
| redirectUrl | String | N    | 登录成功后跳转的回调地址                  |
| state       | String | N    | 状态ID, 类似用户 ID，跳转时做标识判断        |
| grantType   | String | Y    | 授权类型，默认: `authorization_code` |

返回内容：

| 名称  | 类型     | 允许为空 | 说明    |
|:----|:-------|:-----|:------|
| url | String | N    | 登录URL |

## oauth.getToken({region, redirectUrl, code, grantType})

功能：根据 code 获取 token

参数类型：Object

参数内容：

| 名称          | 类型     | 允许为空 | 说明                            |
|:------------|:-------|:-----|:------------------------------|
| region      | String | N    | 区域                            |
| redirectUrl | String | N    | 登录成功后跳转的回调地址                  |
| code        | String | N    | 登录成功后返回的code                  |
| grantType   | String | Y    | 授权类型，默认: `authorization_code` |

响应的 data 参数：

| 名称               | 类型     | 允许为空 | 说明            |
|:-----------------|:-------|:-----|:--------------|
| accessToken      | String | N    | access token  |
| refreshToken     | String | N    | refresh token |
| region           | String | N    | 区域            |
| user             | Object | N    | 用户信息          |
| user.apikey      | String | N    | 用户ID          |
| user.email       | String | Y    | 邮箱            |
| user.phoneNumber | String | Y    | 手机号码          |
| user.countryCode | String | N    | 用户国家码         |
