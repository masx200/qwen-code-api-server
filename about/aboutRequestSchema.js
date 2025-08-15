// 定义请求和响应的JSON Schema
export const aboutRequestSchema = {
    type: "object",
    properties: {
        model: { type: "string", description: "模型名称" },
    },
    required: ["model"],
};
export const aboutResponseSchema = {
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
//# sourceMappingURL=aboutRequestSchema.js.map