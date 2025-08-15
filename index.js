// ESM
import fastifySwagger, {} from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";
import { mockAbout } from "./mock-about.js";
import { SessionManager, createId } from "./sessions.js";
const fastify = Fastify({
    logger: {
        level: "info",
        transport: {
            target: "pino-pretty",
        },
    },
});
const swaggerOptions = {
    openapi: {
        info: {
            title: "Fastify API",
            description: "Building a blazing fast REST API",
            version: "1.0.0",
        },
    },
};
await fastify.register(fastifySwagger, swaggerOptions);
await fastify.register(fastifySwaggerUi, {
    routePrefix: "/documentation", // UI 访问路径
    uiConfig: {
        docExpansion: "list", // 折叠文档层级
    },
});
// 定义请求和响应的JSON Schema
const aboutRequestSchema = {
    type: "object",
    properties: {
        model: { type: "string", description: "模型名称" },
    },
    required: ["model"],
};
const aboutResponseSchema = {
    type: "object",
    properties: {
        success: { type: "boolean", description: "是否成功" },
        error: { type: "string", description: "错误信息" },
        message: { type: "string", description: "错误信息" },
        itemData: {
            type: "object",
            description: "show version info",
            properties: {
                type: { type: "string" },
                cliVersion: { type: "string" },
                osVersion: { type: "string" },
                modelVersion: { type: "string" },
                selectedAuthType: { type: "string" },
                gcpProject: { type: "string" },
            },
        },
        baseTimestamp: { type: "number", description: "基础时间戳" },
    },
};
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
const sessionManager = new SessionManager();
// 会话相关JSON Schema
const createSessionRequestSchema = {
    type: "object",
    properties: {},
};
const createSessionResponseSchema = {
    type: "object",
    properties: {
        success: { type: "boolean", description: "是否成功" },
        error: { type: "string", description: "错误信息" },
        message: { type: "string", description: "错误信息" },
        sessionId: { type: "string", description: "会话ID" },
        session: {
            type: "object",
            description: "会话信息",
            properties: {
                sessionStartTime: {
                    type: "string",
                    format: "date-time",
                    description: "会话开始时间",
                },
                promptCount: { type: "number", description: "提示词计数" },
                lastPromptTokenCount: {
                    type: "number",
                    description: "最后提示词token计数",
                },
                metrics: {
                    type: "object",
                    description: "指标数据",
                    properties: {
                        models: {
                            type: "object",
                            description: "模型使用统计",
                            properties: {},
                        },
                        tools: {
                            type: "object",
                            description: "工具调用统计",
                            properties: {
                                totalCalls: { type: "number", description: "总调用次数" },
                                totalSuccess: { type: "number", description: "成功调用次数" },
                                totalFail: { type: "number", description: "失败调用次数" },
                                totalDurationMs: {
                                    type: "number",
                                    description: "总耗时(毫秒)",
                                },
                                totalDecisions: {
                                    type: "object",
                                    description: "决策统计",
                                    properties: {
                                        accept: { type: "number", description: "接受次数" },
                                        reject: { type: "number", description: "拒绝次数" },
                                        modify: { type: "number", description: "修改次数" },
                                    },
                                },
                                byName: {
                                    type: "object",
                                    description: "按工具名称统计",
                                    properties: {},
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
const listSessionsResponseSchema = {
    type: "object",
    properties: {
        success: { type: "boolean", description: "是否成功" },
        error: { type: "string", description: "错误信息" },
        message: { type: "string", description: "错误信息" },
        sessions: {
            type: "array",
            items: { type: "string" },
            description: "会话ID列表",
        },
    },
};
const deleteSessionRequestSchema = {
    type: "object",
    properties: {
        sessionId: { type: "string", description: "要删除的会话ID" },
    },
    required: ["sessionId"],
};
const deleteSessionResponseSchema = {
    type: "object",
    properties: {
        success: { type: "boolean", description: "是否成功" },
        error: { type: "string", description: "错误信息" },
        message: { type: "string", description: "错误信息" },
    },
};
const getSessionRequestSchema = {
    type: "object",
    properties: {
        sessionId: { type: "string", description: "要获取的会话ID" },
    },
    required: ["sessionId"],
};
const getSessionResponseSchema = {
    type: "object",
    properties: {
        success: { type: "boolean", description: "是否成功" },
        error: { type: "string", description: "错误信息" },
        message: { type: "string", description: "错误信息" },
        session: {
            type: "object",
            description: "会话信息",
            properties: {
                sessionStartTime: {
                    type: "string",
                    format: "date-time",
                    description: "会话开始时间",
                },
                promptCount: { type: "number", description: "提示词计数" },
                lastPromptTokenCount: {
                    type: "number",
                    description: "最后提示词token计数",
                },
                metrics: {
                    type: "object",
                    description: "指标数据",
                    properties: {
                        models: {
                            type: "object",
                            description: "模型使用统计",
                            properties: {},
                        },
                        tools: {
                            type: "object",
                            description: "工具调用统计",
                            properties: {
                                totalCalls: { type: "number", description: "总调用次数" },
                                totalSuccess: { type: "number", description: "成功调用次数" },
                                totalFail: { type: "number", description: "失败调用次数" },
                                totalDurationMs: {
                                    type: "number",
                                    description: "总耗时(毫秒)",
                                },
                                totalDecisions: {
                                    type: "object",
                                    description: "决策统计",
                                    properties: {
                                        accept: { type: "number", description: "接受次数" },
                                        reject: { type: "number", description: "拒绝次数" },
                                        modify: { type: "number", description: "修改次数" },
                                    },
                                },
                                byName: {
                                    type: "object",
                                    description: "按工具名称统计",
                                    properties: {},
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
// 注册会话相关路由
// 创建会话
fastify.post("/sessions/create", {
    schema: {
        description: "创建新的会话",
        tags: ["sessions"],
        body: createSessionRequestSchema,
        response: {
            200: createSessionResponseSchema,
            500: createSessionResponseSchema,
        },
    },
}, async (request, reply) => {
    try {
        let actualSessionId = createId();
        const session = sessionManager.createSession();
        sessionManager.setSession(actualSessionId, session);
        console.log(JSON.stringify(session, null, 4));
        reply.send({
            success: true,
            sessionId: actualSessionId,
            session: {
                sessionStartTime: session.sessionStartTime.toISOString(),
                promptCount: session.promptCount,
                lastPromptTokenCount: session.lastPromptTokenCount,
                metrics: session.metrics,
            },
        });
        return;
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
// 列出所有会话
fastify.get("/sessions/list", {
    schema: {
        description: "获取所有会话ID列表",
        tags: ["sessions"],
        response: {
            200: listSessionsResponseSchema,
            500: listSessionsResponseSchema,
        },
    },
}, async (request, reply) => {
    try {
        const sessions = sessionManager.listSessions();
        return {
            success: true,
            sessions,
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
// 删除会话
fastify.delete("/sessions/delete", {
    schema: {
        description: "删除指定会话",
        tags: ["sessions"],
        body: deleteSessionRequestSchema,
        response: {
            200: deleteSessionResponseSchema,
            500: deleteSessionResponseSchema,
        },
    },
}, async (request, reply) => {
    try {
        const { sessionId } = request.body;
        if (!sessionManager.getSession(sessionId)) {
            return {
                success: false,
                error: "Session not found",
                message: `Session ${sessionId} not found`,
            };
        }
        sessionManager.deleteSession(sessionId);
        return {
            success: true,
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
// 获取会话详情
fastify.post("/sessions/get", {
    schema: {
        description: "获取指定会话的详细信息",
        tags: ["sessions"],
        body: getSessionRequestSchema,
        response: {
            200: getSessionResponseSchema,
            500: getSessionResponseSchema,
        },
    },
}, async (request, reply) => {
    try {
        const { sessionId } = request.body;
        const session = sessionManager.getSession(sessionId);
        if (!session) {
            return {
                success: false,
                error: "Session not found",
                message: `Session ${sessionId} not found`,
            };
        }
        return {
            success: true,
            session: {
                sessionStartTime: session.sessionStartTime.toISOString(),
                promptCount: session.promptCount,
                lastPromptTokenCount: session.lastPromptTokenCount,
                metrics: session.metrics,
            },
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
/**
 * Run the server!
 */
async function start() {
    try {
        console.log("address", await fastify.listen({ port: 3000, host: "0.0.0.0" }));
    }
    catch (err) {
        fastify.log.error(err);
        console.error(err);
        process.exit(1);
    }
}
fastify.ready().then(() => {
    console.log("document", JSON.stringify(fastify.swagger(), null, 4));
}, console.error);
start().then(console.log, console.error);
//# sourceMappingURL=index.js.map