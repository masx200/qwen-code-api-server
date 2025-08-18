import { z } from "zod";
export declare const mcprefreshDataSchema: z.ZodObject<{
    args: z.ZodString;
    sessionId: z.ZodString;
}, z.core.$strip>;
export type McprefreshData = z.infer<typeof mcprefreshDataSchema>;
export declare function validateMcprefreshData(data: unknown): McprefreshData;
//# sourceMappingURL=validateMcprefreshData.d.ts.map