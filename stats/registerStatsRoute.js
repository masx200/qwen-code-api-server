import { zodtojsonSchema } from "../mcp/registerMcpListRoute.js";
import { mockStats } from "./mock-stats.js";
import { statsRequestSchema } from "./statsRequestSchema.js";
import { statsResponseSchema } from "./statsResponseSchema.js";
export function registerStatsRoute(fastify, sessionManager) {
    fastify.post("/command/stats", {
        schema: {
            description: "调用stats命令获取会话统计信息",
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
            const result = await mockStats(sessionId, sessionManager);
            console.log(JSON.stringify({ result }, null, 4));
            const sessionStats = {
                sessionStartTime: session.session.stats.sessionStartTime.toISOString(),
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
        }
        catch (error) {
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
//# sourceMappingURL=registerStatsRoute.js.map