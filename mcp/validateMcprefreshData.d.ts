import { z } from "zod";
declare const mcprefreshDataSchema: z.ZodObject<{
    cwd: z.ZodString;
    argv: z.ZodArray<z.ZodString>;
    args: z.ZodString;
    id: z.ZodString;
}, z.core.$strip>;
export type McprefreshData = z.infer<typeof mcprefreshDataSchema>;
export declare function validateMcprefreshData(data: unknown): McprefreshData;
export {};
//# sourceMappingURL=validateMcprefreshData.d.ts.map