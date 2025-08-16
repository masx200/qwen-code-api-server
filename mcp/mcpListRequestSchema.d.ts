import { z } from "zod";
export declare const mcpListRequestSchema: z.ZodObject<{
    cwd: z.ZodDefault<z.ZodString>;
    argv: z.ZodDefault<z.ZodArray<z.ZodString>>;
    args: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
export declare const mcpListResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    type: z.ZodOptional<z.ZodString>;
    messageType: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    error: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type McpListRequest = z.infer<typeof mcpListRequestSchema>;
export type McpListResponse = z.infer<typeof mcpListResponseSchema>;
//# sourceMappingURL=mcpListRequestSchema.d.ts.map