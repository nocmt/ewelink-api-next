# [eWeLink-api-next](https://github.com/coolkit-carl/ewelink-api-next)

![Node.js](https://img.shields.io/badge/Node.js-18.5.0-pewter.svg?logo=Node.js&link=https://nodejs.org/cn)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yanhaijing/jslib-base/blob/master/LICENSE)
![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg?logo=SemVer&link=https://nodejs.org/cn)

[English](../README.md) | 简体中文

> 受到 ewelink-api 启发编写的CoolKit v2 API 库

## 特点

- 跟随官方文档更新
- 简洁清晰的调用方法

## 使用说明

使用 npm, 下载 `ewelink-api-next`(node >= 16.16)

```bash
$ npm i ewelink-api-next # or pnpm i ewelink-api-next
```

### 示例

```typescript
import { WebAPI } from 'ewelink-api-next';

const client = new WebAPI( {
  appId,
  appSecret,
  region,
  requestRecord: true
});

try {
  const response = await client.user.login({ account: "+8612345678912", password: "12345678", areaCode: "+1" });
  const userInfo = response.error === 0 ? response.data.user : {};
  console.log('userInfo：', userInfo);
} catch (err) {
  console.log('Failed to get user information:', err.message);
}
```

## TODO

- [x] 首页管理
- [x] 用户管理
- [x] 设备管理
- [x] 家庭房间
- [x] 消息中心
- [ ] 长连接控制
- [ ] 局域网控制

## 贡献者


## 修改日志

[CHANGELOG.md](CHANGELOG.md)

## 致谢

| Item                                                           | Reason                   |
|----------------------------------------------------------------|--------------------------|
| [ewelink-api](https://github.com/skydiver/ewelink-api)         | 社区项目，有借鉴其思路              |
| [wechat-api-next](https://github.com/lblblong/wechat-api-next) | 参考实现了项目结构，特别是新学到了混合模式的使用 |
