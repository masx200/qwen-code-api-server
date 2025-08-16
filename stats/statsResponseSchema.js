import { z } from "zod";
export const statsResponseSchema = z.object({
    success: z.boolean().describe("操作是否成功"),
    error: z.string().optional().describe("错误信息"),
    message: z.string().optional().describe("提示信息"),
    sessionId: z.string().describe("会话ID"),
    itemData: z.any().optional().describe("统计信息数据"),
    baseTimestamp: z.number().optional().describe("基准时间戳"),
    sessionStats: z.object({
        sessionStartTime: z.string().describe("会话开始时间"),
        promptCount: z.number().describe("提示次数"),
        lastPromptTokenCount: z.number().describe("最后提示token数"),
        metrics: z.any().describe("会话指标"),
    }).optional().describe("会话统计信息"),
});
//# sourceMappingURL=statsResponseSchema.js.map