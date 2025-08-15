// ESM
import Fastify from "fastify";
import { registerAboutRoute } from "./about/registerAboutRoute.js";
import { registerQuitRoute } from "./quit/registerQuitRoute.js";
import { registerSessionRoute } from "./session/route-session.js";
import { SessionManager } from "./session/sessions.js";
import { start } from "./start.js";
import { registerSwaggerPlugin } from "./swagger/registerSwaggerPlugin.js";
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
  const sessionManager = new SessionManager();
  registerAboutRoute(fastify);
  registerQuitRoute(fastify, sessionManager);
  registerSessionRoute(fastify, sessionManager);
  await start(fastify).then(console.log, console.error);
  await fastify.ready().then(() => {
    console.log("swagger document", JSON.stringify(fastify.swagger(), null, 4));
  }, console.error);
}
await main().then(console.log, console.error);
//# sourceMappingURL=index.js.map
