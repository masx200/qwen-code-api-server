import {
  mcprefreshRequestSchema,
  mcprefreshResponseSchema,
} from "./mcprefreshRequestSchema.js";
import { mockmcpRefresh } from "./mock-mcp.js";
import * as z from "zod";
export function registerMcprefreshRoute(fastify) {
  // 注册路由
  fastify.post("/command/mcp/refresh", {
    schema: {
      description: "调用mcp refresh命令获取MCP服务器列表",
      tags: ["command", "mcp"],
      body: zodtojsonSchema(mcprefreshRequestSchema),
      response: {
        200: zodtojsonSchema(mcprefreshResponseSchema),
        500: zodtojsonSchema(mcprefreshResponseSchema),
      },
    },
  }, async (request, reply) => {
    try {
      const { cwd, argv, args } = request.body;
      const result = await mockmcpRefresh(cwd, argv, args);
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
// console.log(zodtojsonSchema(mcprefreshRequestSchema));
export function zodtojsonSchema(schema) {
  return Object.fromEntries(
    Object.entries(z.toJSONSchema(schema)).filter(([key]) => key !== "$schema"),
  );
}
//# sourceMappingURL=registerMcpRefreshRoute.js.map
