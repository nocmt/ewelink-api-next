import "mocha";
import { assert } from "chai";
import { client } from "./testConfig.js";

describe("Device management test", function () {
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

  it("device.addGroup", async function () {
    const response = await client.device.addGroup({
      mainDeviceId: "100085c78c",
      name: "123",
      deviceidList: ["100085c78c", "100085c78d"]
    });
    assert.strictEqual(response.error, 405, "success");
  });

  it("device.addGSMDevice", async function () {
    const response = await client.device.addGSMDevice({
      id: "1231231232131231231231231231",
      name: "123"
    });
    assert.strictEqual(response.error, 30011, "success");
  });

  it("device.coverGroupDeviceList", async function () {
    const response = await client.device.coverGroupDeviceList({
      id: "1234",
      coverDeviceidList: ["100085c78c", "100085c78d"]
    });
    assert.strictEqual(response.error, 400, "success");
  });

  it("device.delDevice", async function () {
    const response = await client.device.delDevice({
      id: "100085c78c"
    });
    assert.strictEqual(response.error, 403, "success");
  });

  it("device.delGroup", async function () {
    const response = await client.device.delGroup({
      id: "1231241243"
    });
    assert.strictEqual(response.error, 400, "success");
  });

  it("device.delGroupDeviceList", async function () {
    const response = await client.device.delGroupDeviceList({
      delDeviceidList: ["100085c78c", "100085c78d"],
      id: "123"
    });
    assert.strictEqual(response.error, 400, "success");
  });

  it("device.delOperationHistory", async function () {
    const response = await client.device.delOperationHistory({
      deviceId: "100085c78c"
    });
    assert.strictEqual(response.error, 405, "success");
  });

  it("device.share", async function () {
    const response = await client.device.share({
      comment: "123",
      deviceidList: ["100085c78c", "100085c78d"],
      permit: 15,
      shareType: 1,
      user: { countryCode: "+1", email: "1234@gmail.com" }
    });
    assert.strictEqual(response.error, 405, "success");
  });

  it("device.setShare", async function () {
    const response = await client.device.setShare({
      apiKey: "62dfe4cf03546100096ba08c62dfe4cf03546100096ba08c",
      deviceId: "100085c78c",
      permit: 15
    });
    assert.strictEqual(response.error, 400, "success");
  });

  it("device.delShare", async function () {
    const response = await client.device.delShare({
      apiKey: "123123123123123123213123",
      deviceId: "100085c78c"
    });
    assert.strictEqual(response.error, 400, "success");
  });

  it("device.GetAllThings", async function () {
    const response = await client.device.getAllThings({});
    assert.strictEqual(response.error, 0, "success");
  });

  it("device.getGroup", async function () {
    const response = await client.device.getGroup({});
    assert.strictEqual(response.error, 0, "success");
  });

  it("device.getOperationHistory", async function () {
    const response = await client.device.getOperationHistory({
      deviceId: "100085c78c"
    });
    assert.strictEqual(response.error, 405, "success");
  });

  it("device.getOTAInfo", async function () {
    const response = await client.device.getOTAInfo({
      deviceInfoList: [
        {
          deviceid: "100085c78c",
          model: "PSF-B01-GL",
          version: "1.0.0"
        }
      ]
    });
    assert.strictEqual(response.error, 0, "success");
  });

  it("device.getThingStatus", async function () {
    const response = await client.device.getThingStatus({ id: "100085c78c", type: 1 });
    assert.strictEqual(response.error, 405, "success");
  });

  it("device.setAllThingStatus", async function () {
    const response = await client.device.setAllThingStatus({
      thingList: [{ id: "100085c78c", params: {}, type: 1 }],
      timeout: 3000
    });
    assert.strictEqual(response.error, 0, "success");
  });

  it("device.setDeviceInfo", async function () {
    const response = await client.device.setDeviceInfo({
      deviceId: "100085c78c",
      newName: "newName100085c78c",
      newRoomId: "62dfe4cf03546100096ba08c"
    });
    assert.strictEqual(response.error, 405, "success");
  });

  it("device.setDeviceTags", async function () {
    const response = await client.device.setDeviceTags({
      type: "replace",
      deviceId: "100085c78c",
      tags: {
        tag1: "tag1"
      }
    });
    assert.strictEqual(response.error, 405, "success");
  });

  it("device.setGroup", async function () {
    const response = await client.device.setGroup({
      newName: "newName",
      id: "62dfe4cf03546100096ba08c"
    });
    assert.strictEqual(response.error, 405, "success");
  });

  it("device.setGroupDeviceList", async function () {
    const response = await client.device.setGroupDeviceList({
      id: "62dfe4cf03546100096ba08c",
      addDeviceidList: ["100085c78c", "100085c78d"]
    });
    assert.strictEqual(response.error, 405, "success");
  });

  it("device.setGroupStatus", async function () {
    const response = await client.device.setGroupStatus({
      id: "62dfe4cf03546100096ba08c",
      params: { status: 1 }
    });
    assert.strictEqual(response.error, 405, "success");
  });

  it("device.setThingStatus", async function () {
    const response = await client.device.setThingStatus({ id: "100085c78c", params: {}, type: 1 });
    assert.strictEqual(response.error, 405, "success");
  });
});
