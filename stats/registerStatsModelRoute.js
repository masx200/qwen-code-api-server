import { zodtojsonSchema } from "../mcp/registerMcpListRoute.js";
import { mockStatsModel } from "./mock-stats.js";
import { statsRequestSchema } from "./statsRequestSchema.js";
import { statsResponseSchema } from "./statsResponseSchema.js";
export function registerStatsModelRoute(fastify, sessionManager) {
  fastify.post("/command/stats/model", {
    schema: {
      description: "调用stats model命令获取模型统计信息",
      tags: ["command", "stats"],
      body: zodtojsonSchema(statsRequestSchema),
      response: {
        200: zodtojsonSchema(statsResponseSchema),
        500: zodtojsonSchema(statsResponseSchema),
      },
    },
  }, async (request, reply) => {
    try {
      const { sessionId } = request.body;
      const session = sessionManager.getSession(sessionId);
      if (!session) {
        return {
          success: true,
          error: "Session not found",
          message: `Session ${sessionId} not found`,
          sessionId,
        };
      }
      const result = await mockStatsModel(sessionId, sessionManager);
      console.log(JSON.stringify({ result }, null, 4));
      const sessionStats = {
        sessionStartTime: session.session.stats.sessionStartTime
          .toISOString(),
        promptCount: session.session.stats.promptCount,
        lastPromptTokenCount: session.session.stats.lastPromptTokenCount,
        metrics: session.session.stats.metrics,
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
  });
}
//# sourceMappingURL=registerStatsModelRoute.js.map
