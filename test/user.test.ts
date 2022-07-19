import "mocha";
import { assert } from "chai";
import { client } from "./testConfig.js";

describe("用户管理测试", function () {
  this.timeout(30000);

  it("user.getRegion", async function () {
    const response = await client.user.getRegion({ areaCode: "86" });
    assert.strictEqual(response.data.region, "cn", "区域查询是正确的");
  });

  it("user.login", async function () {
    let response = await client.user.login({ account: "upymjh35902@chacuo.net", password: "12345678", areaCode: "+1" });
    assert.strictEqual(response.error, 0, "登录是成功的");
  });

  it("user.register", async function () {
    let response = await client.user.register({
      account: "upymjh35902@chacuo.net",
      password: "12345678",
      areaCode: "+1",
      code: "4495"
    });
    assert.strictEqual(response.error, 0, "验证码错误");
  });

  it("user.sendCode", async function () {
    let response = await client.user.sendCode({
      account: "upymjh35902@chacuo.net",
      type: "1"
    });
    assert.strictEqual(response.error, 0, "发送验证码是成功的");
  });

  it("user.smsLogin", async function () {
    let response = await client.user.smsLogin({ code: "1234", areaCode: "+86", phoneNumber: "+8612345678945" });
    assert.strictEqual(response.error, 0, "登录成功");
  });

  it("user.getUserInfo", async function () {
    let response = await client.user.getUserInfo();
    assert.strictEqual(response.error, 0, "获取用户信息成功");
  });

  it("user.updateUserInfo", async function () {
    let response = await client.user.updateUserInfo({ nickname: "test", acceptEmailAd: false, accountConsult: null });
    assert.strictEqual(response.error, 0, "更新用户信息成功");
  });

  it("user.resetPwd", async function () {
    let response = await client.user.resetPwd({
      code: "1234",
      newPassword: "12345678",
      account: "upymjh35902@chacuo.net"
    });
    assert.strictEqual(response.error, 0, "重置密码成功");
  });

  it("user.changePwd", async function () {
    let response = await client.user.changePwd({
      oldPassword: "12345678",
      newPassword: "12345678"
    });
    assert.strictEqual(response.error, 0, "修改密码成功");
  });

  it("user.changePwd", async function () {
    let response = await client.user.changePwd({
      oldPassword: "12345678",
      newPassword: "12345678"
    });
    assert.strictEqual(response.error, 0, "修改密码成功");
  });

  it("user.logout", async function () {
    let response = await client.user.logout({ account: "upymjh35902@chacuo.net" });
    assert.strictEqual(response.error, 0, "退出登录成功");
  });
});
