import "mocha";
import { wsClient } from "./testConfig.js";

wsClient.userApiKey = "";
wsClient.at = "";
wsClient.region = "";

await wsClient.Connect.create(
  {
    appId: wsClient?.appId || "",
    at: wsClient.at,
    region: wsClient.region,
    userApiKey: wsClient.userApiKey
  },
  () => {
    console.log("connected");
  },
  () => {
    console.log("disconnected");
  },
  (_err) => {
    console.log("Error generated:", _err);
  },
  (_ws, _msg) => {
    console.log("Received message: ", _msg);
  }
);

// setTimeout(() => {
//   wsClient.Connect.updateState("10009f1c42", {
//     switches: [
//       { switch: "on", outlet: 0 },
//       { switch: "on", outlet: 1 },
//       { switch: "on", outlet: 2 },
//       { switch: "on", outlet: 3 }
//     ]
//   });
// }, 5000);
//
// setTimeout(() => {
//   wsClient.Connect.updateState("10009f1c42", {
//     switches: [
//       { switch: "off", outlet: 0 },
//       { switch: "off", outlet: 1 },
//       { switch: "off", outlet: 2 },
//       { switch: "off", outlet: 3 }
//     ]
//   });
// }, 8000);
// setTimeout(() => {
//   wsClient.Connect.updateState("10009f1c42", {
//     switches: [
//       { switch: "on", outlet: 0 },
//       { switch: "on", outlet: 1 },
//       { switch: "off", outlet: 2 },
//       { switch: "off", outlet: 3 }
//     ]
//   });
// }, 10000);
// setTimeout(() => {
//   wsClient.Connect.updateState("10009f1c42", {
//     switches: [
//       { switch: "off", outlet: 0 },
//       { switch: "off", outlet: 1 },
//       { switch: "off", outlet: 2 },
//       { switch: "off", outlet: 3 }
//     ]
//   });
//   ws.close();
// }, 13000);
