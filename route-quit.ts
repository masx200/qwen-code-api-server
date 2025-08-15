// 定义 quit 命令的请求和响应 schema - 基于 mock-quit.ts 数据结构
const quitRequestSchema = {
  type: "object",
  properties: {
    sessionId: { type: "string", description: "会话ID" },
  },
  required: ["sessionId"],
  additionalProperties: false,
};
import type { FastifyInstance } from "fastify";
import { sessionManager } from "./index.js";
import { mockQuit } from "./mock-quit.js";
import { modelMetricsSchema } from "./model-schema.js";
// 基于 mock-quit.ts 实际返回数据结构的响应 schema
const quitResponseSchema = {
  type: "object",
  properties: {
    duration: { type: "string", description: "耗时(毫秒)" },

    success: { type: "boolean", description: "是否成功" },
    error: { type: "string", description: "错误信息" },
    message: { type: "string", description: "错误信息" },
    type: {
      type: "string",
      description: "返回类型 - 对应 mock-quit.ts 中的 type 字段",
    },
    messages: {
      type: "array",
      description: "消息列表 - 对应 mock-quit.ts 中的 messages 字段",
      items: {
        type: "object",
        properties: {
          type: {
            type: "string",
            description: "消息类型",
          },
          text: {
            type: ["string", "null"],
            description: "消息文本内容",
          },
          id: {
            type: "number",
            description: "消息ID",
          },
          duration: {
            type: ["string", "null"],
            description: "持续时间",
          },
        },
        required: ["type", "id"],
        additionalProperties: false,
      },
    },
    sessionId: { type: "string", description: "会话ID" },
    sessionStats: {
      type: "object",
      description: "会话统计信息",
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
            models: modelMetricsSchema,
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

export function registerQuitRoute(fastify: FastifyInstance) {
  // 注册 quit 命令路由
  fastify.post(
    "/command/quit",
    {
      schema: {
        description: "调用quit命令并删除会话",
        tags: ["command"],
        body: quitRequestSchema,
        response: {
          200: quitResponseSchema,
          500: quitResponseSchema,
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

        // 调用 mockQuit
        const result = await mockQuit(sessionId, sessionManager);
        console.log(
          JSON.stringify({ result }, null, 4),
        );

        // 保存会话统计信息
        const sessionStats = {
          sessionStartTime: session.sessionStartTime.toISOString(),
          promptCount: session.promptCount,
          lastPromptTokenCount: session.lastPromptTokenCount,
          metrics: session.metrics,
        };

        // 删除会话
        sessionManager.deleteSession(sessionId);

        return {
          ...result,
          success: true,
          sessionStats,
          sessionId,
          duration: result.messages?.at(-1)?.duration,
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
