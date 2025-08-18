import { z } from "zod";
export declare const mcpAuthDataSchema: z.ZodObject<{
  args: z.ZodString;
  sessionId: z.ZodString;
}, z.core.$strip>;
export type McpAuthData = z.infer<typeof mcpAuthDataSchema>;
export declare function validateMcpAuthData(data: unknown): McpAuthData;
//# sourceMappingURL=validateMcpAuthData.d.ts.map
