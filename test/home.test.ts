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

  it("other.dispatch", async function () {
    const response = await client.other.dispatch({
      region: "cn"
    });
    assert.strictEqual(response.error, 0, "查询分配成功");
  });

  it("home.getFamily", async function () {
    const response = await client.home.getFamily({});
    assert.strictEqual(response.error, 0, "获取家庭清单成功");
    client.storage.set("currentFamilyId", response.data.currentFamilyId);
  });

  it("home.addFamily", async function () {
    const response = await client.home.addFamily({
      name: "新家庭",
      sort: 1
    });
    assert.strictEqual(response.error, 0, "新增家庭成功");
    client.storage.set("tem_familyId", response.data.id);
  });

  it("home.addRoom", async function () {
    const response = await client.home.addRoom({
      familyId: client.storage.get("tem_familyId"),
      name: "房间1",
      sort: 1
    });
    assert.strictEqual(response.error, 0, "新增房间成功");
    client.storage.set("tem_roomId", response.data.id);
  });

  it("home.setFamily", async function () {
    const response = await client.home.setFamily({
      newName: "新名称",
      id: client.storage.get("tem_familyId")
    });
    assert.strictEqual(response.error, 0, "修改家庭名称成功");
  });

  it("home.setRoom", async function () {
    const response = await client.home.setRoom({
      newName: "新名称",
      id: client.storage.get("tem_roomId")
    });
    assert.strictEqual(response.error, 0, "修改名称成功");
  });

  it("home.setThing", async function () {
    const response = await client.home.setThing({
      roomId: client.storage.get("tem_roomId"),
      newThingList: [],
      oldThingList: []
    });
    assert.strictEqual(response.error, 0, "设置Things成功");
  });

  it("home.sortRoom", async function () {
    const response = await client.home.sortRoom({
      familyId: client.storage.get("tem_familyId"),
      idList: [client.storage.get("tem_roomId")]
    });
    assert.strictEqual(response.error, 0, "排序房间成功");
  });

  it("home.sortThing", async function () {
    const response = await client.home.sortThing({
      familyId: client.storage.get("tem_familyId"),
      thingList: []
    });
    assert.strictEqual(response.error, 0, "排序Things成功");
  });

  it("home.delRoom", async function () {
    const response = await client.home.delRoom({
      id: client.storage.get("tem_roomId")
    });
    assert.strictEqual(response.error, 0, "删除房间成功");
    client.storage.remove("tem_roomId");
  });

  it("home.delFamily", async function () {
    const response = await client.home.delFamily({
      id: client.storage.get("tem_familyId"),
      deviceFamily: "62cf696966d517000933c73b",
      switchFamily: "62cf696966d517000933c73b"
    });
    assert.strictEqual(response.error, 0, "删除家庭成功");
    client.storage.remove("tem_familyId");
  });
});
