import { zodtojsonSchema } from "../mcp/registerMcpListRoute.js";
import { mocktools } from "./mock-tools.js";
import z from "zod";
import os from "os";
const toolsRequestSchema = z.object({
    cwd: z.string(),
    argv: z.array(z.string()),
    args: z.string(),
});
const toolsResponseSchema = z.object({
    success: z.boolean(),
    error: z.string().optional(),
    message: z.string().optional(),
    itemData: z.object({
        type: z.string(),
        text: z.string(),
    }).optional(),
    baseTimestamp: z.number().optional(),
});
export function registertoolsRoute(fastify) {
    fastify.post("/command/tools", {
        schema: {
            description: "tools 命令获取tools服务器列表",
            tags: ["command", "tools"],
            body: zodtojsonSchema(toolsRequestSchema),
            response: {
                200: zodtojsonSchema(toolsResponseSchema),
                500: zodtojsonSchema(toolsResponseSchema),
            },
        },
    }, async (request, reply) => {
        try {
            let { cwd, argv, args } = request.body;
            cwd = cwd.length ? cwd : os.homedir();
            const result = await mocktools(cwd, argv, args);
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
//# sourceMappingURL=registertoolsRoute.js.map