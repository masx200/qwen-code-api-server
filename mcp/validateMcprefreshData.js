import { z } from "zod";
const mcprefreshDataSchema = z.object({
    args: z.string(),
    sessionId: z.string(),
});
export function validateMcprefreshData(data) {
    try {
        const result = mcprefreshDataSchema.parse(data);
        return result;
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(`验证失败: ${error}`);
        }
        throw new Error(`验证失败: ${error}`);
    }
}
//# sourceMappingURL=validateMcprefreshData.js.map