import eWeLink from "../src/index.js";
import { expect } from "chai";

const lanClient = new eWeLink.Lan({
  selfApikey: "123",
  logObj: console
});

describe("Device management test", function () {
  this.timeout(30000);

  it("lan.encrypt+decrypt", async function () {
    const data = {
      switch: "on",
      ltype: "white",
      white: { br: 100, ct: 255 }
    };
    const encryptContent = lanClient.encrypt(data, "81dc9bdb52d04dc20036dbd8313ed055", "0000000000000000");
    const decryptContent = lanClient.decrypt(encryptContent, "81dc9bdb52d04dc20036dbd8313ed055", "0000000000000000");
    expect(data).to.deep.equal(decryptContent);
  });

  it("lan.encrypt+decrypt", async function () {
    const data = {
      switch: "on",
      ltype: "white",
      white: { br: 100, ct: 255 }
    };
    const encryptContent = lanClient.encrypt(data, "81dc9bdb52d04dc20036dbd8313ed055", "0000000000000000");
    const decryptContent = lanClient.decrypt(encryptContent, "81dc9bdb52d04dc20036dbd8313ed055", "0000000000000000");
    expect(data).to.deep.equal(decryptContent);
  });
});
