import type { FastifyInstance } from "fastify";
import {
  mcpListRequestSchema,
  mcpListResponseSchema,
} from "./mcpListRequestSchema.js";
import { mockmcpList } from "./mock-mcp.js";
import * as z from "zod";
import type { JSONSchema } from "zod/v4/core";
export function registerMcpListRoute(fastify: FastifyInstance) {
  // 注册路由
  fastify.post(
    "/command/mcp/list",
    {
      schema: {
        description: "调用mcp list命令获取MCP服务器列表",
        tags: ["command", "mcp"],
        body: zodtojsonSchema(mcpListRequestSchema),
        response: {
          200: zodtojsonSchema(mcpListResponseSchema),
          500: zodtojsonSchema(mcpListResponseSchema),
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
        const result = await mockmcpList(cwd, argv, args);
        return { ...result, success: true };
      } catch (error) {
        request.log.error(error);
        console.error(error);
        reply.status(500).send({
          success: false,
          error: "Internal server error",
          message: String(error),
        });
      }
    },
  );
}
// console.log(zodtojsonSchema(mcpListRequestSchema));
export function zodtojsonSchema(schema: z.ZodTypeAny): JSONSchema.BaseSchema {
  return Object.fromEntries(
    Object.entries(z.toJSONSchema(schema)).filter(([key]) => key !== "$schema"),
  );
}
