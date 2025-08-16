import { expect, test } from "vitest";
import { createId } from "../session/sessions.js";
test("registerMcpAuthWebSocketRoute no args", async () => {
    return new Promise((resolve, reject) => {
        const id = createId();
        const ws = new WebSocket("http://127.0.0.1:3000/command/mcp/auth");
        ws.onmessage = function (e) {
            console.log(e);
            const data = JSON.parse(e.data);
            console.log(data);
            expect(data.id).toEqual(id);
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
            ws.send(JSON.stringify({
                id,
                cwd: "f:/home",
                argv: [],
                args: "",
            }));
        };
    });
});
test("registerMcpAuthWebSocketRoute with args", async () => {
    return new Promise((resolve, reject) => {
        const id = createId();
        const ws = new WebSocket("http://127.0.0.1:3000/command/mcp/auth");
        ws.onmessage = function (e) {
            console.log(e);
            const data = JSON.parse(e.data);
            console.log(data);
            expect(data.id).toEqual(id);
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
            ws.send(JSON.stringify({
                id,
                cwd: "f:/home",
                argv: [],
                args: "tavily",
            }));
        };
    });
});
//# sourceMappingURL=registerMcpAuthWebSocketRoute.test.js.map