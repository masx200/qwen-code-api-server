import type { FastifyInstance } from "fastify";
import * as z from "zod";
import type { JSONSchema } from "zod/v4/core";
export declare function registerMcpListRoute(fastify: FastifyInstance): void;
export declare function zodtojsonSchema(
  schema: z.ZodTypeAny,
): JSONSchema.BaseSchema;
export declare function registerMcpRoute(fastify: FastifyInstance): void;
//# sourceMappingURL=registerMcpListRoute.d.ts.map
