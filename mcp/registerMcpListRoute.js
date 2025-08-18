import {
  mcpListRequestSchema,
  mcpListResponseSchema,
  mcpRequestSchema,
  mcpResponseSchema,
} from "./mcpListRequestSchema.js";
import { mockmcp, mockmcpList } from "./mock-mcp.js";
import * as z from "zod";
export function registerMcpListRoute(fastify, sessionManager) {
  fastify.post("/command/mcp/list", {
    schema: {
      description: "调用mcp list命令获取MCP服务器列表",
      tags: ["command", "mcp"],
      body: zodtojsonSchema(mcpListRequestSchema),
      response: {
        200: zodtojsonSchema(mcpListResponseSchema),
        500: zodtojsonSchema(mcpListResponseSchema),
      },
    },
  }, async (request, reply) => {
    try {
      let { args, sessionId } = request.body;
      const result = await mockmcpList(sessionId, sessionManager, args);
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
  });
}
export function zodtojsonSchema(schema) {
  return Object.fromEntries(
    Object.entries(z.toJSONSchema(schema)).filter(([key]) => key !== "$schema"),
  );
}
export function registerMcpRoute(fastify, sessionManager) {
  fastify.post("/command/mcp", {
    schema: {
      description: "调用mcp命令获取MCP服务器列表",
      tags: ["command", "mcp"],
      body: zodtojsonSchema(mcpRequestSchema),
      response: {
        200: zodtojsonSchema(mcpResponseSchema),
        500: zodtojsonSchema(mcpResponseSchema),
      },
    },
  }, async (request, reply) => {
    try {
      let { args, sessionId } = request.body;
      const result = await mockmcp(sessionId, sessionManager, args);
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
  });
}
//# sourceMappingURL=registerMcpListRoute.js.map
