import { z } from "zod";
export const mcpAuthDataSchema = z.object({
    args: z.string(),
    sessionId: z.string(),
});
export function validateMcpAuthData(data) {
    try {
        const result = mcpAuthDataSchema.parse(data);
        return result;
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(`验证失败: ${error}`);
        }
        throw new Error(`验证失败: ${error}`);
    }
}
//# sourceMappingURL=validateMcpAuthData.js.map