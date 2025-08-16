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
  baseTimestamp: z.number().optional(),
  itemData: z.object({
    type: z.string().optional(),
    text: z.string().optional(),
  }),
});
//# sourceMappingURL=mcprefreshRequestSchema.js.map
