// ESM
import Fastify from "fastify";
import websocket from "@fastify/websocket";
import { registerAboutRoute } from "./about/registerAboutRoute.js";
import { registerQuitRoute } from "./quit/registerQuitRoute.js";
import { registerSessionRoute } from "./session/route-session.js";
import { SessionManager } from "./session/sessions.js";
import { start } from "./start.js";
import { registerSwaggerPlugin } from "./swagger/registerSwaggerPlugin.js";
import { registerMcpListRoute } from "./mcp/registerMcpListRoute.js";
import { registerMcprefreshRoute } from "./mcp/registerMcpRefreshRoute.js";
import { registerStatsRoute } from "./stats/registerStatsRoute.js";
import { registerStatsModelRoute } from "./stats/registerStatsModelRoute.js";
import { registerStatsToolsRoute } from "./stats/registerStatsToolsRoute.js";
import { registerMcpAuthWebSocketRoute } from "./mcp/registerMcpAuthWebSocketRoute.js";
async function main() {
    const fastify = Fastify({
        logger: {
            level: "info",
            transport: {
                target: "pino-pretty",
            },
        },
    });
    await registerSwaggerPlugin(fastify);
    // 注册WebSocket支持
    await fastify.register(websocket);
    const sessionManager = new SessionManager();
    registerAboutRoute(fastify);
    registerQuitRoute(fastify, sessionManager);
    registerSessionRoute(fastify, sessionManager);
    registerMcpListRoute(fastify);
    registerMcprefreshRoute(fastify);
    registerStatsRoute(fastify, sessionManager);
    registerStatsModelRoute(fastify, sessionManager);
    registerStatsToolsRoute(fastify, sessionManager);
    registerMcpAuthWebSocketRoute(fastify);
    await start(fastify).then(console.log, console.error);
    await fastify.ready().then(() => {
        console.log("swagger document", JSON.stringify(fastify.swagger(), null, 4));
    }, console.error);
}
await main().then(console.log, console.error);
//# sourceMappingURL=index.js.map