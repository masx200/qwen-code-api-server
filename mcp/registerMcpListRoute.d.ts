import type { FastifyInstance } from "fastify";
import * as z from "zod";
import type { JSONSchema } from "zod/v4/core";
export declare function registerMcpListRoute(fastify: FastifyInstance): void;
export declare function zodtojsonSchema(
  schema: z.ZodTypeAny,
): JSONSchema.BaseSchema;
//# sourceMappingURL=registerMcpListRoute.d.ts.map
