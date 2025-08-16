import { test } from "vitest";
test("registerMcpAuthWebSocketRoute no args", async () => {
  return new Promise<void>((resolve, reject) => {
    const ws = new WebSocket("http://127.0.0.1:3000/command/mcp/auth");

    ws.onmessage = function (e) {
      console.log(e);
      const data = JSON.parse(e.data);
      console.log(data);
      // ws.close();
      if (data?.type === "close") {
        ws.close();
        resolve();
        return;
      }

      if (data?.type === "error") {
        ws.close();
        reject(data);
        return;
      }
    };

    ws.onerror = function (e) {
      console.error(e);
      reject(e);
    };
    ws.onclose = function (e) {
      console.log(e);
      resolve();
    };
    ws.onopen = function (e) {
      console.log(e);
      ws.send(
        JSON.stringify({
          id: createId(),
          cwd: "f:/home",
          argv: [],
          args: "",
        })
      );
    };
  });

  function createId() {
    return Array(5)
      .fill(undefined)
      .map(() => Math.random().toString(36).substring(2))
      .join("");
  }
});
test("registerMcpAuthWebSocketRoute with args", async () => {
  return new Promise<void>((resolve, reject) => {
    const ws = new WebSocket("http://127.0.0.1:3000/command/mcp/auth");

    ws.onmessage = function (e) {
      console.log(e);
      const data = JSON.parse(e.data);
      console.log(data);
      // ws.close();
      if (data?.type === "close") {
        ws.close();
        resolve();
        return;
      }

      if (data?.type === "error") {
        ws.close();
        reject(data);
        return;
      }
    };

    ws.onerror = function (e) {
      console.error(e);
      reject(e);
    };
    ws.onclose = function (e) {
      console.log(e);
      resolve();
    };
    ws.onopen = function (e) {
      console.log(e);
      ws.send(
        JSON.stringify({
          id: createId(),
          cwd: "f:/home",
          argv: [],
          args: "tavily",
        })
      );
    };
  });

  function createId() {
    return Array(5)
      .fill(undefined)
      .map(() => Math.random().toString(36).substring(2))
      .join("");
  }
});
