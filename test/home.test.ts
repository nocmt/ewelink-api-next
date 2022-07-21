import "mocha";
import { assert } from "chai";
import { client } from "./testConfig.js";

describe("家庭管理测试", function () {
  this.timeout(30000);

  it("home.homePage", async function () {
    const response = await client.home.homePage({
      getThing: {
        num: 30
      }
    });
    assert.strictEqual(response.error, 0, "查询首页成功");
  });
});
