import "mocha";
import { assert } from "chai";
import { client } from "./testConfig.js";
import { storage } from "./cache.js";

describe("Family management test", function () {
  before(async function () {
    let response = await client.user.login({ account: "upymjh35902@chacuo.net", password: "12345678", areaCode: "+1" });
    assert.strictEqual(response.error, 0, "Login is successful");
  });

  after(async function () {
    let response = await client.user.logout();
    assert.strictEqual(response.error, 0, "success");
  });

  it("home.homePage", async function () {
    const response = await client.home.homePage({
      getThing: {
        num: 30
      }
    });
    assert.strictEqual(response.error, 0, "success");
  });

  it("other.dispatch", async function () {
    const response = await client.other.dispatch("cn");
    assert.strictEqual(response.error, 0, "success");
  });

  it("home.getFamily", async function () {
    const response = await client.home.getFamily({});
    assert.strictEqual(response.error, 0, "success");
    storage.set("currentFamilyId", response.data.currentFamilyId);
  });

  it("home.addFamily", async function () {
    const response = await client.home.addFamily({
      name: "newFamily",
      sort: 1
    });
    assert.strictEqual(response.error, 0, "success");
    storage.set("tem_familyId", response.data.id);
  });

  it("home.addRoom", async function () {
    const response = await client.home.addRoom({
      familyId: storage.get("tem_familyId"),
      name: "room1",
      sort: 1
    });
    assert.strictEqual(response.error, 0, "success");
    storage.set("tem_roomId", response.data.id);
  });

  it("home.setFamily", async function () {
    const response = await client.home.setFamily({
      newName: "newName",
      id: storage.get("tem_familyId")
    });
    assert.strictEqual(response.error, 0, "success");
  });

  it("home.setRoom", async function () {
    const response = await client.home.setRoom({
      newName: "newName",
      id: storage.get("tem_roomId")
    });
    assert.strictEqual(response.error, 0, "success");
  });

  it("home.setThing", async function () {
    this.timeout(30000);
    const response = await client.home.setThing({
      roomId: storage.get("tem_roomId"),
      newThingList: [],
      oldThingList: []
    });
    assert.strictEqual(response.error, 0, "success");
  });

  it("home.sortRoom", async function () {
    const response = await client.home.sortRoom({
      familyId: storage.get("tem_familyId"),
      idList: [storage.get("tem_roomId")]
    });
    assert.strictEqual(response.error, 0, "success");
  });

  it("home.sortThing", async function () {
    const response = await client.home.sortThing({
      familyId: storage.get("tem_familyId"),
      thingList: []
    });
    assert.strictEqual(response.error, 0, "success");
  });

  it("home.delRoom", async function () {
    const response = await client.home.delRoom({
      id: storage.get("tem_roomId")
    });
    assert.strictEqual(response.error, 0, "success");
    storage.remove("tem_roomId");
  });

  it("home.delFamily", async function () {
    const response = await client.home.delFamily({
      id: storage.get("tem_familyId"),
      deviceFamily: "62cf696966d517000933c73b",
      switchFamily: "62cf696966d517000933c73b"
    });
    assert.strictEqual(response.error, 0, "success");
    storage.remove("tem_familyId");
  });

  it("message.getMessage", async function () {
    const response = await client.message.getMessage({});
    assert.strictEqual(response.error, 0, "success");
  });
});
