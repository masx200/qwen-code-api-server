import { z } from "zod";
const mcprefreshDataSchema = z.object({
    cwd: z.string(),
    argv: z.array(z.string()),
    args: z.string(),
    id: z.string(),
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