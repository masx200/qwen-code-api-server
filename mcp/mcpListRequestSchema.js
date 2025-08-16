import { z } from "zod";
export const mcpListRequestSchema = z.object({
  cwd: z.string().default(""),
  argv: z.array(z.string()).default([]),
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
  cwd: z.string().default(""),
  argv: z.array(z.string()).default([]),
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
