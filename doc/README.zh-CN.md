# [ewelink-api-next](https://github.com/coolkit-carl/ewelink-api-next)

![Node.js](https://img.shields.io/badge/Node.js-18.7.0-pewter.svg?logo=Node.js&link=https://nodejs.org/cn)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yanhaijing/jslib-base/blob/master/LICENSE)
![Version](https://img.shields.io/badge/Version-0.0.4-orange.svg?logo=SemVer&link=https://nodejs.org/cn)

[English](../README.md) | 简体中文

受到 [ewelink-api](https://github.com/skydiver/ewelink-api) 启发编写的CoolKit v2 API 库

## 特点

- 跟随官方文档更新
- 简洁清晰的调用方法

## 使用说明

推荐使用 npm, 下载 `ewelink-api-next`(node >= 16.16)

```bash
npm i ewelink-api-next
# or pnpm i ewelink-api-next
```

### 示例

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

lanClient.discovery(undefined, (server)=>{
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

## TODO

- [x] 首页管理
- [x] 用户管理
- [x] 设备管理
- [x] 家庭房间
- [x] 消息中心
- [x] OAuth2.0
- [x] 长连接控制
- [x] 局域网控制

## 贡献者

## 修改日志

[CHANGELOG.md](CHANGELOG.md)

## 致谢

| Item                                                           | Reason                   |
|----------------------------------------------------------------|--------------------------|
| [ewelink-api](https://github.com/skydiver/ewelink-api)         | 社区项目，有借鉴其思路              |
| [wechat-api-next](https://github.com/lblblong/wechat-api-next) | 参考实现了项目结构，特别是新学到了混合模式的使用 |
