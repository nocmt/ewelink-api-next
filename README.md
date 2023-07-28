# [ewelink-api-next](https://github.com/coolkit-carl/ewelink-api-next)

![Node.js](https://img.shields.io/badge/Node.js-18.7.0-pewter.svg?logo=Node.js&link=https://nodejs.org/cn)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yanhaijing/jslib-base/blob/master/LICENSE)
![Version](https://img.shields.io/badge/Version-0.0.4-orange.svg?logo=SemVer&link=https://nodejs.org/cn)

English | [简体中文](README.zh-CN.md)

Coolkit V2 API library inspired by [ewelink-api](https://github.com/skydiver/ewelink-api)

## Characteristic

- Follow official document updates
- Concise and clear calling method

## Usage Instructions

Using npm, install `ewelink-api-next`(node >= 16.16)

```bash
npm i ewelink-api-next
# or pnpm add ewelink-api-next
```

### Example

Set the 'type' and 'module' in package.json, otherwise an error will be reported

```typescript
// eWeLink v2 API

import eWeLink from 'ewelink-api-next';

const client = new eWeLink.WebAPI({
  appId: "xxx",
  appSecret: "xxx",
  region: "us",
  logObj: eWeLink.createLogger("us") // or console
});

client.syncLocalToken(region="us", account="xxx@xxx.net");
try {
  const response = await client.user.login({ account: "xxx@xxx.com", password: "12345678", areaCode: "+1" });
  const userInfo = response.error === 0 ? response.data.user : {};
  console.log('userInfo：', userInfo);
} catch (err) {
  console.log('Failed to get user information:', err.message);
}
```

```typescript
// eWeLink WebSocket API

import eWeLink from 'ewelink-api-next';

const wsClient = new eWeLink.Ws({
  appId: "xxx",
  appSecret: "xxx",
  region: "us"
});
wsClient.syncLocalToken(region="us", account="xxx@xxx.net");

let ws = await wsClient.Connect.create({
  appId: wsClient?.appId || "",
  at: wsClient.at,
  region: "us",
  userApiKey: wsClient.userApiKey
});

setTimeout(() => {
  wsClient.Connect.updateState("xxxx", {
    switch: "on"});
}, 5000);
```

```typescript
// eWeLink Lan Control
import eWeLink from 'ewelink-api-next';

const lanClient = new eWeLink.Lan({
  selfApikey: "xxx",
  logObj: eWeLink.createLogger("lan")
});

lanClient.discovery((server)=>{
  console.log("server:", server);
}); // Start Discovery Service
try {
  const res = await lanClient.zeroconf.switches({
    data: {
      switch: "on"
    },
    deviceId: "xxx",
    secretKey: "xxx"
  });
  console.info("Request result:：", res);
  const res2 = await lanClient.zeroconf.switches({
    data: {
      switch: "off"
    },
    deviceId: "xxx",
    secretKey: "xxx"
  });
  console.info("Request result:：", res2);
} catch (error: any) {
  console.info(error.message);
}

```

## Todo

- [x] Homepage management
- [x] User management
- [x] Device management
- [x] Home management
- [x] Message center
- [x] OAuth2.0
- [x] WebSocket control
- [x] LAN control

## Contributors

[contributors](https://github.com/yanhaijing/jslib-base/graphs/contributors)

## Change Log

[CHANGELOG.md](CHANGELOG.md)

## Thanks

| Item                                                           | Reason          |
|----------------------------------------------------------------|----------------------------------------------|
| [ewelink-api](https://github.com/skydiver/ewelink-api)         | Community projects, there are ideas to learn from|
| [wechat-api-next](https://github.com/lblblong/wechat-api-next) | Use of mixed mode and project structure reference |

