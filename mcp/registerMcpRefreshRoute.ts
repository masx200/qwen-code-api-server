import type { FastifyInstance } from "fastify";
import * as z from "zod";
import type { JSONSchema } from "zod/v4/core";
import {
  mcprefreshRequestSchema,
  mcprefreshResponseSchema,
} from "./mcprefreshRequestSchema.js";
import { mockmcpRefresh } from "./mockmcpRefresh.js";
export function registerMcprefreshRoute(fastify: FastifyInstance) {
  // 注册路由
  fastify.post(
    "/command/mcp/refresh",
    {
      schema: {
        description: "调用mcp refresh命令获取MCP服务器列表",
        tags: ["command", "mcp"],
        body: zodtojsonSchema(mcprefreshRequestSchema),
        response: {
          200: zodtojsonSchema(mcprefreshResponseSchema),
          500: zodtojsonSchema(mcprefreshResponseSchema),
        },
      },
    },
    async (request, reply) => {
      try {
        const { cwd, argv, args } = request.body as {
          cwd: string;
          argv: string[];
          args: string;
        };
        const result = await mockmcpRefresh(cwd, argv, args);

        console.log(JSON.stringify(result, null, 4));
        return { ...result[0], ...result[1], success: true };
      } catch (error) {
        request.log.error(error);
        console.error(error);
        reply.status(500).send({
          success: false,
          error: "Internal server error",
          message: String(error),
        });
      }
    }
  );
}
// console.log(zodtojsonSchema(mcprefreshRequestSchema));
export function zodtojsonSchema(schema: z.ZodTypeAny): JSONSchema.BaseSchema {
  return Object.fromEntries(
    Object.entries(z.toJSONSchema(schema)).filter(([key]) => key !== "$schema")
  );
}
