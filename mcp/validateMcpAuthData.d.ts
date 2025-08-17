import { z } from "zod";
declare const mcpAuthDataSchema: z.ZodObject<{
  cwd: z.ZodString;
  argv: z.ZodArray<z.ZodString>;
  args: z.ZodString;
  id: z.ZodString;
}, z.core.$strip>;
export type McpAuthData = z.infer<typeof mcpAuthDataSchema>;
/**
 * 使用zod验证MCP认证数据的函数
 * @param data 需要验证的数据
 * @returns 验证成功返回解析后的数据，失败抛出错误
 */
export declare function validateMcpAuthData(data: unknown): McpAuthData;
export {};
//# sourceMappingURL=validateMcpAuthData.d.ts.map
