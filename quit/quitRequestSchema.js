// 定义 quit 命令的请求和响应 schema - 基于 mock-quit.ts 数据结构
export const quitRequestSchema = {
  type: "object",
  properties: {
    sessionId: { type: "string", description: "会话ID" },
  },
  required: ["sessionId"],
  additionalProperties: false,
};
//# sourceMappingURL=quitRequestSchema.js.map
