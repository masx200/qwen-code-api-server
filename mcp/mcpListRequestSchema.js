import { z } from "zod";
export const mcpListRequestSchema = z.object({
    sessionId: z.string().default(""),
    args: z.string().default(""),
});
export const mcpListResponseSchema = z.object({
    success: z.boolean(),
    type: z.string().optional(),
    messageType: z.string().optional(),
    content: z.string().optional(),
    error: z.string().optional(),
    message: z.string().optional(),
});
export const mcpRequestSchema = z.object({
    sessionId: z.string().default(""),
    args: z.string().default(""),
});
export const mcpResponseSchema = z.object({
    success: z.boolean(),
    type: z.string().optional(),
    messageType: z.string().optional(),
    content: z.string().optional(),
    error: z.string().optional(),
    message: z.string().optional(),
});
//# sourceMappingURL=mcpListRequestSchema.js.map