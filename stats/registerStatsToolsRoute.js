import { zodtojsonSchema } from "../mcp/registerMcpListRoute.js";
import { mockStatsTools } from "./mock-stats.js";
import { statsRequestSchema } from "./statsRequestSchema.js";
import { statsResponseSchema } from "./statsResponseSchema.js";
export function registerStatsToolsRoute(fastify, sessionManager) {
    fastify.post("/command/stats/tools", {
        schema: {
            description: "调用stats tools命令获取工具统计信息",
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
            const result = await mockStatsTools(sessionId, sessionManager);
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
//# sourceMappingURL=registerStatsToolsRoute.js.map