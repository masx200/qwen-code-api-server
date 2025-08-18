import type { FastifyInstance } from "fastify";
import * as z from "zod";
import type { JSONSchema } from "zod/v4/core";
import type { SessionManager } from "../session/SessionManager.js";
export declare function registerMcprefreshRouteWebSocket(
  fastify: FastifyInstance,
  sessionManager: SessionManager,
): void;
export declare function zodtojsonSchema(
  schema: z.ZodTypeAny,
): JSONSchema.BaseSchema;
//# sourceMappingURL=registerMcpRefreshRoute.d.ts.map
