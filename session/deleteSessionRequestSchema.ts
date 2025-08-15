import { modelMetricsSchema } from "../stats/model-schema.js";

export const deleteSessionRequestSchema = {
  type: "object",
  properties: {
    sessionId: { type: "string", description: "要删除的会话ID" },
  },
  required: ["sessionId"],
};
export const deleteSessionResponseSchema = {
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
