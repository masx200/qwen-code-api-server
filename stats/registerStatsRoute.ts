import type { FastifyInstance } from "fastify";

import { mockStats } from "./mock-stats.js";
import { statsRequestSchema } from "./statsRequestSchema.js";
import { statsResponseSchema } from "./statsResponseSchema.js";
import type { SessionManager } from "../session/sessions.js";
import { zodtojsonSchema } from "../mcp/registerMcpListRoute.js";

export function registerStatsRoute(
  fastify: FastifyInstance,
  sessionManager: SessionManager,
) {
  // 注册 stats 命令路由
  fastify.post(
    "/command/stats",
    {
      schema: {
        description: "调用stats命令获取会话统计信息",
        tags: ["command", "stats"],
        body: zodtojsonSchema(statsRequestSchema),
        response: {
          200: zodtojsonSchema(statsResponseSchema),
          500: zodtojsonSchema(statsResponseSchema),
        },
      },
    },
    async (request, reply) => {
      try {
        const { sessionId } = request.body as {
          sessionId: string;
        };

        // 获取会话信息
        const session = sessionManager.getSession(sessionId);
        if (!session) {
          return {
            success: true,
            error: "Session not found",
            message: `Session ${sessionId} not found`,
            sessionId,
          };
        }

        // 调用 mockStats
        const result = await mockStats(sessionId, sessionManager);
        console.log(JSON.stringify({ result }, null, 4));

        // 保存会话统计信息
        const sessionStats = {
          sessionStartTime: session.sessionStartTime.toISOString(),
          promptCount: session.promptCount,
          lastPromptTokenCount: session.lastPromptTokenCount,
          metrics: session.metrics,
        };

        return {
          ...result,
          success: true,
          sessionStats,
          sessionId,
          baseTimestamp: result.baseTimestamp,
        };
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
