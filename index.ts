import type{ AuthOptions } from "./auth/basicAuthMiddleware.ts";
// ESM

import websocket from "@fastify/websocket";
import Fastify from "fastify";

import fs from "fs";
import { registerAboutRoute } from "./about/registerAboutRoute.js";
import {
  authOptions,
  registerBasicAuthMiddleware
} from "./auth/basicAuthMiddleware.js";
import { registerMcpAuthWebSocketRoute } from "./mcp/registerMcpAuthWebSocketRoute.js";
import {
  registerMcpListRoute,
  registerMcpRoute,
} from "./mcp/registerMcpListRoute.js";
import { registerMcprefreshRouteWebSocket } from "./mcp/registerMcpRefreshRoute.js";
import { registerQuitRoute } from "./quit/registerQuitRoute.js";
import { SessionManager } from "./session/SessionManager.js";
import { registerSessionRoute } from "./session/route-session.js";
import { start } from "./start.js";
import { registerStatsModelRoute } from "./stats/registerStatsModelRoute.js";
import { registerStatsRoute } from "./stats/registerStatsRoute.js";
import { registerStatsToolsRoute } from "./stats/registerStatsToolsRoute.js";
import { registerSwaggerPlugin } from "./swagger/registerSwaggerPlugin.js";
import { registertoolsRoute } from "./tools/registertoolsRoute.js";
async function main(authOptions: AuthOptions) {
  const fastify = Fastify({
    logger: {
      level: "info",
      transport: {
        target: "pino-pretty",
      },
    },
  });
  if (authOptions.username && authOptions.password) {
    // 注册基本身份验证中间件
    await registerBasicAuthMiddleware(fastify, authOptions);
  }
  if (authOptions.document !== "false") {
    await registerSwaggerPlugin(fastify);
  }

  // 注册WebSocket支持
  await fastify.register(websocket);

  const sessionManager = new SessionManager();

  registerAboutRoute(fastify);

  registerQuitRoute(fastify, sessionManager);
  registerSessionRoute(fastify, sessionManager);
  registerMcpListRoute(fastify, sessionManager);
  registerMcprefreshRouteWebSocket(fastify, sessionManager);
  registerStatsRoute(fastify, sessionManager);
  registerStatsModelRoute(fastify, sessionManager);
  registerStatsToolsRoute(fastify, sessionManager);
  registerMcpAuthWebSocketRoute(fastify, sessionManager);
  registerMcpRoute(fastify, sessionManager);

  registertoolsRoute(fastify, sessionManager);
  await start(
    fastify,
    (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log("listening address", address);
    },
    authOptions.port,
    authOptions.host
  ).then(console.log, console.error);

  if (authOptions.document !== "false") {
    await fastify.ready().then(async () => {
      if (authOptions.document) {
        console.log("swagger document path", authOptions.document);
        await fs.promises.writeFile(
          authOptions.document,
          JSON.stringify(fastify.swagger(), null, 4)
        );
      } else {
        console.log(
          "swagger document",
          JSON.stringify(fastify.swagger(), null, 4)
        );
      }
    }, console.error);
  }
}
await main(authOptions).then(console.log, console.error);
