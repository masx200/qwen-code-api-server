import websocket from "@fastify/websocket";
import Fastify from "fastify";
import { expect, test } from "vitest";
import { createId } from "../session/sessions.js";
import { start } from "../start.js";
import { registerMcpAuthWebSocketRoute } from "./registerMcpAuthWebSocketRoute.js";
test("registerMcpAuthWebSocketRoute with args", async () => {
    const fastify = Fastify({
        logger: {
            level: "info",
            transport: {
                target: "pino-pretty",
            },
        },
    });
    try {
        return new Promise(async (resolve, reject) => {
            const port = Math.floor(Math.random() * 10000 + 10000);
            const fastify = Fastify({
                logger: {
                    level: "info",
                    transport: {
                        target: "pino-pretty",
                    },
                },
            });
            // 注册WebSocket支持
            await fastify.register(websocket);
            registerMcpAuthWebSocketRoute(fastify);
            await start(fastify, async (err, address) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log("listening", address);
            }, port);
            await fastify.ready();
            const id = createId();
            const ws = new WebSocket(`http://127.0.0.1:${port}/command/mcp/auth`);
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
    }
    finally {
        fastify.close(() => {
            console.log("fastify close");
        });
    }
}, { timeout: 30000 });
//# sourceMappingURL=registerMcpAuthWebSocketRoute-2.test.js.map