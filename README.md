# [eWeLink-api-next](https://github.com/coolkit-carl/ewelink-api-next)

![Node.js](https://img.shields.io/badge/Node.js-18.5.0-pewter.svg?logo=Node.js&link=https://nodejs.org/cn)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yanhaijing/jslib-base/blob/master/LICENSE)
![Version](https://img.shields.io/badge/Version-0.0.2-orange.svg?logo=SemVer&link=https://nodejs.org/cn)

English | [简体中文](doc/README.zh-CN.md)

> Coolkit V2 API library inspired by ewelink-api

## Characteristic

- Follow official document updates
- Concise and clear calling method

## Usage Instructions

Using npm, install `ewelink-api-next`(node >= 16.16)

```bash
$ npm i ewelink-api-next # or pnpm i ewelink-api-next
```

#### Example

```typescript
import eWeLink from 'ewelink-api-next';

const client = new eWeLink.WebAPI({
  appId,
  appSecret,
  region,
  requestRecord: true
});

try {
  const response = await client.user.login({ account: "xxx@xxx.com", password: "12345678", areaCode: "+1" });
  const userInfo = response.error === 0 ? response.data.user : {};
  console.log('userInfo：', userInfo);
} catch (err) {
  console.log('Failed to get user information:', err.message);
}
```

## Todo

- [x] Homepage management
- [x] User management
- [x] Device management
- [x] Home management
- [x] Message center
- [ ] WebSocket control
- [ ] LAN control

## Contributors

[contributors](https://github.com/yanhaijing/jslib-base/graphs/contributors)

## Change Log

[CHANGELOG.md](doc/CHANGELOG.md)

## Thanks

| Item                                                           | Reason          |
|----------------------------------------------------------------|----------------------------------------------|
| [ewelink-api](https://github.com/skydiver/ewelink-api)         | Community projects, there are ideas to learn from|
| [wechat-api-next](https://github.com/lblblong/wechat-api-next) | Use of mixed mode and project structure reference |

