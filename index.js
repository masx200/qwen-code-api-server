import websocket from "@fastify/websocket";
import Fastify from "fastify";
import fs from "fs";
import { registerAboutRoute } from "./about/registerAboutRoute.js";
import { authOptions, registerBasicAuthMiddleware, } from "./auth/basicAuthMiddleware.js";
import { registerMcpAuthWebSocketRoute } from "./mcp/registerMcpAuthWebSocketRoute.js";
import { registerMcpListRoute, registerMcpRoute, } from "./mcp/registerMcpListRoute.js";
import { registerMcprefreshRoute } from "./mcp/registerMcpRefreshRoute.js";
import { registerQuitRoute } from "./quit/registerQuitRoute.js";
import { SessionManager } from "./session/SessionManager.js";
import { registerSessionRoute } from "./session/route-session.js";
import { start } from "./start.js";
import { registerStatsModelRoute } from "./stats/registerStatsModelRoute.js";
import { registerStatsRoute } from "./stats/registerStatsRoute.js";
import { registerStatsToolsRoute } from "./stats/registerStatsToolsRoute.js";
import { registerSwaggerPlugin } from "./swagger/registerSwaggerPlugin.js";
import { registertoolsRoute } from "./tools/registertoolsRoute.js";
async function main(authOptions) {
    const fastify = Fastify({
        logger: {
            level: "info",
            transport: {
                target: "pino-pretty",
            },
        },
    });
    if (authOptions.username && authOptions.password) {
        await registerBasicAuthMiddleware(fastify, authOptions);
    }
    await registerSwaggerPlugin(fastify);
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
    registerMcpRoute(fastify);
    registertoolsRoute(fastify);
    await start(fastify, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log("listening address", address);
    }, authOptions.port, authOptions.host).then(console.log, console.error);
    await fastify.ready().then(async () => {
        if (authOptions.document) {
            console.log("swagger document path", authOptions.document);
            await fs.promises.writeFile(authOptions.document, JSON.stringify(fastify.swagger(), null, 4));
        }
        else {
            console.log("swagger document", JSON.stringify(fastify.swagger(), null, 4));
        }
    }, console.error);
}
await main(authOptions).then(console.log, console.error);
//# sourceMappingURL=index.js.map