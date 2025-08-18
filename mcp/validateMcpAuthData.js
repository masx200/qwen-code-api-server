import { z } from "zod";
const mcpAuthDataSchema = z.object({
    cwd: z.string(),
    argv: z.array(z.string()),
    args: z.string(),
    id: z.string(),
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