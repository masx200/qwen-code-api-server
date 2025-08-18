export const findSessionsByCwdRequestSchema = {
  type: "object",
  properties: {
    cwd: { type: "string", description: "要查找的工作目录路径" },
  },
  required: ["cwd"],
};

export const findSessionsByCwdResponseSchema = {
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
