import { z } from "zod";
declare const mcprefreshDataSchema: z.ZodObject<{
    args: z.ZodString;
    sessionId: z.ZodString;
}, z.core.$strip>;
export type McprefreshData = z.infer<typeof mcprefreshDataSchema>;
export declare function validateMcprefreshData(data: unknown): McprefreshData;
export {};
//# sourceMappingURL=validateMcprefreshData.d.ts.map