import { aboutRequestSchema, aboutResponseSchema } from "./aboutRequestSchema.js";
import { mockAbout } from "./mock-about.js";
export function registerAboutRoute(fastify) {
    // 注册路由
    fastify.post("/command/about", {
        schema: {
            description: "调用about命令获取模型信息",
            tags: ["command"],
            body: aboutRequestSchema,
            response: {
                200: aboutResponseSchema,
                500: aboutResponseSchema,
            },
        },
    }, async (request, reply) => {
        try {
            const { model } = request.body;
            const result = await mockAbout(model);
            // throw new Error("test error");
            return { ...result, success: true };
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
//# sourceMappingURL=registerAboutRoute.js.map