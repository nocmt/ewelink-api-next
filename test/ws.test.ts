import "mocha";
import { assert } from "chai";
import { client } from "./testConfig.js";

describe("Device management test", function () {
  this.timeout(30000);

  before(async function () {
    let response = await client.user.login({ account: "upymjh35902@chacuo.net", password: "12345678", areaCode: "+1" });
    assert.strictEqual(response.error, 0, "Login is successful");
  });

  after(async function () {
    let response = await client.user.logout({ account: "upymjh35902@chacuo.net" });
    assert.strictEqual(response.error, 0, "success");
  });

  it("device.addDevice", async function () {
    const response = await client.device.addDevice({
      name: "Device85c78c",
      deviceId: "100085c78c",
      deviceKey: "1234"
    });
    assert.strictEqual(response.error, 30015, "success");
  });
});
