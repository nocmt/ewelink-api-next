import "mocha";
import { assert } from "chai";
import { client, wsClient } from "./testConfig.js";

describe("Device management test", function () {
  before(async function () {
    let response = await client.user.login({ account: "upymjh35902@chacuo.net", password: "12345678", areaCode: "+1" });
    assert.strictEqual(response.error, 0, "Login is successful");
  });

  it("ws.control", async function () {
    const ws = await wsClient.Connect.create({
      appId: client?.appId || "",
      at: client.at,
      region: "us",
      userApiKey: client.userApiKey
    });
    assert(ws, "ws is not null");

    setTimeout(() => {
      wsClient.Connect.updateState("10009f1c42", {
        switches: [
          { switch: "on", outlet: 0 },
          { switch: "on", outlet: 1 },
          { switch: "on", outlet: 2 },
          { switch: "on", outlet: 3 }
        ]
      });
    }, 5000);

    setTimeout(() => {
      wsClient.Connect.updateState("10009f1c42", {
        switches: [
          { switch: "off", outlet: 0 },
          { switch: "off", outlet: 1 },
          { switch: "off", outlet: 2 },
          { switch: "off", outlet: 3 }
        ]
      });
    }, 8000);

    setTimeout(() => {
      wsClient.Connect.updateState("10009f1c42", {
        switches: [
          { switch: "on", outlet: 0 },
          { switch: "on", outlet: 1 },
          { switch: "off", outlet: 2 },
          { switch: "off", outlet: 3 }
        ]
      });
    }, 10000);

    setTimeout(() => {
      wsClient.Connect.updateState("10009f1c42", {
        switches: [
          { switch: "off", outlet: 0 },
          { switch: "off", outlet: 1 },
          { switch: "off", outlet: 2 },
          { switch: "off", outlet: 3 }
        ]
      });
      ws.close();
    }, 12000);
    assert(ws, "ws is not null");
  });
});
