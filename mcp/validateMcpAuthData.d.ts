import { z } from "zod";
declare const mcpAuthDataSchema: z.ZodObject<{
    cwd: z.ZodString;
    argv: z.ZodArray<z.ZodString>;
    args: z.ZodString;
    id: z.ZodString;
}, z.core.$strip>;
export type McpAuthData = z.infer<typeof mcpAuthDataSchema>;
export declare function validateMcpAuthData(data: unknown): McpAuthData;
export {};
//# sourceMappingURL=validateMcpAuthData.d.ts.map