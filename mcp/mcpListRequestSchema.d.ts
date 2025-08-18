import { z } from "zod";
export declare const mcpListRequestSchema: z.ZodObject<{
  sessionId: z.ZodDefault<z.ZodString>;
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
export declare const mcpRequestSchema: z.ZodObject<{
  sessionId: z.ZodDefault<z.ZodString>;
  args: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
export declare const mcpResponseSchema: z.ZodObject<{
  success: z.ZodBoolean;
  type: z.ZodOptional<z.ZodString>;
  messageType: z.ZodOptional<z.ZodString>;
  content: z.ZodOptional<z.ZodString>;
  error: z.ZodOptional<z.ZodString>;
  message: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=mcpListRequestSchema.d.ts.map
