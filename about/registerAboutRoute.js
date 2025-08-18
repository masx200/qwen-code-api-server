import { aboutRequestSchema, aboutResponseSchema, } from "./aboutRequestSchema.js";
import { mockAbout } from "./mock-about.js";
import { GIT_COMMIT_INFO } from "@qwen-code/qwen-code/dist/src/generated/git-commit.js";
export function registerAboutRoute(fastify) {
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
            console.log("model", model);
            const result = await mockAbout(model);
            console.log("result", result);
            return { ...result, success: true, gitCommit: GIT_COMMIT_INFO };
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