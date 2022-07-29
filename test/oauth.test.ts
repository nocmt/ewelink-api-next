import "mocha";
import { assert } from "chai";
import { client } from "./testConfig.js";

describe("OAuth management test", function () {
  this.timeout(30000);

  it("oauth.createLoginUrl", function () {
    const url = client.oauth.createLoginUrl({
      redirectUrl: "https://127.0.0.1",
      state: "001"
    });
    assert.exists(url, "success");
  });

  it("oauth.getToken", async function () {
    const response = await client.oauth.getToken({
      redirectUrl: "https://127.0.0.1",
      code: "123124",
      region: "cn"
    });
    assert.strictEqual(response.error, 406, "success");
  });
});
