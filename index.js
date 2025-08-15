// ESM
import Fastify from "fastify";
import { registerAboutRoute } from "./about/registerAboutRoute.js";
import { registerQuitRoute } from "./quit/registerQuitRoute.js";
import { registerSessionRoute } from "./session/route-session.js";
import { SessionManager } from "./session/sessions.js";
import { start } from "./start.js";
import { registerSwaggerPlugin } from "./swagger/registerSwaggerPlugin.js";
export const fastify = Fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
    },
  },
});
await registerSwaggerPlugin(fastify);
export const sessionManager = new SessionManager();
registerAboutRoute(fastify);
registerQuitRoute(fastify);
registerSessionRoute(fastify);
await start(fastify).then(console.log, console.error);
await fastify.ready().then(() => {
  console.log("swagger document", JSON.stringify(fastify.swagger(), null, 4));
}, console.error);
//# sourceMappingURL=index.js.map
