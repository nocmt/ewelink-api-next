import "mocha";
import { assert } from "chai";
import { client } from "./testConfig.js";

describe("User management test", function () {
  it("user.getRegion", async function () {
    const response = await client.user.getRegion({ areaCode: "86" });
    assert.strictEqual(response.data.region, "cn", "The region query is correct");
    const response2 = await client.user.getRegion({ areaCode: "1" });
    assert.strictEqual(response2.data.region, "us", "The region query is correct");
  });

  it("user.login", async function () {
    let response = await client.user.login({ account: "upymjh35902@chacuo.net", password: "12345678", areaCode: "+1" });
    assert.strictEqual(response.error, 0, "Login is successful");
  });

  it("user.register", async function () {
    let response = await client.user.register({
      account: "upymjh35902@chacuo.net",
      password: "12345678",
      areaCode: "+1",
      code: "4495"
    });
    assert.strictEqual(response.error, 10009, "success");
  });

  it("user.sendCode", async function () {
    let response = await client.user.sendCode({
      account: "upymjh35902@chacuo.net",
      type: "1"
    });
    assert.strictEqual(response.error, 0, "success");
  });

  it("user.smsLogin", async function () {
    let response = await client.user.smsLogin({ code: "1234", areaCode: "+86", phoneNumber: "+8612345678945" });
    assert.strictEqual(response.error, 400, "success");
  });

  it("user.getUserInfo", async function () {
    let response = await client.user.getUserInfo();
    assert.strictEqual(response.error, 0, "success");
  });

  it("user.updateUserInfo", async function () {
    let response = await client.user.setUserInfo({ nickname: "test", acceptEmailAd: false, accountConsult: null });
    assert.strictEqual(response.error, 0, "success");
  });

  it("user.resetPwd", async function () {
    let response = await client.user.resetPwd({
      code: "1234",
      newPassword: "12345678",
      account: "upymjh35902@chacuo.net"
    });
    assert.strictEqual(response.error, 400, "success");
  });

  it("user.changePwd", async function () {
    let response = await client.user.changePwd({
      oldPassword: "12345678",
      newPassword: "12345678"
    });
    assert.strictEqual(response.error, 0, "success");
  });

  it("user.logout", async function () {
    let response = await client.user.logout({ account: "upymjh35902@chacuo.net" });
    assert.strictEqual(response.error, 0, "success");
  });
});
