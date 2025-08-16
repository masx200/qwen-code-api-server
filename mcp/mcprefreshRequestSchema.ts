import { z } from "zod";

export const mcprefreshRequestSchema = z.object({
  cwd: z.string().default(""),
  argv: z.array(z.string()).default([]),
  args: z.string().default(""),
});

export const mcprefreshResponseSchema = z.object({
  success: z.boolean(),
  type: z.string().optional(),
  messageType: z.string().optional(),
  content: z.string().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
});

export type McprefreshRequest = z.infer<typeof mcprefreshRequestSchema>;
export type McprefreshResponse = z.infer<typeof mcprefreshResponseSchema>;
