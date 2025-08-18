import { mockQuit } from "./mock-quit.js";
import { quitRequestSchema } from "./quitRequestSchema.js";
import { quitResponseSchema } from "./quitResponseSchema.js";
export function registerQuitRoute(fastify, sessionManager) {
    fastify.post("/command/quit", {
        schema: {
            description: "调用quit命令并删除会话",
            tags: ["command"],
            body: quitRequestSchema,
            response: {
                200: quitResponseSchema,
                500: quitResponseSchema,
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
            const result = await mockQuit(sessionId, sessionManager);
            console.log(JSON.stringify({ result }, null, 4));
            const sessionStats = {
                sessionStartTime: session.session.stats.sessionStartTime
                    .toISOString(),
                promptCount: session.session.stats.promptCount,
                lastPromptTokenCount: session.session.stats.lastPromptTokenCount,
                metrics: session.session.stats.metrics,
            };
            sessionManager.deleteSession(sessionId);
            return {
                ...result,
                success: true,
                sessionStats,
                sessionId,
                duration: result.messages?.at(-1)?.duration,
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
//# sourceMappingURL=registerQuitRoute.js.map