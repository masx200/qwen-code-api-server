import { z } from "zod";
export declare const mcprefreshRequestSchema: z.ZodObject<{
  cwd: z.ZodDefault<z.ZodString>;
  argv: z.ZodDefault<z.ZodArray<z.ZodString>>;
  args: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
export declare const mcprefreshResponseSchema: z.ZodObject<{
  success: z.ZodBoolean;
  type: z.ZodOptional<z.ZodString>;
  messageType: z.ZodOptional<z.ZodString>;
  content: z.ZodOptional<z.ZodString>;
  error: z.ZodOptional<z.ZodString>;
  message: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type McprefreshRequest = z.infer<typeof mcprefreshRequestSchema>;
export type McprefreshResponse = z.infer<typeof mcprefreshResponseSchema>;
//# sourceMappingURL=mcprefreshRequestSchema.d.ts.map
